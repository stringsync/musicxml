import { describe, expect, it } from 'bun:test';
import { MemoryLogger } from 'webappwiz/log';
import { FakePs } from 'webappwiz/system/testing';
import { check } from './check';
import { ship } from './ship';

describe('release checks', () => {
	it('checks code before running tests and forwards test selections', async () => {
		const ps = new FakePs();
		await check({ ps, log: new MemoryLogger(), args: ['packages/mxl/check.test.ts'] });
		expect(ps.getCalls()).toEqual([
			'bunx biome check .',
			'bunx tsc --noEmit -p packages/musicxml',
			'bunx tsc --noEmit -p packages/mxl',
			'docker compose build',
			'docker compose run --rm test bun test packages/mxl/check.test.ts',
			'docker compose down',
		]);
	});

	it('does not run tests after a code check fails', async () => {
		const ps = new FakePs();
		ps.simulate(async () => 1);
		await expect(check({ ps, log: new MemoryLogger() })).rejects.toThrow('fix failed');
		expect(ps.getCalls().some((call) => call.startsWith('docker'))).toBe(false);
	});

	it('refuses to stamp or publish when tests fail, after cleaning up Docker', async () => {
		const ps = new FakePs();
		let calls = 0;
		ps.simulate(async () => (calls++ === 4 ? 1 : 0));
		await expect(ship({ bump: 'patch', ps, log: new MemoryLogger() })).rejects.toThrow('exited with code 1');
		expect(ps.getCalls()).toEqual([
			'bunx biome check .',
			'bunx tsc --noEmit -p packages/musicxml',
			'bunx tsc --noEmit -p packages/mxl',
			'docker compose build',
			'docker compose run --rm test bun test . ../mxl',
			'docker compose down',
		]);
	});
});
