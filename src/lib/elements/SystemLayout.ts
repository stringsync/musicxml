import { t, xml } from '../xml';
import { SystemDistance } from './SystemDistance';
import { SystemMargins } from './SystemMargins';
import { TopSystemDistance } from './TopSystemDistance';

/**
 * Parent elements: `<defaults>`, `<print>`
 *
 * A system is a group of staves that are read and played simultaneously. The `<system-layout>` element includes left
 * and right margins and the vertical distance from the previous system.
 *
 * Sometimes the sum of measure widths in a system may not equal the system width specified by the layout elements due
 * to roundoff or other errors. The behavior when reading MusicXML files in these cases is application-dependent. For
 * instance, applications may find that the system layout data is more reliable than the sum of the measure widths, and
 * adjust the measure widths accordingly.
 *
 * When used in the `<defaults>` element, the `<system-layout>` element defines a default appearance for all systems in
 * the score. If no `<system-layout>` element is present in the `<defaults>` element, default system layout values are
 * chosen by the application.
 *
 * When used in the `<print>` element, the `<system-layout>` element affects the appearance of the current system only.
 * All other systems use the default values as determined by the `<defaults>` element. If any child elements are missing
 * from the `<system-layout>` element in a `<print>` element, the values determined by the `<defaults>` element are used
 * there as well. This type of `<system-layout>` element need only be read from or written to the first visible part in
 * the score.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/system-layout/}
 */
export type SystemLayout = ReturnType<typeof SystemLayout>;

export const SystemLayout = xml.element(
  'system-layout',
  {
    attributes: {},
    content: [t.optional(SystemMargins), t.optional(SystemDistance), t.optional(TopSystemDistance)] as const,
  },
  {}
);
