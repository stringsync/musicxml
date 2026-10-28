import type { Logger } from 'webappwiz/log';
import type { Ps } from 'webappwiz/system';
import { LIBRARY_DIR, run } from './run';

const TYPEDOC = ['bunx', 'typedoc', '--tsconfig', 'tsconfig.docs.json'];

/** Generates the API docs into docs/. */
export async function docs(opts: { ps: Ps; log: Logger }): Promise<void> {
	await run(opts.ps, opts.log, TYPEDOC, LIBRARY_DIR);
}
