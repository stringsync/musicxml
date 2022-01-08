import { Doit } from './Doit';

describe('Doit', () => {
  it('runs without crashing', () => {
    expect(Doit).not.toThrow();
  });
});
