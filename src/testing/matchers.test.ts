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

  describe('toEqualXML', () => {
    it('asserts XML documents that match exactly', () => {
      expect('<foo></foo>').toEqualXML('<foo></foo>');
    });

    it('asserts XML documents that functionally match', () => {
      expect('<foo></foo>').toEqualXML('<foo/>');
    });

    it('refutes XML documents that do not match', () => {
      expect('<foo>foo</foo>').not.toEqualXML('<bar>bar</bar>');
    });
  });
});
