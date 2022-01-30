import { t } from '../xml';

/**
 * The measure-text type is used for the text attribute of measure elements. It has at least one character. The implicit
 * attribute of the measure element should be set to "yes" rather than setting the text attribute to an empty string.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/measure-text/}
 */
export const measureText = () => {
  return t.not({ include: t.choices('yes' as const, t.string()), exclude: t.constant('' as const) });
};
