import type { Logger } from 'webappwiz/log';
import type { Fs, Ps } from 'webappwiz/system';
import { generateSources } from './generate-sources';
import { run } from './run';

/** Regenerates and formats the elements, schema and asserts. */
export async function generate(opts: { ps: Ps; log: Logger; fs?: Fs }): Promise<void> {
	await generateSources(opts);
	await run(opts.ps, opts.log, ['bunx', 'biome', 'check', '--write', 'packages/musicxml/src/generated']);
}
