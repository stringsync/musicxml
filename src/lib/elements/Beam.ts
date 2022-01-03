import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<beam>` element
 *
 * Parent element: `<note>`
 *
 * Beam values include begin, continue, end, forward hook, and backward hook. Each beam in a note is represented with a
 * separate `<beam>` element with a different number attribute, starting with the eighth note beam using a value of 1.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/beam/}
 */
export type Beam = ReturnType<typeof Beam>;

export const Beam = xml.element(
  'beam',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * Beams that have a begin value may also have a fan attribute to indicate accelerandos and ritardandos using
       * fanned beams. The fan attribute may also be used with a continue value if the fanning direction changes on that
       * note. The value is none if not specified.
       */
      fan: t.optional(dataTypes.fan()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Indicates eighth note through 1024th note beams using number values 1 thru 8 respectively. The default value
       * is 1.
       *
       * Note that this attribute does not distinguish sets of beams that overlap, as it does for <slur> and other
       * elements. Beaming groups are distinguished by being in different voices, and/or the presence or absence of
       * <grace> and <cue> elements.
       */
      number: t.optional(dataTypes.beamLevel()),

      /**
       * Deprecated as of Version 3.0. Formerly used for tremolos, it needs to be specified with a "yes" value for each
       * `<beam>` using it.
       */
      repeater: t.optional(dataTypes.yesNo()),
    },
    content: [t.required(dataTypes.beamValue())] as const,
  },
  {}
);
