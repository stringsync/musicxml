import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<ensemble>` element
 *
 * Parent elements: `<instrument-change>`, `<score-instrument>`
 *
 * The `<ensemble>` element is present if performance is intended by an ensemble such as an orchestral section. The text
 * of the `<ensemble>` element contains the size of the section, or is empty if the ensemble size is not specified.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/ensemble/}
 */
export type Ensemble = ReturnType<typeof Ensemble>;

export const Ensemble = xml.element(
  'ensemble',
  { attributes: {}, content: [t.required(dataTypes.positiveIntegerOrEmpty())] as const },
  {}
);
