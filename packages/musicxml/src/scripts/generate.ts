import { exec } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { aliases } from './aliases';
import { generateFiles } from './emit';
import { read } from './xsd/read';
import { toSchemas } from './xsd/toSchemas';

const XSD_PATH = path.join(__dirname, '..', '..', '..', '..', 'xmlvalidator', 'schema', 'musicxml.xsd');

const OUTPUT_DIRECTORY = path.join(__dirname, '..', 'generated');
const ELEMENTS_OUTPUT_PATH = path.join(OUTPUT_DIRECTORY, 'elements.ts');
const SCHEMA_OUTPUT_PATH = path.join(OUTPUT_DIRECTORY, 'schema.ts');
const ASSERTS_OUTPUT_PATH = path.join(OUTPUT_DIRECTORY, 'asserts.ts');

(async () => {
	process.stdout.write('generating files');
	const { schemas, docs, missing } = toSchemas(read(XSD_PATH), aliases);
	if (missing.length > 0) {
		throw new Error(`content needing a name in aliases.names:\n${missing.join('\n')}`);
	}
	const files = generateFiles([schemas.ScorePartwise, schemas.ScoreTimewise], docs);
	process.stdout.write(' ✅\n');

	process.stdout.write(`writing ${ELEMENTS_OUTPUT_PATH}`);
	fs.writeFileSync(ELEMENTS_OUTPUT_PATH, files.elements);
	process.stdout.write(' ✅\n');

	process.stdout.write(`writing ${ASSERTS_OUTPUT_PATH}`);
	fs.writeFileSync(ASSERTS_OUTPUT_PATH, files.asserts);
	process.stdout.write(' ✅\n');

	process.stdout.write(`writing ${SCHEMA_OUTPUT_PATH}`);
	fs.writeFileSync(SCHEMA_OUTPUT_PATH, files.schema);
	process.stdout.write(' ✅\n');

	process.stdout.write('running biome');
	await new Promise((resolve) => exec(`bunx biome check --write ${OUTPUT_DIRECTORY}`, resolve));
	process.stdout.write(' ✅\n');
})();
