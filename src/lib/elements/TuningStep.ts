import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<tuning-step>` element
 *
 * Parent elements: `<accord>`, `<staff-tuning>`
 *
 * The `<tuning-step>` element is represented like the `<step>` element, with a different name to reflect its different
 * function in string tuning.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tuning-step/}
 */
export type TuningStep = ReturnType<typeof TuningStep>;

export const TuningStep = xml.element(
  'tuning-step',
  { attributes: {}, content: [t.required(dataTypes.step())] as const },
  {}
);
