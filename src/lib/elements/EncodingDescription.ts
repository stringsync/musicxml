import { t, xml } from '../xml';

/**
 * Parent element: `<encoding>`
 *
 * The `<encoding-description>` element contains descriptive information about the digital encoding that is not
 * provided in the other `<encoding>` child elements.
 */
export type EncodingDescription = ReturnType<typeof EncodingDescription>;

export const EncodingDescription = xml.element('encoding-description', { attributes: {}, content: [t.string()] }, {});
