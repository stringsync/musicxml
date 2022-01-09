import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<swing-type>` element
 *
 * Parent element: `<swing>`
 *
 * The `<swing-type>` element specifies the note type, either eighth or 16th, to which the `<first>` to `<second>` ratio
 * is applied. The value is eighth if this element is not present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/swing-type/}
 */
export type SwingType = ReturnType<typeof SwingType>;

export const SwingType = xml.element(
  'swing-type',
  { attributes: {}, content: [t.required(dataTypes.swingTypeValue())] as const },
  {}
);
