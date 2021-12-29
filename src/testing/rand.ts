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
