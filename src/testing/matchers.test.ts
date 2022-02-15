import * as examples from '../examples';
import { EXAMPLE_SUITES } from '../examples';

describe('matchers', () => {
  describe('toBeValidMusicXML', () => {
    it.each(EXAMPLE_SUITES.VALID)('asserts valid musicXML', async (example) => {
      const xml = examples.loadExample(example);
      await expect(xml).toBeValidMusicXML();
    });

    it.each(EXAMPLE_SUITES.INVALID)('refutes invalid musicXML', async (example) => {
      const xml = examples.loadExample(example);
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
