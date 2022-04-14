import { EXAMPLE_SUITES } from '../examples';
import { testCompatibility } from './testCompatibility';

describe('guitarPro', () => {
  // Test that MusicXML documents exported from GuitarPro are compatible with this library.
  testCompatibility(EXAMPLE_SUITES.GUITAR_PRO);
});
