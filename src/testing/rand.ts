import * as elements from '../lib/elements';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const str = (length: number): string => {
  const chars = new Array<string>(length);
  for (let ndx = 0; ndx < length; ndx++) {
    const randNdx = Math.floor(Math.random() * CHARS.length);
    chars[ndx] = CHARS[randNdx];
  }
  return chars.join('');
};

export const int = (min: number, max: number) => {
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }
  return Math.floor(Math.random() * (max - min) + min);
};

export const scorePartwise = (props: elements.ScorePartwiseProps = {}): elements.ScorePartwise => {
  return new elements.ScorePartwise({
    work: work(),
    movementNumber: movementNumber(),
    movementTitle: movementTitle(),
    identification: identification(),
    defaults: defaults(),
    credits: [credit()],
    partList: partList(),
    parts: [part()],
    ...props,
  });
};

export const work = (props: elements.WorkProps = {}): elements.Work => {
  return new elements.Work({
    ...props,
  });
};

export const movementNumber = (props: elements.MovementNumberProps = {}): elements.MovementNumber => {
  return new elements.MovementNumber({
    ...props,
  });
};

export const movementTitle = (props: elements.MovementTitleProps = {}): elements.MovementTitle => {
  return new elements.MovementTitle({
    ...props,
  });
};

export const identification = (props: elements.IdentificationProps = {}): elements.Identification => {
  return new elements.Identification({
    ...props,
  });
};

export const defaults = (props: elements.DefaultsProps = {}): elements.Defaults => {
  return new elements.Defaults({
    ...props,
  });
};

export const credit = (props: elements.CreditProps = {}): elements.Credit => {
  return new elements.Credit({
    ...props,
  });
};

export const partList = (props: elements.PartListProps = {}): elements.PartList => {
  return new elements.PartList({
    ...props,
  });
};

export const part = (props: elements.PartProps = {}): elements.Part => {
  return new elements.PartList({
    ...props,
  });
};
