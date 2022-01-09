import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<image>` element
 *
 * Parent element: `<direction-type>`
 *
 * The `<image>` element is used to include graphical images in a score.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/image/}
 */
export type Image = ReturnType<typeof Image>;

export const Image = xml.element(
  'image',
  {
    attributes: {
      /**
       * The URL for the image file.
       */
      source: t.required(dataTypes.anyURI()),

      /**
       * The MIME type for the image file format. Typical choices include application/postscript, image/gif, image/jpeg,
       * image/png, and image/tiff.
       */
      type: t.required(dataTypes.token()),

      /**
       * 	Changes the computation of the default horizontal position. The origin is changed relative to the left-hand
       * side of the note or the musical position within the bar. Positive x is right and negative x is left.
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
       * In cases where text extends over more than one line, horizontal alignment and justify values can be different.
       * The most typical case is for credits, such as:
       *
       * Words and music by
       *   Pat Songwriter
       *
       * Typically this type of credit is aligned to the right, so that the position information refers to the
       * right-most part of the text. But in this example, the text is center-justified, not right-justified.
       *
       * The halign attribute is used in these situations. If it is not present, its value is the same as for the
       * justify attribute. For elements where a justify attribute is not allowed, the default is
       * implementation-dependent.
       */
      halign: t.optional(dataTypes.leftCenterRight()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-y']: t.optional(dataTypes.tenths()),

      /**
       * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
       * implementation-dependent.
       */
      valign: t.optional(dataTypes.valign()),

      /**
       * Used to size and scale an image. The image should be scaled independently in X and Y if both height and width
       * are specified. If only width is specified, the image should be scaled proportionally to fit in the specified X
       * dimension.
       */
      width: t.optional(dataTypes.tenths()),
    },
    content: [] as const,
  },
  {}
);
