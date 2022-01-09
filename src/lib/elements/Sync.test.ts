import { Sync } from './Sync';

describe('Sync', () => {
  it('runs without crashing', () => {
    expect(Sync).not.toThrow();
  });
});
