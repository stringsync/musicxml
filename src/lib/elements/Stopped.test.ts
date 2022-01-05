import { Stopped } from './Stopped';

describe('Stopped', () => {
  it('runs without crashing', () => {
    expect(Stopped).not.toThrow();
  });
});
