import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<opus>` element
 *
 * Parent element: `<work>`
 *
 * The `<opus>` element represents a link to a MusicXML opus document that composes multiple MusicXML scores into a
 * collection.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/opus-reference/}
 */
export const Opus = schema(
  'opus',
  {
    /**
     * 	The href attribute provides the data that allows an application to find a remote resource or resource
     * fragment. See the
     * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-locators)
     */
    ['xlink:href']: t.required(dataTypes.anyURI()),

    /**
     * The actuate attribute is used to communicate the desired timing of traversal from the starting resource to the
     * ending resource. The default value is onRequest. See the
     * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-behaviors)
     */
    ['xlink:actuate']: t.optional(dataTypes.xlink.actuate()),

    /**
     * The role attribute indicates a property of the link. See the
     * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-semantics)
     */
    ['xlink:role']: t.optional(dataTypes.token()),

    /**
     * The show attribute is used to communicate the desired presentation of the ending resource on traversal from the
     * starting resource. The default value is replace. See the
     * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-behaviors)
     */
    ['xlink:show']: t.optional(dataTypes.xlink.show()),

    /**
     * The title attribute describes the meaning of a link or resource in a human-readable fashion. See the
     * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-semantics)
     */
    ['xlink:title']: t.optional(dataTypes.token()),

    /**
     * The type attribute identifies XLink element types. In MusicXML, the value is always simple. See the
     * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-types)
     */
    ['xlink:type']: t.optional(dataTypes.xlink.type()),
  },
  [] as const
);
