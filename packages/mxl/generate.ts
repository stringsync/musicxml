import type { Logger } from 'webappwiz/log';
import type { Ps } from 'webappwiz/system';
import { LIBRARY_DIR, run } from './run';

/** Regenerates the elements and asserts from the library's schemas. */
export async function generate(opts: { ps: Ps; log: Logger }): Promise<void> {
	await run(opts.ps, opts.log, ['bun', 'src/scripts/generate.ts'], LIBRARY_DIR);
}
