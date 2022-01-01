import { t } from '../xml';

/**
 * The degree-symbol-value type indicates which symbol should be used in specifying a degree.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/degree-symbol-value/}
 */
export const degreeSymbolValue = () => {
  return t.choices(...(['major', 'minor', 'augmented', 'diminished', 'half-diminished'] as const));
};
