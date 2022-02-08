import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { ExceptVoice } from './ExceptVoice';
import { SlashDot } from './SlashDot';
import { SlashType } from './SlashType';

/**
 * The `<slash>` element
 *
 * Parent element: `<measure-style>`
 *
 * The `<slash>` element indicates that slash notation is to be used.
 *
 * The stop type indicates the first beat where slash notation no longer displayed. Both the start and stop of the slash
 * notation should be specified unless the slashes are displayed through the end of the part.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/slash/}
 */
export const Slash = schema(
  'slash',
  {
    /**
     * Indicates the starting or stopping point of the section displaying slash notation.
     */
    type: t.required(dataTypes.startStop()),

    /**
     * Indicates whether or not to use dots as well (for instance, with mixed rhythm patterns). The value is no if not
     * specified. This attribute only has effect if use-stems is no.
     */
    ['use-dots']: t.optional(dataTypes.yesNo()),

    /**
     * If the slash is on every beat, use-stems is no (the default). To indicate rhythms but not pitches, use-stems is
     * set to yes.
     */
    ['use-stems']: t.optional(dataTypes.yesNo()),
  },
  [
    t.label({
      label: 'slash',
      value: t.optional([t.optional([t.required(SlashType), t.zeroOrMore(SlashDot)]), t.zeroOrMore(ExceptVoice)]),
    }),
  ] as const
);
