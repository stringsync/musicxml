import { tuple } from '../util';
import { Credit } from './Credit';
import { Defaults } from './Defaults';
import { Identification } from './Identification';
import { Measure } from './Measure';
import { MovementNumber } from './MovementNumber';
import { MovementTitle } from './MovementTitle';
import { Part } from './Part';
import { PartList } from './PartList';
import { ScorePartwise } from './ScorePartwise';
import { Work } from './Work';

describe('ScorePartwise', () => {
  it('runs without crashing', () => {
    expect(ScorePartwise).not.toThrow();
  });

  it('gets and sets the Work content', () => {
    const scorePartwise = ScorePartwise();
    const work = Work();

    scorePartwise.setWork(work);
    const result = scorePartwise.getWork();

    expect(result).toBe(work);
  });

  it('gets and sets the MovementNumber content', () => {
    const scorePartwise = ScorePartwise();
    const movementNumber = MovementNumber();

    scorePartwise.setMovementNumber(movementNumber);
    const result = scorePartwise.getMovementNumber();

    expect(result).toBe(movementNumber);
  });

  it('gets and sets the MovementTitle content', () => {
    const scorePartwise = ScorePartwise();
    const movementTitle = MovementTitle();

    scorePartwise.setMovementTitle(movementTitle);
    const result = scorePartwise.getMovementTitle();

    expect(result).toBe(movementTitle);
  });

  it('gets and sets the Identification content', () => {
    const scorePartwise = ScorePartwise();
    const identification = Identification();

    scorePartwise.setIdentification(identification);
    const result = scorePartwise.getIdentification();

    expect(result).toBe(identification);
  });

  it('gets and sets the Defaults content', () => {
    const scorePartwise = ScorePartwise();
    const defaults = Defaults();

    scorePartwise.setDefaults(defaults);
    const result = scorePartwise.getDefaults();

    expect(result).toBe(defaults);
  });

  it('gets and sets the Credits content', () => {
    const scorePartwise = ScorePartwise();
    const credits = [Credit(), Credit()];

    scorePartwise.setCredits(credits);
    const result = scorePartwise.getCredits();

    expect(result).toBe(credits);
  });

  it('gets and sets the PartLists content', () => {
    const scorePartwise = ScorePartwise();
    const partList = PartList();

    scorePartwise.setPartList(partList);
    const result = scorePartwise.getPartList();

    expect(result).toBe(partList);
  });

  it('gets and sets the Parts content', () => {
    const scorePartwise = ScorePartwise();
    const parts = tuple(Part());

    scorePartwise.setParts(parts);
    const result = scorePartwise.getParts();

    expect(result).toBe(parts);
  });

  it('gets and sets the Measure content', () => {
    const scorePartwise = ScorePartwise();
    const measures = tuple(Measure());

    scorePartwise.setMeasures(measures);
    const result = scorePartwise.getMeasures();

    expect(result).toBe(measures);
  });
});
