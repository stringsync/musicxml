import { EXAMPLE_SUITES } from '../examples';
import { testCompatibility } from './testCompatibility';

describe('osmd', () => {
  // Test that the examples in https://github.com/opensheetmusicdisplay/opensheetmusicdisplay are compatible with this
  // library.
  testCompatibility(EXAMPLE_SUITES.OSMD, { numChunks: 4, chunkIndex: 1 });
});
