import { describe, expect, it } from 'bun:test';
import type { XMLElement } from '../lib/schema';
import type { Ctor } from '../lib/util';
import * as elements from './elements';

const getAccessors = (Element: Ctor<XMLElement>): Array<{ suffix: string; getter: string; setter: string }> => {
	return Object.getOwnPropertyNames(Element.prototype)
		.filter((name) => name.startsWith('get'))
		.map((name) => name.slice(3))
		.map((suffix) => ({ suffix, getter: `get${suffix}`, setter: `set${suffix}` }));
};

describe('elements', () => {
	for (const Element of Object.values(elements)) {
		describe(Element.name, () => {
			it('can be instantiated without crashing', () => {
				expect(() => new Element()).not.toThrow();
			});

			const accessors = getAccessors(Element);
			if (accessors.length > 0) {
				it.each(accessors)('can get and set $suffix', (accessor) => {
					const element = new Element();
					const symbol = Symbol(accessor.suffix);

					(element as any)[accessor.setter](symbol);
					const value = (element as any)[accessor.getter]();

					expect(value).toBe(symbol);
				});
			}
		});
	}
});

describe('XSD API additions and compatibility', () => {
	it('keeps barline playback tokens distinct from child symbols', () => {
		const segno = new elements.Segno();
		const coda = new elements.Coda();
		const barline = new elements.Barline().setSegnoToken('segno').setCodaToken('coda');
		barline.setSegno(segno).setCoda(coda);
		expect(barline.getSegnoToken()).toBe('segno');
		expect(barline.getCodaToken()).toBe('coda');
		expect(barline.getSegno()).toBe(segno);
		expect(barline.getCoda()).toBe(coda);
		expect(new elements.MidiDevice().setMidi16(16).getMidi16()).toBe(16);
	});

	it('exposes newly modeled text and child elements', () => {
		for (const Element of [elements.Elision, elements.OtherArticulation, elements.OtherPlay, elements.Symbol]) {
			expect(new Element().setText('custom').getText()).toBe('custom');
		}
		expect(new elements.Pitched().setPitchedValue('celesta').getPitchedValue()).toBe('celesta');
		const name = new elements.PlayerName().setText('Soloist');
		expect(new elements.Player().setPlayerName(name).getPlayerName()).toBe(name);
		const dividers = new elements.SystemDividers();
		expect(dividers.getLeftDivider()).toBeInstanceOf(elements.LeftDivider);
		expect(dividers.getRightDivider()).toBeInstanceOf(elements.RightDivider);
		expect(new elements.SystemLayout().setSystemDividers(dividers).getSystemDividers()).toBe(dividers);
	});
});
