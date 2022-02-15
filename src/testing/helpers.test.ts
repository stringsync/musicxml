import { EXAMPLES } from './examples';
import * as helpers from './helpers';

describe('helpers', () => {
  describe('loadExample', () => {
    it('load examples from the src/testing/examples dir', async () => {
      const xml = await helpers.loadExample(EXAMPLES.VALID1);
      expect(xml).toBeString();
      expect(xml).not.toBeEmpty();
    });
  });
});
