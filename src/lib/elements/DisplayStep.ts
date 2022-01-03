import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<display-step>` element
 *
 * Parent elements: `<rest>`, `<unpitched>`
 *
 * The `<display-step>` and `<display-octave>` elements are used to place `<rest>` and `<unpitched>` elements on the
 * staff without implying that these elements have pitch. Positioning follows the current clef. If percussion clef is
 * used, the `<display-step>` and `<display-octave>` elements are interpreted as if in treble clef, with a G in octave
 * 4 on line 2.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/display-step/}
 */
export type DisplayStep = ReturnType<typeof DisplayStep>;

export const DisplayStep = xml.element(
  'display-step',
  { attributes: {}, content: [t.required(dataTypes.step())] as const },
  {}
);
