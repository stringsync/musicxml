import { beforeEach, describe, expect, it } from 'bun:test';
import { color, MemoryLogger } from 'webappwiz/log';
import { FakePs } from 'webappwiz/system/testing';
import { mxl } from './mxl';

describe('mxl command program', () => {
	let log: MemoryLogger;
	let ps: FakePs;

	/** Makes the spawn at this zero-based position exit with the code; the others succeed. */
	const failCall = (position: number, code: number) => {
		let seen = 0;
		ps.simulate(async () => (seen++ === position ? code : 0));
	};

	beforeEach(() => {
		log = new MemoryLogger();
		ps = new FakePs();
		ps.setCwd('/repository');
	});

	it('lists the development commands in help without running anything', async () => {
		await mxl.run({ ps, log }, ['--help']);

		const help = log.entries.map((entry) => color.strip(String(entry.message))).join('\n');
		const commands = [...help.matchAll(/^ {2}(\S+)\s+/gm)].map((match) => match[1]);
		expect(commands).toEqual(['build', 'generate', 'test', 'fix', 'ship']);
		expect(ps.getCalls()).toEqual([]);
	});

	it('builds with the library build tsconfig', async () => {
		await mxl.run({ ps, log }, ['build']);

		expect(ps.getCalls()).toEqual(['bunx tsc --project tsconfig.build.json']);
		expect(ps.getCallDirs()).toEqual(['packages/musicxml']);
	});

	it('applies fixes and typechecks by default', async () => {
		await mxl.run({ ps, log }, ['fix']);

		expect(ps.getCalls()).toEqual([
			'bunx biome check . --write',
			'bunx tsc --noEmit -p packages/musicxml',
			'bunx tsc --noEmit -p packages/mxl',
		]);
	});

	it('checks without writing under --check', async () => {
		await mxl.run({ ps, log }, ['fix', '--check', 'true']);

		expect(ps.getCalls()).toEqual([
			'bunx biome check .',
			'bunx tsc --noEmit -p packages/musicxml',
			'bunx tsc --noEmit -p packages/mxl',
		]);
	});

	it('builds, runs and tears down the Docker tests, forwarding arguments', async () => {
		await mxl.run({ ps, log }, ['test', '--watch', 'src/MusicXML.test.ts']);

		expect(ps.getCalls()).toEqual([
			'docker compose build',
			'docker compose run --rm test bun test --watch src/MusicXML.test.ts',
			'docker compose down',
		]);
		expect(ps.getExitCode()).toBe(0);
	});

	it('tears down and fails when the Docker tests fail', async () => {
		failCall(1, 3);

		await mxl.run({ ps, log }, ['test']);

		expect(ps.getCalls()).toEqual([
			'docker compose build',
			'docker compose run --rm test bun test . ../mxl',
			'docker compose down',
		]);
		expect(ps.getExitCode()).toBe(1);
	});

	it('does not run the tests when the image build fails', async () => {
		failCall(0, 1);

		await mxl.run({ ps, log }, ['test']);

		expect(ps.getCalls()).toEqual(['docker compose build', 'docker compose down']);
		expect(ps.getExitCode()).toBe(1);
	});
});
