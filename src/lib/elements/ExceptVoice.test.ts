import { ExceptVoice } from './ExceptVoice';

describe('ExceptVoice', () => {
  it('runs without crashing', () => {
    expect(ExceptVoice).not.toThrow();
  });
});
