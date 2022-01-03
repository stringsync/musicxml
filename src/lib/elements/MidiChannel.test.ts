import { MidiChannel } from './MidiChannel';

describe('MidiChannel', () => {
  it('runs without crashing', () => {
    expect(MidiChannel).not.toThrow();
  });
});
