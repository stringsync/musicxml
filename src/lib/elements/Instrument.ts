import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<instrument>` element
 *
 * Parent element: `<note>`
 *
 * The `<instrument>` element distinguishes between `<score-instrument>` elements in a `<score-part>`. If multiple
 * `<score-instrument>` elements are specified in a `<score-part>`, there should be an `<instrument>` element for each
 * note in the `<part>`. Notes that are shared between multiple `<score-instrument>`s can have more than one
 * `<instrument>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/instrument/}
 */
export type Instrument = ReturnType<typeof Instrument>;

export const Instrument = xml.element(
  'instrument',
  {
    attributes: {
      /**
       * An IDREF back to the `<score-instrument>` id attribute.
       */
      id: t.required(dataTypes.idref()),
    },
    content: [] as const,
  },
  {}
);
