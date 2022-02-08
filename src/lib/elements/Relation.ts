import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<relation>` element
 *
 * Parent element: `<identification>`
 *
 * The `<relation>` element describes a related resource for the music that is encoded. This is similar to the [Dublin
 * Core relation element](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/elements11/relation/).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/relation/}
 */
export const Relation = schema(
  'relation',
  {
    /**
     * Standard type values are music, words, and arrangement, but other types may be used.
     */
    type: t.optional(dataTypes.token()),
  },
  [t.required(dataTypes.string())] as const
);
