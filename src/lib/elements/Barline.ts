import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { BarStyle } from './BarStyle';
import { Coda } from './Coda';
import { Ending } from './Ending';
import { Fermata } from './Fermata';
import { Footnote } from './Footnote';
import { Level } from './Level';
import { Repeat } from './Repeat';
import { Segno } from './Segno';
import { WavyLine } from './WavyLine';

/**
 * The `<barline>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * If a barline is other than a normal single barline, it should be represented by a `<barline>` element that describes
 * it. This includes information about repeats and multiple endings, as well as line style. Barline data is on the same
 * level as the other musical data in a score - a child of a measure in a partwise score, or a part in a timewise score.
 * This allows for barlines within measures, as in dotted barlines that subdivide measures in complex meters. The two
 * `<fermata>` elements allow for fermatas on both sides of the barline (the lower one inverted).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/barline/}
 */
export type Barline = ReturnType<typeof Barline>;

export const Barline = xml.element(
  'barline',
  {
    attributes: {
      /**
       * Used for playback when there is a `<coda>` child element. Indicates the end point for a forward jump to a coda
       * sign. If there are multiple jumps, the value of these parameters can be used to name and distinguish them.
       */
      coda: t.optional(dataTypes.token()),

      /**
       * If the segno or coda attributes are used, the divisions attribute can be used to indicate the number of
       * divisions per quarter note. Otherwise sound and MIDI generating programs may have to recompute this.
       */
      divisions: t.optional(dataTypes.divisions()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Barlines have a location attribute to make it easier to process barlines independently of the other musical
       * data in a score. It is often easier to set up measures separately from entering notes. The location attribute
       * must match where the `<barline>` element occurs within the rest of the musical data in the score. If location
       * is left, it should be the first element in the measure, aside from the `<print>`, `<bookmark>`, and `<link>`
       * elements. If location is right, it should be the last element, again with the possible exception of the
       * `<print>`, `<bookmark>`, and `<link>` elements. The default value is right.
       */
      location: t.optional(dataTypes.rightLeftMiddle()),

      /**
       * Used for playback when there is a `<segno>` child element. Indicates the end point for a backward jump to a
       * segno sign. If there are multiple jumps, the value of these parameters can be used to name and distinguish
       * them.
       */
      segno: t.optional(dataTypes.token()),
    },
    content: [
      t.optional(BarStyle),
      t.optional(Footnote),
      t.optional(Level),
      t.optional(WavyLine),
      t.optional(Segno),
      t.optional(Coda),
      t.label({ label: 'fermatas', value: t.choices([], [Fermata], [Fermata, Fermata]) }),
      t.optional(Ending),
      t.optional(Repeat),
    ] as const,
  },
  {}
);
