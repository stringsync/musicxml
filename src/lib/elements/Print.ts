import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { MeasureLayout } from './MeasureLayout';
import { MeasureNumbering } from './MeasureNumbering';
import { PageLayout } from './PageLayout';
import { PartAbbreviationDisplay } from './PartAbbreviationDisplay';
import { PartNameDisplay } from './PartNameDisplay';
import { StaffLayout } from './StaffLayout';
import { SystemLayout } from './SystemLayout';

/**
 * The `<print>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<print>` element contains general printing parameters, including layout elements. The `<part-name-display>` and
 * `<part-abbreviation-display>` elements may also be used here to change how a part name or abbreviation is displayed
 * over the course of a piece. They take effect when the current measure or a succeeding measure starts a new system.
 *
 * Layout group elements in a `<print>` element only apply to the current page, system, or staff. Music that follows
 * continues to take the default values from the layout determined by the `<defaults>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/print/}
 */
export type Print = ReturnType<typeof Print>;

export const Print = xml.element(
  'print',
  {
    attributes: {
      /**
       * The number of blank pages to insert before the current measure. It is ignored if new-page is not "yes". These
       * blank pages have no music, but may have text or images specified by the credit element. This is used to allow
       * a combination of pages that are all text, or all text and images, together with pages of music.
       */
      ['blank-page']: t.optional(dataTypes.positiveInteger()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Indicates whether to force a page break, or to force the current music onto the same page as the preceding
       * music. Normally this is the first music data within a measure. If used in multi-part music, the attributes
       * should be placed in the same positions within each part, or the results are undefined.
       */
      ['new-page']: t.optional(dataTypes.yesNo()),

      /**
       * Indicates whether to force a system break, or to force the current music onto the same system as the preceding
       * music. Normally this is the first music data within a measure. If used in multi-part music, the attributes
       * should be placed in the same positions within each part, or the results are undefined.
       */
      ['new-system']: t.optional(dataTypes.yesNo()),

      /**
       * Sets the number of a new page. It is ignored if new-page is not "yes".
       */
      ['page-number']: t.optional(dataTypes.token()),

      /**
       * Specifies spacing between multiple staves in tenths of staff space. Deprecated as of Version 1.1; the
       * staff-layout element should be used instead. If both are present, the staff-layout values take priority.
       */
      ['staff-spacing']: t.optional(dataTypes.tenths()),
    },
    content: [
      t.optional(PageLayout),
      t.optional(SystemLayout),
      t.label({ label: 'staff-layouts', value: t.zeroOrMore(StaffLayout) }),
      t.optional(MeasureLayout),
      t.optional(MeasureNumbering),
      t.optional(PartNameDisplay),
      t.optional(PartAbbreviationDisplay),
    ] as const,
  },
  {}
);
