import type { Logger } from 'webappwiz/log';
import type { Ps } from 'webappwiz/system';

/** Runs a command, logging it first; throws if it exits nonzero. */
export async function run(ps: Ps, log: Logger, argv: string[], cwd?: string): Promise<void> {
  log.info(`$ ${argv.join(' ')}`);
  const { exitCode } = await ps.spawn(argv, { cwd });
  if (exitCode !== 0) {
    throw new Error(`${argv.join(' ')} exited with code ${exitCode}`);
  }
}

export const LIBRARY_DIR = 'packages/musicxml';
