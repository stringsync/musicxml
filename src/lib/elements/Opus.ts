import { t, xml } from '../xml';

/**
 * Parent element: `<work>`
 *
 * The `<opus>` element represents a link to a MusicXML opus document that composes multiple MusicXML scores into a
 * collection.
 *
 * {@link }
 */
export type Opus = ReturnType<typeof Opus>;

export const Opus = xml.element(
  'opus',
  {
    attributes: {
      /**
       * 	The href attribute provides the data that allows an application to find a remote resource or resource
       * fragment. See the
       * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-locators)
       */
      ['xlink:href']: t.required(t.string()),

      /**
       * The actuate attribute is used to communicate the desired timing of traversal from the starting resource to the
       * ending resource. The default value is onRequest. See the
       * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-behaviors)
       */
      ['xlink:actuate']: t.optional(t.string()),

      /**
       * The role attribute indicates a property of the link. See the
       * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-semantics)
       */
      ['xlink:role']: t.optional(t.string()),

      /**
       * The show attribute is used to communicate the desired presentation of the ending resource on traversal from the
       * starting resource. The default value is replace. See the
       * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-behaviors)
       */
      ['xlink:show']: t.optional(t.choices('new', 'replace', 'embed', 'other', 'none')),

      /**
       * The title attribute describes the meaning of a link or resource in a human-readable fashion. See the
       * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-semantics)
       */
      ['xlink:title']: t.optional(t.string()),

      /**
       * The type attribute identifies XLink element types. In MusicXML, the value is always simple. See the
       * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-types)
       */
      ['xlink:type']: t.optional(t.choices('simple')),
    },
    content: [] as const,
  },
  {}
);

const o = Opus();
o.attributes['xlink:href'];
