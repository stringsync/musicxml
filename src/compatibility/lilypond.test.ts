import { EXAMPLE_SUITES } from '../examples';
import { testCompatibility } from './testCompatibility';

describe('lilypond', () => {
  // MusicXML examples from http://lilypond.org/doc/v2.20/input/regression/musicxml/collated-files#top
  testCompatibility(EXAMPLE_SUITES.LILYPOND);
});
