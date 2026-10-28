import { expect, it } from 'bun:test';
import { join } from 'node:path';
import { MemoryLogger } from 'webappwiz/log';
import { FakeFs, FakePs } from 'webappwiz/system/testing';
import { generate } from './generate';

it('generates all sources directly and propagates formatting failures', async () => {
	const fs = new FakeFs();
	const ps = new FakePs();
	ps.simulate(async () => 1);
	await expect(generate({ fs, ps, log: new MemoryLogger() })).rejects.toThrow('biome');
	for (const name of ['elements', 'asserts', 'schema']) {
		expect(await fs.exists(join(import.meta.dir, '../musicxml/src/generated', `${name}.ts`))).toBe(true);
	}
	expect(ps.getCalls()).toEqual(['bunx biome check --write packages/musicxml/src/generated']);
});
