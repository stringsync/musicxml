import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<player-name>` element
 *
 * Parent element: `<player>`
 *
 * The `<player-name>` element is typically used within a software application, rather than appearing on the printed
 * page of a score.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/player-name/}
 */
export const PlayerName = schema('player-name', {}, [t.required(dataTypes.string())] as const);
