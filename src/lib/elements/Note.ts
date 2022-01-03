import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Accidental } from './Accidental';
import { Beam } from './Beam';
import { Chord } from './Chord';
import { Cue } from './Cue';
import { Dot } from './Dot';
import { Duration } from './Duration';
import { Footnote } from './Footnote';
import { Grace } from './Grace';
import { Instrument } from './Instrument';
import { Level } from './Level';
import { Notehead } from './Notehead';
import { NoteheadText } from './NoteheadText';
import { Pitch } from './Pitch';
import { Rest } from './Rest';
import { Staff } from './Staff';
import { Stem } from './Stem';
import { Tie } from './Tie';
import { TimeModification } from './TimeModification';
import { Type } from './Type';
import { Unpitched } from './Unpitched';
import { Voice } from './Voice';

/**
 * The `<note>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * Notes are the most common type of MusicXML data. The MusicXML format distinguishes between elements used for sound
 * information and elements used for notation information (e.g., `<tie>` is used for sound, `<tied>` for notation). Thus
 * grace notes do not have a `<duration>` element. Cue notes have a `<duration>` element, as do `<forward>` elements,
 * but no `<tie>` elements. Having these two types of information available can make interchange easier, as some
 * programs handle one type of information more readily than the other.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/note/}
 */
export type Note = ReturnType<typeof Note>;

export const Note = xml.element(
  'note',
  {
    attributes: {
      /**
       * Alters the starting time of the note from when it would otherwise occur based on the flow of durations -
       * information that is specific to a performance. It is expressed in terms of divisions, either positive or
       * negative. A <note> that stops a tie should not have an attack attribute. The attack and release attributes are
       * independent of each other. The attack attribute only changes the starting time of a note.
       */
      attack: t.optional(dataTypes.divisions()),

      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * Changes the computation of the default horizontal position. The origin is changed relative to the start of the
       * entire current measure, at either the left barline or the start of the system. Positive x is right and negative
       * x is left.
       *
       * This attribute provides higher-resolution positioning data than the `<offset>` element. Applications reading a
       * MusicXML file that can understand both features should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       *
       * This attribute provides higher-resolution positioning data than the placement attribute. Applications reading a
       * MusicXML file that can understand both attributes should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-y']: t.optional(dataTypes.tenths()),

      /**
       * Corresponds to MIDI 1.0's Note On velocity, expressed in terms of percentage of the default forte value
       * (90 for MIDI 1.0).
       */
      dynamics: t.optional(dataTypes.nonNegativeDecimal()),

      /**
       * Corresponds to MIDI 1.0's Note Off velocity, expressed in terms of percentage of the default forte value
       * (90 for MIDI 1.0).
       */
      ['end-dynamics']: t.optional(dataTypes.nonNegativeDecimal()),

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
       * Used when just this note is sounded pizzicato, vs. the <pizzicato> element which changes overall playback
       * between pizzicato and arco.
       */
      pizzicato: t.optional(dataTypes.yesNo()),

      /**
       * Controls the printing of an augmentation dot separately from the rest of the note or rest. This is especially
       * useful for notes that overlap in different voices, or for chord sheets that contain lyrics and chords but no
       * melody. If print-object is set to no, this attribute is also interpreted as being set to no if not present.
       */
      ['print-dot']: t.optional(dataTypes.yesNo()),

      /**
       * Indicates whether leger lines are printed. Notes without leger lines are used to indicate indeterminate high
       * and low notes. It is yes if not present unless print-object is set to no. This attribute is ignored for rests.
       */
      ['print-leger']: t.optional(dataTypes.yesNo()),

      /**
       * Controls the printing of a lyric separately from the rest of the note or rest. This is especially useful for
       * notes that overlap in different voices, or for chord sheets that contain lyrics and chords but no melody. If
       * print-object is set to no, this attribute is also interpreted as being set to no if not present.
       */
      ['print-lyric']: t.optional(dataTypes.yesNo()),

      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),

      /**
       * Controls whether or not spacing is left for an invisible note or object. It is used only if no note, dot, or
       * lyric is being printed. The value is yes (leave spacing) if not specified.
       */
      ['print-spacing']: t.optional(dataTypes.yesNo()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-x attribute. Positive x is right and negative x is left.
       */
      ['relative-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the vertical position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-y attribute. Positive y is up and negative y is down.
       */
      ['relative-y']: t.optional(dataTypes.tenths()),

      /**
       * Alters the stopping time of the note from when it would otherwise occur based on the flow of durations -
       * information that is specific to a performance. It is expressed in terms of divisions, either positive or
       * negative. A `<note>` that starts a tie should not have a release attribute. The attack and release attributes
       * are independent of each other. The release attribute only changes the stopping time of a note.
       */
      release: t.optional(dataTypes.divisions()),

      /**
       * Shows which times to play the note during a repeated section.
       */
      ['time-only']: t.optional(dataTypes.timeOnly()),
    },
    content: [
      t.choices(
        [
          t.required(Grace),
          t.choices(
            [t.optional(Chord), t.choices(Pitch, Unpitched, Rest), t.choices([], [Tie], [Tie, Tie])],
            [t.required(Cue), t.optional(Chord), t.choices(Pitch, Unpitched, Rest), t.required(Duration)]
          ),
        ],
        [t.required(Cue), t.optional(Chord), t.choices(Pitch, Unpitched, Rest), t.required(Duration)]
      ),
      t.zeroOrMore(Instrument),
      t.optional(Footnote),
      t.optional(Level),
      t.optional(Voice),
      t.optional(Type),
      t.zeroOrMore(Dot),
      t.optional(Accidental),
      t.optional(TimeModification),
      t.optional(Stem),
      t.optional(Notehead),
      t.optional(NoteheadText),
      t.optional(Staff),
      t.choices(
        [] as const,
        [Beam] as const,
        [Beam, Beam] as const,
        [Beam, Beam, Beam] as const,
        [Beam, Beam, Beam, Beam] as const,
        [Beam, Beam, Beam, Beam, Beam] as const,
        [Beam, Beam, Beam, Beam, Beam, Beam] as const,
        [Beam, Beam, Beam, Beam, Beam, Beam, Beam] as const,
        [Beam, Beam, Beam, Beam, Beam, Beam, Beam, Beam] as const
      ),
    ] as const,
  },
  {}
);
