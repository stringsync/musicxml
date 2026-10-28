import { describe, expect, it } from 'bun:test';
import { schema, t } from '../lib/schema';
import { generateFiles, getAttributeAccessorNames } from './emit';

describe('generateFiles', () => {
	it('uses supplied XSD documentation for classes without hand-written source files', () => {
		const child = schema('example-child', {}, [t.required(t.string())] as const);
		const root = schema('example-root', { token: t.optional(t.string()) }, [t.required(child)] as const);
		const files = generateFiles([root], {
			ExampleRoot: 'The root documentation.\nA second paragraph.',
			ExampleChild: 'The child documentation.',
		});

		expect(files.elements).toContain('The `<example-root>` element.');
		expect(files.elements).toContain('* The root documentation.\n* A second paragraph.');
		expect(files.elements).toContain('https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/example-root/');
		expect(files.elements).toContain('The child documentation.');
		expect(files.elements.indexOf('export class ExampleChild')).toBeLessThan(
			files.elements.indexOf('export class ExampleRoot'),
		);
		expect(files.elements).toContain("static readonly schema: XMLElementSchema<'example-root'> = schema.ExampleRoot;");
		expect(files.elements).not.toContain('schema = {');
		expect(files.schema).toContain('export const schema:');
		expect(files.asserts).toContain('export const isExampleChild');
		expect(files.asserts).toContain('export const isExampleRoot');
	});

	it('keeps documentation from closing the generated comment', () => {
		const root = schema('example', {}, [] as const);
		expect(generateFiles([root], { Example: 'Text with */ inside.' }).elements).toContain('Text with * / inside.');
	});

	it('keeps labeled attribute accessors attached to the XML attribute', () => {
		const root = schema(
			'example',
			{ token: t.optional(t.label({ label: 'playback-token', value: t.string() })) },
			[] as const,
		);
		expect(getAttributeAccessorNames(root)).toEqual({ token: 'playback-token' });
		const { elements } = generateFiles([root], {});
		expect(elements).toContain("getPlaybackToken(): string | null { return this.attributes['token']; }");
		expect(elements).toContain("ExampleAttributes['token']");
	});
});
