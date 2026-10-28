import { beforeEach, describe, expect, it } from 'bun:test';
import { MemoryLogger } from 'webappwiz/log';
import { Cut } from 'webappwiz/ship';
import { FakeFs, FakePs } from 'webappwiz/system/testing';
import { commonJsBundle, docsStep, release, ship } from './ship';

describe('ship', () => {
	let log: MemoryLogger;
	let ps: FakePs;
	let fs: FakeFs;

	beforeEach(() => {
		log = new MemoryLogger();
		ps = new FakePs();
		ps.setCwd('/repository');
		fs = new FakeFs();
	});

	it('rejects an unknown bump before running anything', async () => {
		await expect(ship({ bump: 'huge' as never, log, ps, fs })).rejects.toThrow('unknown version bump "huge"');

		expect(ps.getCalls()).toEqual([]);
	});

	it('stops at a failing preflight before the release touches anything', async () => {
		ps.simulate(async () => 1);

		await expect(ship({ bump: 'patch', log, ps, fs })).rejects.toThrow('fix failed');

		expect(ps.getCalls()).toEqual([
			'bunx biome check .',
			'bunx tsc --noEmit -p packages/musicxml',
			'bunx tsc --noEmit -p packages/mxl',
		]);
	});

	it('composes a release with docs stamped before publication', () => {
		const declared = release({ ps, log, fs });
		expect(declared.packages).toContain('@stringsync/musicxml');
		expect(declared.artifacts.some((artifact) => artifact.stage === 'stamp')).toBe(true);
	});

	describe('docs step', () => {
		it('runs in the stamp stage, after versions are stamped and before the release commit', () => {
			expect(docsStep({ ps, log }).stage).toBe('stamp');
		});

		it('regenerates typedoc and stages docs so new pages enter the release commit', async () => {
			await docsStep({ ps, log }).publish(new Cut('1.2.3', []));

			expect(ps.getCalls()).toEqual(['bunx typedoc --tsconfig tsconfig.docs.json', 'git add --all docs']);
			expect(ps.getCallDirs()[0]).toBe('packages/musicxml');
		});

		it('does not stage docs when generation fails', async () => {
			ps.simulate(async () => 1);

			await expect(docsStep({ ps, log }).publish(new Cut('1.2.3', []))).rejects.toThrow('typedoc');

			expect(ps.getCalls()).toEqual(['bunx typedoc --tsconfig tsconfig.docs.json']);
		});
	});

	describe('CommonJS bundle', () => {
		it('builds with the existing tsconfig and publishes from the package directory itself', async () => {
			const dir = await commonJsBundle({ ps, log, fs }).build('/repository/packages/musicxml');

			expect(dir).toBe('/repository/packages/musicxml');
			expect(ps.getCalls()).toEqual(['bunx tsc --project tsconfig.build.json']);
		});

		it('cleans only dist', async () => {
			await fs.write('/repository/packages/musicxml/dist/index.js', '');
			await fs.write('/repository/packages/musicxml/package.json', '{}');

			await commonJsBundle({ ps, log, fs }).clean('/repository/packages/musicxml');

			expect(await fs.exists('/repository/packages/musicxml/dist')).toBe(false);
			expect(await fs.exists('/repository/packages/musicxml/package.json')).toBe(true);
		});
	});
});
