import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<key-octave>` element
 *
 * Parent element: `<key>`
 *
 * The `<key-octave>` element specifies in which octave an element of a key signature appears. The content specifies the
 * octave value using the same values as the `<display-octave>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/key-octave/}
 */
export type KeyOctave = ReturnType<typeof KeyOctave>;

export const KeyOctave = xml.element(
  'key-octave',
  {
    attributes: {
      /**
       * A positive integer that refers to the key signature element in left-to-right order.
       */
      number: t.required(dataTypes.positiveInteger()),

      /**
       * If set to yes, then the number refers to the canceling key signature specified by the `<cancel>` element in the
       * parent `<key>` element. It cannot be set to yes if there is no corresponding `<cancel>` element within the
       * parent `<key>` element. It is no if absent.
       */
      cancel: t.optional(dataTypes.yesNo()),
    },
    content: [t.required(dataTypes.octave())] as const,
  },
  {}
);
