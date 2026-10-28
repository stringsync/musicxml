import { cli, type Deps } from 'webappwiz/cmd';
import { z } from 'zod';
import { build } from './build';
import { docs, docsDev } from './docs';
import { fix } from './fix';
import { generate } from './generate';
import { test } from './test';

export const mxl = cli<Deps>('mxl');

mxl
	.command('build')
	.description('compile the library to dist')
	.action((_, { ps, log }) => build({ ps, log }));

mxl
	.command('generate')
	.description('regenerate the elements and asserts')
	.action((_, { ps, log }) => generate({ ps, log }));

mxl
	.command('test')
	.description('run the test suite in Docker; forward arguments to bun test')
	.allowUnknownOption()
	.passThroughOptions()
	.rest('args', z.string(), { description: 'arguments forwarded to bun test' })
	.action((opts, { ps, log }) => test({ ...opts, ps, log }));

mxl
	.command('docs')
	.description('generate the API docs')
	.action((_, { ps, log }) => docs({ ps, log }));

mxl
	.command('docs:dev')
	.description('rebuild the docs on change and serve them')
	.option('port', z.coerce.number(), { default: 3000, description: 'port to serve docs on' })
	.action((opts, { ps, log }) => docsDev({ port: opts.port, ps, log }));

mxl
	.command('fix')
	.description('format, lint, and typecheck')
	.option('check', z.stringbool(), { default: false, description: 'check without writing fixes' })
	.action((opts, { ps, log }) => fix({ ...opts, ps, log }));
