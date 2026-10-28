import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { Ipa } from './Ipa';
import { Mute } from './Mute';
import { OtherPlay } from './OtherPlay';
import { SemiPitched } from './SemiPitched';

/**
 * The `<play>` element
 *
 * Parent elements: `<note>`, `<sound>`
 *
 * The `<play>` element specifies playback techniques to be used in conjunction with the `<instrument-sound>` element.
 * When used as part of a `<sound>` element, it applies to all notes going forward in score order. In multi-instrument
 * parts, the affected instrument should be specified using the id attribute. When used as part of a `<note>` element,
 * it applies to the current note only.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/play/}
 */
export const Play = schema(
  'play',
  {
    /**
     * Refers to a specific `<score-instrument>` to which this playback applies.
     */
    id: t.optional(dataTypes.id()),
  },
  [t.label({ label: 'value', value: t.zeroOrMore(t.choices(Ipa, Mute, SemiPitched, OtherPlay)) })] as const
);
