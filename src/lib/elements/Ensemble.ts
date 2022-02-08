import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

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
export const Ensemble = schema('ensemble', {}, [
  t.label({ label: 'size', value: t.required(dataTypes.positiveIntegerOrEmpty()) }),
] as const);
