import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<credit-image>` element
 *
 * Parent element: `<credit>`
 *
 * The `<credit-image>` element is similar to the `<image>` element for a `<direction>`. However, since the `<credit>`
 * is not part of a measure, the default-x and default-y attributes adjust the origin relative to the bottom left-hand
 * corner of the page.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/credit-image/}
 */
export type CreditImage = ReturnType<typeof CreditImage>;

export const CreditImage = xml.element(
  'credit-image',
  {
    attributes: {
      /**
       * Changes the computation of the default horizontal position. The origin is changed relative to the bottom
       * left-hand corner of the specified page. Positive x is right and negative x is left.
       */
      ['default-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the bottom
       * left-hand corner of the specified page. Positive y is up and negative y is down.
       */
      ['default-y']: t.optional(dataTypes.tenths()),

      /**
       * Indicates horizontal alignment to the left, center, or right of the image. Default is implementation-dependent.
       */
      halign: t.optional(dataTypes.leftCenterRight()),

      /**
       * Used to size and scale an image. The image should be scaled independently in X and Y if both height and width
       * are specified. If only height is specified, the image should be scaled proportionally to fit in the specified Y
       * dimension.
       */
      height: t.optional(dataTypes.tenths()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

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
       * The URL for the image file.
       */
      source: t.optional(dataTypes.anyURI()),

      /**
       * The MIME type for the image file format. Typical choices include application/postscript, image/gif, image/jpeg,
       * image/png, and image/tiff.
       */
      type: t.optional(dataTypes.token()),

      /**
       * Indicates vertical alignment to the top, middle, or bottom of the image. The default is
       * implementation-dependent.
       */
      valign: t.optional(dataTypes.valignImage()),

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
