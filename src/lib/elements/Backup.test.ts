import { Backup } from './Backup';

describe('Backup', () => {
  it('runs without crashing', () => {
    expect(Backup).not.toThrow();
  });
});
