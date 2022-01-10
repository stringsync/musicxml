import { MidiInstrument } from './MidiInstrument';

describe('MidiInstrument', () => {
  it('runs without crashing', () => {
    expect(MidiInstrument).not.toThrow();
  });
});
