import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<stick-material>` element
 *
 * Parent element: `<stick>`
 *
 * The `<stick-material>` element represents the material being displayed in a stick pictogram.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/stick-material/}
 */
export const StickMaterial = schema('stick-material', {}, [t.required(dataTypes.stickMaterial())] as const);
