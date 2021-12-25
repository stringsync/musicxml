import * as helpers from './helpers';

describe('helpers', () => {
  describe('loadExample', () => {
    it('load examples from the src/testing/examples dir', async () => {
      const xml = await helpers.loadExample('valid.xml');
      expect(xml).toBeString();
      expect(xml).not.toBeEmpty();
    });

    it('throws an error when the file does not exist in the src/testing/examples dir', async () => {
      await expect(helpers.loadExample('some-random-string.xml')).rejects.toThrow();
    });
  });
});
