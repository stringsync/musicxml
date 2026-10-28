import { describe, expect, it } from 'bun:test';
import * as asserts from './asserts';

describe('asserts', () => {
	it.each(Object.values(asserts))('%p refutes unrelated values', (assert) => {
		expect(assert(Symbol())).toBeFalse();
	});
});

it('recognizes the new XSD classes', async () => {
	const elements = await import('./elements');
	expect(asserts.isPlayerName(new elements.PlayerName())).toBeTrue();
	expect(asserts.isSystemDividers(new elements.SystemDividers())).toBeTrue();
	expect(asserts.isLeftDivider(new elements.LeftDivider())).toBeTrue();
	expect(asserts.isRightDivider(new elements.RightDivider())).toBeTrue();
});
