import { Player } from './Player';

describe('Player', () => {
  it('runs without crashing', () => {
    expect(Player).not.toThrow();
  });
});
