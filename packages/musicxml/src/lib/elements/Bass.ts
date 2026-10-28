import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { BassAlter } from './BassAlter';
import { BassSeparator } from './BassSeparator';
import { BassStep } from './BassStep';

/**
 * The `<bass>` element
 *
 * Parent element: `<harmony>`
 *
 * The `<bass>` element is used to indicate a bass note in popular music chord symbols, e.g. G/C. It is generally not
 * used in functional harmony, as inversion is generally not used in pop chord symbols. As with `<root>`, it is divided
 * into step and alter elements, similar to pitches.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/bass/}
 */
export const Bass = schema(
  'bass',
  {
    /**
     * Specifies where the bass is displayed relative to what precedes it.
     */
    arrangement: t.optional(dataTypes.harmonyArrangement()),
  },
  [t.optional(BassSeparator), t.required(BassStep), t.optional(BassAlter)] as const
);
