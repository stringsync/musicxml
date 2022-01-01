import { t } from '../xml';

/**
 * The divisions type is used to express values in terms of the musical divisions defined by the divisions element. It
 * is preferred that these be integer values both for MIDI interoperability and to avoid roundoff errors.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/divisions/}
 */
export const divisions = () => t.float();
