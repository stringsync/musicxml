import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { BeatRepeat } from './BeatRepeat';
import { MeasureRepeat } from './MeasureRepeat';
import { MultipleRest } from './MultipleRest';
import { Slash } from './Slash';

/**
 * The `<measure-style>` element
 *
 * Parent element: `<attributes>`
 *
 * The `<measure-style>` element indicates a special way to print partial to multiple measures within a part. This includes multiple rests over several measures, repeats of beats, single, or multiple measures, and use of slash notation.
 *
 * The `<multiple-rest>` and `<measure-repeat>` elements indicate the number of measures covered in the element content. The `<beat-repeat>` and `<slash>` elements can cover partial measures. All but the multiple-rest element use a type attribute to indicate starting and stopping the use of the style.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/measure-style/}
 */
export const MeasureStyle = schema(
  'measure-style',
  {
    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),

    /**
     * A comma-separated list of font names.
     */
    ['font-family']: t.optional(dataTypes.fontFamily()),

    /**
     * One of the CSS sizes or a numeric point size.
     */
    ['font-size']: t.optional(dataTypes.fontSize()),

    /**
     * Normal or italic style.
     */
    ['font-style']: t.optional(dataTypes.fontStyle()),

    /**
     * Normal or bold weight.
     */
    ['font-weight']: t.optional(dataTypes.fontWeight()),

    /**
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),

    /**
     * Allows a measure style to apply to only the specified staff in the part. If absent, the measure style applies
     * to all staves in the part.
     */
    number: t.optional(dataTypes.staffNumber()),
  },
  [t.label({ label: 'measure-style-value', value: t.choices(MultipleRest, MeasureRepeat, BeatRepeat, Slash) })] as const
);
