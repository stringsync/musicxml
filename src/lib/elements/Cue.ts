import { xml } from '../xml';

/**
 * The `<cue>` element
 *
 * Parent element: `<note>`
 *
 * The `<cue>` element indicates the presence of a cue note. In MusicXML, a cue note is a silent note with no playback.
 * Normal notes that play can be specified as cue size using the `<type>` element. A cue note that is specified as full
 * size using the `<type>` element will still remain silent.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/cue/}
 */
export type Cue = ReturnType<typeof Cue>;

export const Cue = xml.element('cue', { attributes: {}, content: [] as const }, {});
