import type { Logger } from 'webappwiz/log';
import type { Ps } from 'webappwiz/system';
import { LIBRARY_DIR, run } from './run';

/** Compiles the library to CommonJS in packages/musicxml/dist. */
export async function build(opts: { ps: Ps; log: Logger }): Promise<void> {
  await run(opts.ps, opts.log, ['bunx', 'tsc', '--project', 'tsconfig.build.json'], LIBRARY_DIR);
}
