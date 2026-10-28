import * as path from 'node:path';
import * as handwritten from '../lib/elements';
import * as operations from '../lib/operations';
import type { DescriptorChild, XMLElementSchema } from '../lib/schema';
import * as util from '../lib/util';
import { aliases } from './aliases';
import { getClassName, getContentsAccessorNames, getTypeAssertMethodLiterals, getTypeLiteral } from './emit';
import { read } from './xsd/read';
import { toSchemas } from './xsd/toSchemas';

/**
 * Compares the API the generator would produce from the hand-written schemas in lib/elements with the one it would
 * produce from the XSD-derived schemas, and prints every difference. Run with `bun src/scripts/compare.ts`.
 */

const XSD_PATH = path.join(__dirname, '..', '..', '..', '..', 'xmlvalidator', 'schema', 'musicxml.xsd');

type Api = {
	attributes: Record<string, string>;
	contents: Array<{ name: string; type: string }>;
	asserts: string[];
	zero: string;
};

/** A JSON-friendly picture of an element's zero value, with child elements by name. */
const picture = (value: any): any => {
	if (util.isXMLElement(value)) {
		return { [`<${value.schema.name}>`]: { attributes: picture(value.attributes), contents: picture(value.contents) } };
	}
	if (util.isArray(value)) {
		return value.map(picture);
	}
	if (value instanceof Date) {
		return value.toISOString();
	}
	if (util.isObject(value)) {
		// Null attributes are not serialized, so an attribute one side lacks does not count.
		return Object.fromEntries(
			Object.entries(value)
				.filter(([, v]) => v !== null)
				.sort(([a], [b]) => a.localeCompare(b))
				.map(([k, v]) => [k, picture(v)]),
		);
	}
	return value;
};

/** operations.zero for descriptor trees whose elements are schema objects rather than generated classes. */
const zero = (child: DescriptorChild): any => {
	if (util.isXMLElementSchema(child)) {
		return { schema: child, attributes: operations.merge({}, child), contents: child.contents.map(zero) };
	}
	if (util.isDescriptor(child)) {
		switch (child.type) {
			case 'choices':
				return zero(child.choices[0]);
			case 'label':
			case 'required':
				return zero(child.value);
			case 'oneOrMore':
				return [zero(child.value)];
			case 'not':
				return zero(child.include);
		}
	}
	if (util.isArray(child)) {
		return child.map(zero);
	}
	return operations.zero(child);
};

const zeroOf = (schema: XMLElementSchema): string => JSON.stringify(picture(zero(schema)));

/** A copy of the descriptor tree with each choice sorted by its type literal, so union order does not count. */
const canonical = (child: DescriptorChild, seen = new Map<XMLElementSchema, XMLElementSchema>()): DescriptorChild => {
	if (util.isXMLElementSchema(child)) {
		if (!seen.has(child)) {
			const copy: XMLElementSchema = { ...child, attributes: {}, contents: [] };
			seen.set(child, copy);
			for (const [key, value] of Object.entries(child.attributes)) {
				copy.attributes[key] = canonical(value as DescriptorChild, seen);
			}
			copy.contents = child.contents.map((content) => canonical(content, seen));
		}
		return seen.get(child)!;
	}
	if (util.isArray(child)) {
		return child.map((item) => canonical(item, seen));
	}
	if (util.isDescriptor(child)) {
		switch (child.type) {
			case 'choices': {
				// Sorted and deduplicated by type literal: the TypeScript union is the same either way.
				const byLiteral = new Map<string, DescriptorChild>();
				for (const choice of child.choices) {
					const sorted = canonical(choice, seen);
					byLiteral.set(getTypeLiteral(sorted), sorted);
				}
				const choices = Array.from(byLiteral.keys())
					.sort()
					.map((literal) => byLiteral.get(literal)!);
				return { ...child, choices: choices as [any, ...any[]] };
			}
			case 'optional':
			case 'required':
			case 'label':
			case 'zeroOrMore':
			case 'oneOrMore':
				return { ...child, value: canonical(child.value, seen) };
			case 'not':
				return { ...child, include: canonical(child.include, seen), exclude: canonical(child.exclude, seen) };
		}
	}
	return child;
};

const toApi = (schema: XMLElementSchema): Api => {
	const sorted = canonical(schema) as XMLElementSchema;
	const attributes: Record<string, string> = {};
	for (const [key, value] of Object.entries(sorted.attributes)) {
		attributes[key] = getTypeLiteral(value as DescriptorChild);
	}
	const names = getContentsAccessorNames(sorted);
	const contents = sorted.contents.map((content, ndx) => ({ name: names[ndx], type: getTypeLiteral(content) }));
	return { attributes, contents, asserts: getTypeAssertMethodLiterals(sorted).sort(), zero: zeroOf(schema) };
};

const collect = (roots: XMLElementSchema[]): Record<string, XMLElementSchema> => {
	const schemas: Record<string, XMLElementSchema> = {};
	const dfs = (child: DescriptorChild): void => {
		if (util.isDescriptor(child)) {
			switch (child.type) {
				case 'label':
				case 'optional':
				case 'required':
				case 'zeroOrMore':
				case 'oneOrMore':
					dfs(child.value);
					return;
				case 'choices':
					child.choices.forEach(dfs);
					return;
				case 'not':
					dfs(child.include);
					return;
			}
		}
		if (util.isXMLElementSchema(child)) {
			const className = getClassName(child);
			if (!(className in schemas)) {
				schemas[className] = child;
				dfs(child.contents);
			}
		}
		if (util.isArray(child)) {
			child.forEach(dfs);
		}
	};
	roots.forEach(dfs);
	return schemas;
};

