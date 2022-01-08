import { Unstress } from './Unstress';

describe('Unstress', () => {
  it('runs without crashing', () => {
    expect(Unstress).not.toThrow();
  });
});
