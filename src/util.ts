import { MusicXmlError } from './MusicXmlError';

export const assertUnreachable = (): never => {
  throw new MusicXmlError('expected code to be unreachable');
};
