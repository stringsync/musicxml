import { Metronome } from './Metronome';

describe('Metronome', () => {
  it('runs without crashing', () => {
    expect(Metronome).not.toThrow();
  });
});
