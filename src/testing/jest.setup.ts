import 'jest-extended';
import * as matchers from './matchers';

expect.extend({
  toBeValidMusicXML: matchers.toBeValidMusicXML,
});
