import { Defaults } from './Defaults';

describe('Defaults', () => {
  it('runs without crashing', () => {
    expect(Defaults).not.toThrow();
  });
});
