import { join } from 'node:path';
import type { Logger } from 'webappwiz/log';
import { type Artifact, type Bump, type Bundle, type Cut, releases } from 'webappwiz/ship';
import { type Fs, NodeFs, type Ps } from 'webappwiz/system';
import { build } from './build';
import { check } from './check';
import { docs } from './docs';
import { run } from './run';

export const BUMPS = ['patch', 'minor', 'major'] as const;

export interface ShipOptions {
	bump: Bump;
	log: Logger;
	ps: Ps;
	fs?: Fs;
}

/** Compiles to CommonJS in place: the package publishes its own directory, with dist/ as its files. */
export function commonJsBundle(opts: { ps: Ps; log: Logger; fs?: Fs }): Bundle {
	const fs = opts.fs ?? new NodeFs();
	return {
		async build(dir) {
			await build({ ps: opts.ps, log: opts.log });
			return dir;
		},
		async clean(dir) {
			await fs.rm(join(dir, 'dist'), { recursive: true, force: true });
		},
	};
}

/**
 * Regenerates the API docs once the version is stamped, and stages docs/ so the
 * release commit, which only takes tracked changes, carries pages that are new.
 */
export function docsStep(opts: { ps: Ps; log: Logger }): Artifact {
	return {
		packages: [],
		stage: 'stamp',
		async publish(_cut: Cut) {
			await docs(opts);
			await run(opts.ps, opts.log, ['git', 'add', '--all', 'docs']);
		},
	};
}

/** The release of @stringsync/musicxml: webappwiz/ship owns the flow, this declares what is ours. */
export function release(opts: { ps: Ps; log: Logger; fs?: Fs }) {
	return releases.lockstep(
		releases.build(commonJsBundle(opts)),
		releases.npm('@stringsync/musicxml', { ps: opts.ps }),
		docsStep(opts),
		releases.git(),
		releases.github(),
	);
}

export async function ship(opts: ShipOptions): Promise<void> {
	if (!(BUMPS as readonly string[]).includes(opts.bump)) {
		throw new Error(`unknown version bump "${opts.bump}" (expected ${BUMPS.join(', ')})`);
	}
	// Runs before anything is stamped, so a failure costs nothing.
	await check({ ps: opts.ps, log: opts.log });
	await release(opts).release({ bump: opts.bump, ps: opts.ps, log: opts.log, fs: opts.fs });
}
