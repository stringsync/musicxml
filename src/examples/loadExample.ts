import * as fs from 'fs';
import * as path from 'path';
import { EXAMPLES } from '../examples';

type Example = typeof EXAMPLES[keyof typeof EXAMPLES];

// This object is reloaded for each jest worker. Synchronization between workers is not needed. The memory overhead per
// worker is expected to be on the order of MB (worst case is the total size of all the example XMLs).
const CACHE: Record<string, string> = {};

export const loadExample = (example: Example): string => {
  const fileName = path.join(__dirname, '..', 'examples', example);
  if (!(fileName in CACHE)) {
    CACHE[fileName] = fs.readFileSync(fileName, 'utf-8');
  }
  return CACHE[fileName];
};