const safe = <T>(fn: () => T): T | string => {
	try {
		return fn();
	} catch (e) {
		return `ERROR: ${(e as Error).message}`;
	}
};

/** The labels in a schema's contents by position, the way aliases.names addresses them. */
const labelsOf = (schema: XMLElementSchema): Record<string, string> => {
	const labels: Record<string, string> = {};
	const walk = (child: DescriptorChild, path: string): void => {
		if (util.isArray(child)) {
			child.forEach((item, ndx) => {
				walk(item, `${path}.${ndx}`);
			});
			return;
		}
		if (!util.isDescriptor(child)) {
			return;
		}
		switch (child.type) {
			case 'label':
				if (!(path in labels)) {
					labels[path] = child.label;
				}
				walk(child.value, path);
				return;
			case 'optional':
			case 'required':
			case 'zeroOrMore':
			case 'oneOrMore':
				walk(child.value, path);
				return;
			case 'choices':
				child.choices.forEach((choice: DescriptorChild, ndx: number) => {
					walk(choice, `${path}.${ndx}`);
				});
				return;
		}
	};
	schema.contents.forEach((content, ndx) => {
		walk(content, `${ndx}`);
	});
	return labels;
};

const main = () => {
	const before = collect([handwritten.ScorePartwise, handwritten.ScoreTimewise]);
	const generated = toSchemas(read(XSD_PATH), aliases);
	const after = collect([generated.schemas.ScorePartwise, generated.schemas.ScoreTimewise]);

	const lines: string[] = [];
	const additions: string[] = [];
	const classNames = Array.from(new Set([...Object.keys(before), ...Object.keys(after)])).sort();
	let differing = 0;
	for (const className of classNames) {
		const a = before[className];
		const b = after[className];
		if (!a || !b) {
			if (a) {
				lines.push(`${className}: only in hand-written`);
				differing++;
			} else {
				additions.push(`${className}: new class`);
			}
			continue;
		}
		// What the XSD-derived schema adds to the hand-written one (new attributes, content or asserts) is fine;
		// anything it changes or drops is a difference.
		const diffs: string[] = [];
		const added: string[] = [];
		const apiA = safe(() => toApi(a));
		const apiB = safe(() => toApi(b));
		if (typeof apiA === 'string' || typeof apiB === 'string') {
			diffs.push(
				`  hand-written: ${typeof apiA === 'string' ? apiA : 'ok'}; xsd: ${typeof apiB === 'string' ? apiB : 'ok'}`,
			);
		} else {
			for (const key of Array.from(new Set([...Object.keys(apiA.attributes), ...Object.keys(apiB.attributes)]))) {
				if (apiA.attributes[key] !== apiB.attributes[key]) {
					const line = `  @${key}: ${apiA.attributes[key] ?? '(none)'}  →  ${apiB.attributes[key] ?? '(none)'}`;
					(key in apiA.attributes ? diffs : added).push(line);
				}
			}
			const length = Math.max(apiA.contents.length, apiB.contents.length);
			for (let ndx = 0; ndx < length; ndx++) {
				const ca = apiA.contents[ndx];
				const cb = apiB.contents[ndx];
				if (JSON.stringify(ca) !== JSON.stringify(cb)) {
					const line = `  [${ndx}] ${ca ? `${ca.name}: ${ca.type}` : '(none)'}\n      →  ${cb ? `${cb.name}: ${cb.type}` : '(none)'}`;
					(ca ? diffs : added).push(line);
				}
			}
			const assertsA = new Set(apiA.asserts);
			const assertsB = new Set(apiB.asserts);
			for (const assert of apiA.asserts.filter((x) => !assertsB.has(x))) {
				diffs.push(`  - ${assert}`);
			}
			for (const assert of apiB.asserts.filter((x) => !assertsA.has(x))) {
				added.push(`  + ${assert}`);
			}
			if (apiA.zero !== apiB.zero && added.length === 0) {
				diffs.push(`  zero: ${apiA.zero.slice(0, 300)}\n      →  ${apiB.zero.slice(0, 300)}`);
			}
		}
		if (diffs.length > 0) {
			differing++;
			lines.push(`${className}:`, ...diffs);
		}
		if (added.length > 0) {
			additions.push(`${className}:`, ...added);
		}
	}

	// Labels the hand-written schemas have that the XSD-derived ones lack: candidates for aliases.names.
	const candidates: string[] = [];
	for (const className of classNames) {
		if (!before[className] || !after[className]) {
			continue;
		}
		const theirs = labelsOf(before[className]);
		const ours = labelsOf(after[className]);
		const entries = Object.entries(theirs).filter(([path, label]) => ours[path] !== label);
		if (entries.length > 0) {
			candidates.push(
				`\t'${before[className].name}': { ${entries.map(([path, label]) => `'${path}': '${label}'`).join(', ')} },`,
			);
		}
	}
	if (candidates.length > 0) {
		lines.push('', 'labels the hand-written schemas have that the XSD-derived ones lack:', ...candidates);
	}

	if (generated.missing.length > 0) {
		lines.push('', 'content needing a name in aliases.names:', ...generated.missing.map((m) => `  ${m}`));
	}
	if (additions.length > 0) {
		lines.push('', 'what the XSD adds to the hand-written API:', ...additions);
	}
	lines.push('', `${differing} of ${classNames.length} classes differ; ${generated.missing.length} unnamed`);
	console.log(lines.join('\n'));
	process.exitCode = differing > 0 || generated.missing.length > 0 ? 1 : 0;
};

main();
