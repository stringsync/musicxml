import { Software } from './Software';

describe('Software', () => {
  it('runs without crashing', () => {
    expect(Software).not.toThrow();
  });
});
