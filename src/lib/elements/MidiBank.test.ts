import { MidiBank } from './MidiBank';

describe('MidiBank', () => {
  it('runs without crashing', () => {
    expect(MidiBank).not.toThrow();
  });
});
