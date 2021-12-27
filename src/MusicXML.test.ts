import { MusicXML } from './MusicXML';

describe('MusicXML', () => {
  it('can be created without crashing', () => {
    expect(() => new MusicXML()).not.toThrow();
  });
});
