import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<link>` element
 *
 * Parent elements: `<credit>`, `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<link>` element serves as an outgoing simple XLink. If a relative link is used within a document that is part of
 * a compressed MusicXML file, the link is relative to the root folder of the zip file.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/link/}
 */
export type Link = ReturnType<typeof Link>;

export const Link = xml.element(
  'link',
  {
    attributes: {
      /**
       * The href attribute provides the data that allows an application to find a remote resource or resource fragment.
       * See the [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-locators)
       */
      ['xlink:href']: t.required(dataTypes.anyURI()),

      /**
       * Changes the computation of the default horizontal position. The origin is changed relative to the start of the
       * entire current measure, at either the left barline or the start of the system. Positive x is right and negative
       * x is left.
       *
       * This attribute provides higher-resolution positioning data than the `<offset>` element. Applications reading a
       * MusicXML file that can understand both features should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       *
       * This attribute provides higher-resolution positioning data than the placement attribute. Applications reading a
       * MusicXML file that can understand both attributes should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-y']: t.label({ label: 'default-y', value: t.optional(dataTypes.tenths()) }),

      /**
       * The element attribute specifies an element type for a descendant of the next sibling element that is not a
       * `<link>` or `<bookmark>` element. When not present, the `<bookmark>` or `<link>` element refers to the next
       * sibling element in the MusicXML file.
       */
      element: t.optional(dataTypes.nmtoken()),

      /**
       * The name of this link.
       */
      name: t.optional(dataTypes.token()),

      /**
       * The position attribute specifies the position of the descendant element specified by the element attribute,
       * where the first position is 1. The position attribute is ignored if the element attribute is not present.
       *
       * For instance, an element value of "beam" and a position value of "2" defines the `<link>` or `<bookmark>` to
       * refer to the second beam descendant of the next sibling element that is not a `<link>` or `<bookmark>` element.
       * This is equivalent to an XPath test of [.//beam[2]] done in the context of the sibling element.
       */
      position: t.optional(dataTypes.positiveInteger()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-x']: t.label({ label: 'relative-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the vertical position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-y attribute. Positive y is up and negative y is down. It should be interpreted
       * in the context of the placement attribute if that is present.
       */
      ['relative-y']: t.label({ label: 'relative-y', value: t.optional(dataTypes.tenths()) }),

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
      ['xlink:title']: t.optional(t.string()),

      /**
       * The type attribute identifies XLink element types. In MusicXML, the value is always simple. See the
       * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-types)
       */
      ['xlink:type']: t.optional(dataTypes.xlink.type()),
    },
    content: [] as const,
  },
  {}
);
