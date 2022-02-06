import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { InstrumentChange } from './InstrumentChange';
import { MidiDevice } from './MidiDevice';
import { MidiInstrument } from './MidiInstrument';
import { Offset } from './Offset';
import { Play } from './Play';
import { Swing } from './Swing';

/**
 * The `<sound>` element
 *
 * Parent elements: `<direction>`, `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<sound>` element contains general playback parameters. They can stand alone within a part/measure, or be a
 * component element within a direction.
 *
 * Instrument changes, MIDI devices, MIDI instruments, and playback techniques are changed using the
 * `<instrument-change>`, `<midi-device>`, `<midi-instrument>`, and `<play>` elements. When there are multiple instances
 * of these elements, they should be grouped together by instrument using the id attribute values.
 *
 * The `<offset>` element is used to indicate that the sound takes place offset from the current score position. If the
 * `<sound>` element is a child of a `<direction>` element, the sound `<offset>` element overrides the direction
 * `<offset>` element if both elements are present. Note that the offset reflects the intended musical position for the
 * change in sound. It should not be used to compensate for latency issues in particular hardware configurations.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sound/}
 */
export type Sound = ReturnType<typeof Sound>;

export const Sound = xml.element(
  'sound',
  {
    attributes: {
      /**
       * Indicates the end point for a forward jump to a coda sign. If there are multiple jumps, the value of these
       * parameters can be used to name and distinguish them.
       */
      coda: t.optional(dataTypes.token()),

      /**
       * Indicates to go back to the beginning of the movement. When used it always has the value "yes".
       *
       * By default, a dacapo attribute indicates that the jump should occur the first time through. The times that
       * jumps occur can be changed by using the time-only attribute.
       */
      dacapo: t.optional(dataTypes.yesNo()),

      /**
       * Indicates the starting point for a backward jump to a segno sign. If there are multiple jumps, the value of
       * these parameters can be used to name and distinguish them.
       *
       * By default, a dalsegno attribute indicates that the jump should occur the first time through. The times that
       * jumps occur can be changed by using the time-only attribute.
       */
      dalsegno: t.optional(dataTypes.token()),

      /**
       * Effects playback of the the common right piano pedal and its MIDI controller equivalent. The yes value
       * indicates the pedal is depressed; no indicates the pedal is released. A numeric value from 0 to 100 may also be
       * used for half pedaling. This value is the percentage that the pedal is depressed. A value of 0 is equivalent to
       * no, and a value of 100 is equivalent to yes.
       */
      ['damper-pedal']: t.optional(dataTypes.yesNoNumber()),

      /**
       * If the segno or coda attributes are used, the divisions attribute can be used to indicate the number of
       * divisions per quarter note. Otherwise sound and MIDI generating programs may have to recompute this.
       */
      divisions: t.optional(dataTypes.divisions()),

      /**
       * Dynamics (or MIDI velocity) are expressed as a percentage of the default forte value (90 for MIDI 1.0).
       */
      dynamics: t.optional(dataTypes.nonNegativeDecimal()),

      /**
       * Allows placing of sound in a 3-D space relative to the listener, expressed in degrees ranging from -180 to 180.
       * 0 is level with the listener, 90 is directly above, and -90 is directly below.
       *
       * Deprecated as of Version 2.0. The `<elevation>` element in the `<midi-instrument>` element should be used
       * instead. If both are present, the `<elevation>` element takes priority.
       */
      elevation: t.optional(dataTypes.rotationDegrees()),

      /**
       * Follows the final note or rest in a movement with a da capo or dal segno direction. If numeric, the value
       * represents the actual duration of the final note or rest, which can be ambiguous in written notation and
       * different among parts and voices. The value may also be "yes" to indicate no change to the final duration.
       */
      fine: t.optional(dataTypes.token()),

      /**
       * Indicates that a forward repeat sign is implied but not displayed. It is used for example in two-part forms
       * with repeats, such as a minuet and trio where no repeat is displayed at the start of the trio. This usually
       * occurs after a barline. When used it always has the value of "yes".
       */
      ['forward-repeat']: t.optional(dataTypes.yesNo()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Allows placing of sound in a 3-D space relative to the listener, expressed in degrees ranging from -180 to 180.
       * 0 is straight ahead, -90 is hard left, 90 is hard right, and -180 and 180 are directly behind the listener.
       *
       * Deprecated as of Version 2.0. The `<pan>` element in the `<midi-instrument>` element should be used instead. If
       * both are present, the `<pan>` element takes priority.
       */
      pan: t.optional(dataTypes.rotationDegrees()),

      /**
       * Affects all following notes. Yes indicates pizzicato, no indicates arco.
       */
      pizzicato: t.optional(dataTypes.yesNo()),

      /**
       * Indicates the end point for a backward jump to a segno sign. If there are multiple jumps, the value of these
       * parameters can be used to name and distinguish them.
       */
      segno: t.optional(dataTypes.token()),

      /**
       * Effects playback of the the common left piano pedal and its MIDI controller equivalent. The yes value indicates
       * the pedal is depressed; no indicates the pedal is released. A numeric value from 0 to 100 may also be used for
       * half pedaling. This value is the percentage that the pedal is depressed. A value of 0 is equivalent to no, and
       * a value of 100 is equivalent to yes.
       */
      ['soft-pedal']: t.optional(dataTypes.yesNoNumber()),

      /**
       * Effects playback of the the common center piano pedal and its MIDI controller equivalent. The yes value
       * indicates the pedal is depressed; no indicates the pedal is released. A numeric value from 0 to 100 may also be
       * used for half pedaling. This value is the percentage that the pedal is depressed. A value of 0 is equivalent to
       * no, and a value of 100 is equivalent to yes.
       */
      ['sostenuto-pedal']: t.optional(dataTypes.yesNoNumber()),

      /**
       * Tempo is expressed in quarter notes per minute. If 0, the sound-generating program should prompt the user at
       * the time of compiling a sound (MIDI) file.
       */
      tempo: t.optional(dataTypes.nonNegativeDecimal()),

      /**
       * Indicates which times to apply the sound element if the <sound> element applies only particular times through a
       * repeat.
       */
      ['time-only']: t.optional(dataTypes.timeOnly()),

      /**
       * Indicates the starting point for a forward jump to a coda sign. If there are multiple jumps, the value of these
       * parameters can be used to name and distinguish them.
       *
       * By default, a tocoda attribute indicates the jump should occur the second time through. The times that jumps
       * occur can be changed by using the time-only attribute.
       */
      tocoda: t.optional(dataTypes.token()),
    },
    content: [
      t.label({
        label: 'playbacks',
        value: t.zeroOrMore([
          t.optional(InstrumentChange),
          t.optional(MidiDevice),
          t.optional(MidiInstrument),
          t.optional(Play),
        ]),
      }),
      t.optional(Swing),
      t.optional(Offset),
    ] as const,
  },
  {}
);
