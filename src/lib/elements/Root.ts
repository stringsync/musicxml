import { t, xml } from '../xml';
import { RootAlter } from './RootAlter';
import { RootStep } from './RootStep';

/**
 * The `<root>` element
 *
 * Parent element: `<harmony>`
 *
 * The `<root>` element indicates a pitch like C, D, E vs. a scale degree like 1, 2, 3. It is used with chord symbols in
 * popular music. The `<root>` element has a `<root-step>` and optional `<root-alter>` element similar to the `<step>`
 * and `<alter>` elements, but renamed to distinguish the different musical meanings.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/root/}
 */
export type Root = ReturnType<typeof Root>;

export const Root = xml.element(
  'root',
  { attributes: {}, content: [t.required(RootStep), t.optional(RootAlter)] as const },
  {}
);
