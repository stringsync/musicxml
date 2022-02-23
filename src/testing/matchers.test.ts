import * as examples from '../examples';
import { EXAMPLES } from '../examples';

describe('matchers', () => {
  describe('toBeValidMusicXML', () => {
    it('asserts valid musicXML', async () => {
      const xml = examples.loadExample(EXAMPLES.HELLO_WORLD);
      await expect(xml).toBeValidMusicXML();
    });

    it('refutes invalid musicXML', async () => {
      const xml = examples.loadExample(EXAMPLES.MOSTLY_INVALID);
      await expect(xml).not.toBeValidMusicXML();
    });

    it('refutes broken musicXML', async () => {
      await expect('<not-music-xml></not-music-xml>').not.toBeValidMusicXML();
    });

    it('refutes empty musicXML', async () => {
      await expect('').not.toBeValidMusicXML();
    });
  });
});
