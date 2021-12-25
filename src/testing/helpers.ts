import * as fs from 'fs';
import * as path from 'path';
import { ALLOWED_EXAMPLES, EXAMPLES_DIR } from './jest.setup';

export const loadExample = async (exampleName: string): Promise<string> => {
  if (!ALLOWED_EXAMPLES.names.includes(exampleName)) {
    throw new Error(`invalid example name given: given=${exampleName}, allowed=${ALLOWED_EXAMPLES.names}`);
  }

  return new Promise((resolve, reject) => {
    fs.readFile(path.join(EXAMPLES_DIR, exampleName), 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
