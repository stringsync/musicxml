import { exec } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as elements from '../lib/elements';
import { generateFiles } from './emit';

const OUTPUT_DIRECTORY = path.join(__dirname, '..', 'generated');
const ELEMENTS_OUTPUT_PATH = path.join(OUTPUT_DIRECTORY, 'elements.ts');
const ASSERTS_OUTPUT_PATH = path.join(OUTPUT_DIRECTORY, 'asserts.ts');

(async () => {
	process.stdout.write('generating files');
	const files = generateFiles([elements.ScorePartwise, elements.ScoreTimewise]);
	process.stdout.write(' ✅\n');

	process.stdout.write(`writing ${ELEMENTS_OUTPUT_PATH}`);
	fs.writeFileSync(ELEMENTS_OUTPUT_PATH, files.elements);
	process.stdout.write(' ✅\n');

	process.stdout.write(`writing ${ASSERTS_OUTPUT_PATH}`);
	fs.writeFileSync(ASSERTS_OUTPUT_PATH, files.asserts);
	process.stdout.write(' ✅\n');

	process.stdout.write('running biome');
	await new Promise((resolve) => exec(`bunx biome check --write ${OUTPUT_DIRECTORY}`, resolve));
	process.stdout.write(' ✅\n');
})();
