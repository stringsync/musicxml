import { color, type Logger } from 'webappwiz/log';
import type { Ps } from 'webappwiz/system';

/** Formats, lints and typechecks the repository; throws if either check fails. */
export async function fix(opts: { check: boolean; ps: Ps; log: Logger }): Promise<void> {
	const { ps, log } = opts;
	const failures: string[] = [];

	const checkArgs = ['bunx', 'biome', 'check', '.'];
	if (!opts.check) {
		checkArgs.push('--write');
	}
	const steps: Array<{ name: string; argv: string[] }> = [
		{ name: 'check', argv: checkArgs },
		{ name: 'typecheck', argv: ['bunx', 'tsc', '--noEmit', '-p', 'packages/musicxml'] },
	];
	for (const { name, argv } of steps) {
		log.info(`$ ${argv.join(' ')}`);
		const { exitCode } = await ps.spawn(argv);
		log.info(`${name}: ${exitCode === 0 ? color.green('success') : color.red('failed')}`);
		if (exitCode !== 0) {
			failures.push(name);
		}
	}
	if (failures.length > 0) {
		throw new Error(`fix failed: ${failures.join(', ')}`);
	}
}
