import * as examples from '../examples';
import { MusicXMLError } from '../lib/errors';
import { MusicXML } from '../MusicXML';

export type TestCompatibilityOpts = {
  numChunks: number;
  chunkIndex: number;
};

/**
 * Adds a jest test that all of the examples in the suite are valid MusicXML and that this library can losslessly parse
 * and serialize the document.
 *
 * @param suite {Array<examples.Example>} the examples to test
 */
export const testCompatibility = (
  suite: readonly examples.Example[],
  opts: TestCompatibilityOpts = { numChunks: 1, chunkIndex: 0 }
) => {
  if (opts.chunkIndex > opts.numChunks - 1 || opts.chunkIndex < 0 || opts.numChunks <= 0) {
    throw new MusicXMLError({
      symptom: 'invalid options',
      context: { opts },
      remedy: 'fix the options to have valid values',
    });
  }

  const chunkSize = Math.floor(suite.length / opts.numChunks);
  const subsuite = getChunks([...suite], chunkSize)[opts.chunkIndex];

  it.each(subsuite)('preserves the contents of %s', async (example) => {
    const xmlStr = examples.loadExample(example);
    await expect(xmlStr).toBeValidMusicXML();
    const musicXml = MusicXML.parse(xmlStr);
    expect(musicXml.serialize()).toEqualXML(xmlStr);
  });
};

const getChunks = <T>(arr: T[], chunkSize: number): T[][] => {
  const result = new Array<T[]>();
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};
