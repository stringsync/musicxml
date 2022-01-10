import { MidiProgram } from './MidiProgram';

describe('MidiProgram', () => {
  it('runs without crashing', () => {
    expect(MidiProgram).not.toThrow();
  });
});
