import { describe, expect, it } from 'bun:test';
import * as path from 'node:path';
import type { XMLElementSchema } from '../lib/schema';
import * as util from '../lib/util';
import { aliases } from '../scripts/aliases';
import { getClassName } from '../scripts/emit';
import { read } from '../scripts/xsd/read';
import { toSchemas } from '../scripts/xsd/toSchemas';
import * as elements from './elements';
import { schema } from './schema';

// Compare the runtime descriptors to their XSD source, including constructor
// identity at every object field and array entry, regexes, and numeric bounds.
const picture = (value: any): any => {
	if (util.isFunction(value) && util.isXMLElementCtor(value)) {
		return { element: value.name };
	}
	if (util.isFunction(value)) {
		return picture(value());
	}
	if (util.isXMLElementSchema(value)) {
		return { element: getClassName(value) };
	}
	if (value instanceof RegExp) {
		return { pattern: value.toString() };
	}
	if (Array.isArray(value)) {
		return value.map(picture);
	}
	if (value && typeof value === 'object') {
		return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, picture(child)]));
	}
	return value;
};

describe('shared generated schemas', () => {
	const source = toSchemas(read(path.join(__dirname, '../../../../xmlvalidator/schema/musicxml.xsd')), aliases);

	for (const [name, Element] of Object.entries(elements)) {
		it(`preserves the complete ${name} descriptor tree`, () => {
			const expected: XMLElementSchema = source.schemas[name];
			expect(Element.schema).toBe(schema[name as keyof typeof schema]);
			expect(Element.schema.name).toBe(expected.name);
			expect(picture(Element.schema.attributes)).toEqual(picture(expected.attributes));
			expect(picture(Element.schema.contents)).toEqual(picture(expected.contents));
		});
	}

	it('shares repeated attribute groups and simple type descriptors', () => {
		expect(elements.Accent.schema.attributes).toBe(elements.Staccato.schema.attributes);
		expect(elements.Accent.schema.attributes.color).toBe(elements.Note.schema.attributes.color);
	});
});
