import { schema, t } from '../schema';
import { Assess } from './Assess';
import { OtherListen } from './OtherListen';
import { Wait } from './Wait';

/**
 * The `<listen>` element
 *
 * Parent element: `<note>`
 *
 * The `<listen>` and `<listening>` elements, new in Version 4.0, specify different ways that a score following or
 * machine listening application can interact with a performer. The `<listen>` element handles interactions that are
 * specific to a note. If multiple child elements of the same type are present, they should have distinct player and/or
 * time-only attributes.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/listen/}
 */
export const Listen = schema('listen', {}, [
  t.label({ label: 'listens', value: t.oneOrMore(t.choices(Assess, Wait, OtherListen)) }),
] as const);
