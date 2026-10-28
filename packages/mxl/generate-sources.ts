import * as path from 'node:path';
import type { Logger } from 'webappwiz/log';
import { type Fs, NodeFs } from 'webappwiz/system';
import { aliases } from '../musicxml/src/scripts/aliases';
import { generateFiles } from '../musicxml/src/scripts/emit';
import { read } from '../musicxml/src/scripts/xsd/read';
import { toSchemas } from '../musicxml/src/scripts/xsd/toSchemas';

const XSD_PATH = path.join(__dirname, '..', '..', 'xmlvalidator', 'schema', 'musicxml.xsd');

const OUTPUT_DIRECTORY = path.join(__dirname, '..', 'musicxml', 'src', 'generated');
const ELEMENTS_OUTPUT_PATH = path.join(OUTPUT_DIRECTORY, 'elements.ts');
const SCHEMA_OUTPUT_PATH = path.join(OUTPUT_DIRECTORY, 'schema.ts');
const ASSERTS_OUTPUT_PATH = path.join(OUTPUT_DIRECTORY, 'asserts.ts');

export async function generateSources(opts: { log: Logger; fs?: Fs }): Promise<void> {
	const fs = opts.fs ?? new NodeFs();
	opts.log.info('generating files');
	const { schemas, docs, missing } = toSchemas(read(XSD_PATH), aliases);
	if (missing.length > 0) {
		throw new Error(`content needing a name in aliases.names:\n${missing.join('\n')}`);
	}
	const files = generateFiles([schemas.ScorePartwise, schemas.ScoreTimewise], docs);

	opts.log.info(`writing ${ELEMENTS_OUTPUT_PATH}`);
	await fs.write(ELEMENTS_OUTPUT_PATH, files.elements);

	opts.log.info(`writing ${ASSERTS_OUTPUT_PATH}`);
	await fs.write(ASSERTS_OUTPUT_PATH, files.asserts);

	opts.log.info(`writing ${SCHEMA_OUTPUT_PATH}`);
	await fs.write(SCHEMA_OUTPUT_PATH, files.schema);
}
