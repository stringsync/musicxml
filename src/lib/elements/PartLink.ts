import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { GroupLink } from './GroupLink';
import { InstrumentLink } from './InstrumentLink';

/**
 * The `<part-link>` element
 *
 * Parent element: `<score-part>`
 *
 * The `<part-link>` element allows MusicXML data for both score and parts to be contained within a single compressed
 * MusicXML file. It links a `<score-part>` from a score document to MusicXML documents that contain parts data. In the
 * case of a single compressed MusicXML file, the link href values are paths that are relative to the root folder of the
 * zip file.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-link/}
 */
export type PartLink = ReturnType<typeof PartLink>;

export const PartLink = xml.element(
  'part-link',
  {
    attributes: {
      /**
       * The href attribute provides the data that allows an application to find a remote resource or resource fragment.
       * See the [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-locators)
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
    content: [
      t.label({ label: 'instrument-links', value: t.zeroOrMore(InstrumentLink) }),
      t.label({ label: 'group-links', value: t.zeroOrMore(GroupLink) }),
    ] as const,
  },
  {}
);
