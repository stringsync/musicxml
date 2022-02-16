import { EXAMPLE_SUITES } from '../examples';
import { testCompatibility } from './testCompatibility';

describe('w3', () => {
  // Test that the examples from https://www.w3.org/2021/06/musicxml40/ are compatible with this library.
  testCompatibility(EXAMPLE_SUITES.W3);
});
