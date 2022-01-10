import { t } from '../xml';

/**
 * The css-font-size type includes the CSS font sizes used as an alternative to a numeric point size. In CSS these refer
 * to an entry in a table of font sizes computed and kept by the user agent. The scaling is relative to the reference
 * value of medium.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/css-font-size/}
 */
export const cssFontSize = () => {
  return t.choices(...(['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'] as const));
};
