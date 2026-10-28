import { join } from 'node:path';
import type { Logger } from 'webappwiz/log';
import type { Ps } from 'webappwiz/system';
import { LIBRARY_DIR, run } from './run';

const TYPEDOC = ['bunx', 'typedoc', '--tsconfig', 'tsconfig.docs.json'];

/** Generates the API docs into docs/. */
export async function docs(opts: { ps: Ps; log: Logger }): Promise<void> {
  await run(opts.ps, opts.log, TYPEDOC, LIBRARY_DIR);
}

export interface DocsDevOptions {
  port: number;
  ps: Ps;
  log: Logger;
}

/** Rebuilds the docs on change while serving docs/ over HTTP. */
export async function docsDev(opts: DocsDevOptions): Promise<void> {
  const { ps, log } = opts;
  const root = join(ps.cwd(), 'docs');
  const server = Bun.serve({
    port: opts.port,
    async fetch(req) {
      const path = decodeURIComponent(new URL(req.url).pathname);
      const target = join(root, path.endsWith('/') ? `${path}index.html` : path);
      // Refuse paths that escape the docs directory.
      if (!target.startsWith(root)) {
        return new Response('forbidden', { status: 403 });
      }
      const file = Bun.file(target);
      return (await file.exists()) ? new Response(file) : new Response('not found', { status: 404 });
    },
  });
  log.info(`serving docs at ${server.url}`);
  try {
    await run(ps, log, [...TYPEDOC, '--watch', '--preserveWatchOutput'], LIBRARY_DIR);
  } finally {
    await server.stop(true);
  }
}
