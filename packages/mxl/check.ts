import type { Logger } from 'webappwiz/log';
import type { Ps } from 'webappwiz/system';
import { fix } from './fix';
import { test } from './test';

/** Checks formatting, lint, types and tests before a release can change anything. */
export async function check(opts: { ps: Ps; log: Logger; args?: string[] }): Promise<void> {
	await fix({ ...opts, check: true });
	await test({ ...opts, args: opts.args ?? [] });
}
