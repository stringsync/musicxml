import { expect } from 'bun:test';
import * as matchers from './matchers';

expect.extend({
  toBeValidMusicXML: matchers.toBeValidMusicXML,
  toEqualXML: matchers.toEqualXML,
});
