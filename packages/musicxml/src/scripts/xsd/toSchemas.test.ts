import { describe, expect, it } from 'bun:test';
import * as path from 'node:path';
import * as operations from '../../lib/operations';
import { aliases } from '../aliases';
import { read } from './read';
import { toSchemas } from './toSchemas';

const XSD_PATH = path.join(__dirname, '..', '..', '..', '..', '..', 'xmlvalidator', 'schema', 'musicxml.xsd');

describe('toSchemas', () => {
	const xsd = read(XSD_PATH);
	const { schemas, docs, missing } = toSchemas(xsd, aliases);

	it('reads every element in the schema into a class', () => {
		expect(missing).toEqual([]);
		expect(Object.keys(schemas).length).toBeGreaterThan(440);
		expect(schemas.ScorePartwise.name).toBe('score-partwise');
		expect(schemas.ScoreTimewise.name).toBe('score-timewise');
	});

	it('splits measure and part by document kind', () => {
		expect(schemas.MeasurePartwise).toMatchObject({ name: 'measure', className: 'measure-partwise' });
		expect(schemas.PartTimewise).toMatchObject({ name: 'part', className: 'part-timewise' });
		expect(schemas.Measure).toBeUndefined();
	});

	it('names content the XSD leaves anonymous', () => {
		expect(schemas.Note.contents[0]).toMatchObject({ type: 'label', label: 'variation' });
		expect(schemas.Note.contents[6]).toMatchObject({ type: 'label', label: 'dots' });
		expect(schemas.Key.contents[0]).toMatchObject({
			type: 'label',
			label: 'value',
			value: {
				type: 'choices',
				choices: [
					{ type: 'label', label: 'tranditional-key' },
					{ type: 'label', label: 'alternate-key' },
				],
			},
		});
	});

	it('takes attributes from attribute groups, sorted by name', () => {
		expect(Object.keys(schemas.Note.attributes)).toEqual([
			'attack',
			'color',
			'default-x',
			'default-y',
			'dynamics',
			'end-dynamics',
			'font-family',
			'font-size',
			'font-style',
			'font-weight',
			'id',
			'pizzicato',
			'print-dot',
			'print-leger',
			'print-lyric',
			'print-object',
			'print-spacing',
			'relative-x',
			'relative-y',
			'release',
			'time-only',
		]);
		expect(schemas.Tie.attributes.type).toEqual({
			type: 'required',
			value: { type: 'choices', choices: ['start', 'stop'] },
		});
	});

	it('uses the aliased default value of an enumeration', () => {
		expect(operations.zero(schemas.Type.contents[0])).toBe('whole');
		expect(operations.zero(schemas.Syllabic.contents[0])).toBe('begin');
	});

	it('keeps the element documentation', () => {
		expect(docs.Note).toContain('Notes are the most common type of MusicXML data.');
	});
});
