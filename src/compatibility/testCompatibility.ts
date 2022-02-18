import * as examples from '../examples';
import { MusicXML } from '../MusicXML';

/**
 * Dynamically adds a jest test that tests all of the examples in the suite are valid MusicXML and that this library can
 * losslessly parse and serialize the document.
 *
 * @param suite {Array<examples.Example>} the examples to test
 */
export const testCompatibility = (suite: readonly examples.Example[]) => {
  it.each(suite)('preserves the contents of %s', async (example) => {
    const xmlStr = examples.loadExample(example);
    await expect(xmlStr).toBeValidMusicXML();
    const musicXml = MusicXML.parse(xmlStr);
    expect(musicXml.serialize()).toEqualXML(xmlStr);
  });
};
