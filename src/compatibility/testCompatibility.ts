import * as examples from '../examples';
import { MusicXML } from '../MusicXML';

export const testCompatibility = (suite: readonly examples.Example[]) => {
  it.each(suite)('preserves the contents of %s', async (example) => {
    const xmlStr = examples.loadExample(example);
    await expect(xmlStr).toBeValidMusicXML();
    const musicXml = MusicXML.parse(xmlStr);
    expect(musicXml.serialize()).toEqualXML(xmlStr);
  });
};
