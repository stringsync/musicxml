import { Instruments } from './Instruments';

describe('Instruments', () => {
  it('runs without crashing', () => {
    expect(Instruments).not.toThrow();
  });
});
