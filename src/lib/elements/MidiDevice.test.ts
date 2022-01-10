import { MidiDevice } from './MidiDevice';

describe('MidiDevice', () => {
  it('runs without crashing', () => {
    expect(MidiDevice).not.toThrow();
  });
});
