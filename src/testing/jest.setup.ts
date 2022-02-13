import * as fs from 'fs';
import 'jest-extended';
import * as path from 'path';
import * as matchers from './matchers';

export const EXAMPLES_DIR = path.join(__dirname, 'examples');
export const ALLOWED_EXAMPLES = { names: new Array<string>() };

expect.extend({
  toBeValidMusicXML: matchers.toBeValidMusicXML,
  toEqualXML: matchers.toEqualXML,
});

beforeAll(async () => {
  ALLOWED_EXAMPLES.names = await new Promise<string[]>((resolve, reject) => {
    fs.readdir(EXAMPLES_DIR, (err, files) => {
      if (err) {
        reject(err);
      }
      const allowedExampleNames = files.filter((file) => file.endsWith('.xml'));
      resolve(allowedExampleNames);
    });
  });
});
