import { MusicXML } from './MusicXML';

describe('MusicXML', () => {
  it('can be created without crashing', () => {
    const musicXML = new MusicXML();
    expect(musicXML).toBeInstanceOf(MusicXML);
  });
});
