import { Wait } from './Wait';

describe('Wait', () => {
  it('runs without crashing', () => {
    expect(Wait).not.toThrow();
  });
});
