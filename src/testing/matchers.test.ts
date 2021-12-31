import * as helpers from './helpers';

describe('matchers', () => {
  describe('toBeValidMusicXML', () => {
    it('asserts valid musicXML', async () => {
      const xml = await helpers.loadExample('valid.xml');
      await expect(xml).toBeValidMusicXML();
    });

    it('refutes invalid musicXML', async () => {
      const xml = await helpers.loadExample('invalid.xml');
      await expect(xml).not.toBeValidMusicXML();
    });

    it('refutes empty musicXML', async () => {
      await expect('').not.toBeValidMusicXML();
    });
  });
});