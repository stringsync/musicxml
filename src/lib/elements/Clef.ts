import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { ClefOctaveChange } from './ClefOctaveChange';
import { Line } from './Line';
import { Sign } from './Sign';

/**
 * The `<clef>` element
 *
 * Parent element: `<attributes>`
 *
 * Clefs are represented by a combination of `<sign>`, `<line>`, and `<clef-octave-change>` elements.
 *
 * Clefs appear at the start of each system unless the print-object attribute has been set to "no" or the additional
 * attribute has been set to "yes".
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/clef/}
 */
export type Clef = ReturnType<typeof Clef>;

export const Clef = xml.element(
  'clef',
  {
    attributes: {
      /**
       * Sometimes clefs are added to the staff in non-standard line positions, either to indicate cue passages, or when
       * there are multiple clefs present simultaneously on one staff. In this situation, the additional attribute is
       * set to "yes" and the line value is ignored.
       */
      additional: t.optional(dataTypes.yesNo()),

      /**
       * Sometimes clefs at the start of a measure need to appear after the barline rather than before, as for cues or
       * for use after a repeated section. The after-barline attribute is set to "yes" in this situation. This attribute
       * is ignored for mid-measure clefs.
       */
      ['after-barline']: t.optional(dataTypes.yesNo()),

      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * 	Changes the computation of the default horizontal position. The origin is changed relative to the left-hand
       * side of the note or the musical position within the bar. Positive x is right and negative x is left.
       *
       * This attribute provides higher-resolution positioning data than the `<offset>` element. Applications reading a
       * MusicXML file that can understand both features should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       *
       * This attribute provides higher-resolution positioning data than the placement attribute. Applications reading a
       * MusicXML file that can understand both attributes should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-y']: t.label({ label: 'default-y', value: t.optional(dataTypes.tenths()) }),

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
       * Specifies the staff number from top to bottom within the part. The value is 1 if not present.
       */
      number: t.optional(dataTypes.staffNumber()),

      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-x']: t.label({ label: 'relative-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-y']: t.label({ label: 'relative-y', value: t.optional(dataTypes.tenths()) }),

      /**
       * The size attribute is used for clefs where the additional attribute is "yes". It is typically used to indicate
       * cue clefs.
       */
      size: t.optional(dataTypes.symbolSize()),
    },
    content: [t.required(Sign), t.optional(Line), t.optional(ClefOctaveChange)] as const,
  },
  {}
);
