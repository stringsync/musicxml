import type { Logger } from 'webappwiz/log';
import type { Ps } from 'webappwiz/system';
import { run } from './run';

/**
 * Builds the Docker images, runs bun test in the test service with the
 * arguments forwarded, then tears the services down. The first failure is
 * rethrown after cleanup.
 */
export async function test(opts: { args: string[]; ps: Ps; log: Logger }): Promise<void> {
	const { ps, log } = opts;
	try {
		await run(ps, log, ['docker', 'compose', 'build']);
		await run(ps, log, ['docker', 'compose', 'run', '--rm', 'test', 'bun', 'test', ...opts.args]);
	} finally {
		await run(ps, log, ['docker', 'compose', 'down']);
	}
}
