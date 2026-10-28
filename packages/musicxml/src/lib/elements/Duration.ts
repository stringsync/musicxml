import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<duration>` element
 *
 * Parent elements: `<backup>`, `<figured-bass>`, `<forward>`, `<note>`
 *
 * Duration is a positive number specified in division units. The `<duration>` element represents the intended duration
 * vs. the notated duration (for instance, differences in dotted notes in Baroque-era music). Differences in duration
 * specific to an interpretation or performance should be represented using the `<note>` element's attack and release
 * attributes.
 *
 * The `<duration>` element moves the musical position when used in `<backup>` elements, `<forward>` elements, and
 * `<note>` elements that do not contain a `<chord>` child element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/duration/}
 */
export const Duration = schema('duration', {}, [t.required(dataTypes.positiveDivisions())] as const);
