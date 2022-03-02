import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<measure-repeat>` element
 *
 * Parent element: `<measure-style>`
 *
 * The `<measure-repeat>` element is used for both single and multiple measure repeats. The text of the element
 * indicates the number of measures to be repeated in a single pattern. The text of the element is ignored when the type
 * is stop.
 *
 * The stop type indicates the first measure where the repeats are no longer displayed. Both the start and the stop of
 * the measures being repeated should be specified unless the repeats are displayed through the end of the part.
 *
 * The `<measure-repeat>` element specifies a notation style for repetitions. The actual music being repeated needs to
 * be repeated within each measure of the MusicXML file. This element specifies the notation that indicates the repeat.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/measure-repeat/}
 */
export const MeasureRepeat = schema(
  'measure-repeat',
  {
    /**
     * Indicates the starting or stopping point of the section displaying the measure repeat symbols.
     */
    type: t.required(dataTypes.startStop()),

    /**
     * Specifies the number of slashes to use in the symbol. The value is 1 if not specified.
     */
    slashes: t.optional(dataTypes.positiveInteger()),
  },
  [t.label({ label: 'measure-repeat-value', value: t.required(dataTypes.positiveIntegerOrEmpty()) })] as const
);
