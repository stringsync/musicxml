import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<assess>`` element
 *
 * Parent element: `<listen>`
 *
 * By default, an assessment application should assess all notes without a `<cue>` child element, and not assess any
 * note with a `<cue>` child element. The `<assess>` element allows this default assessment to be overridden for
 * individual notes.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/assess/}
 */
export const Assess = schema(
  'assess',
  {
    /**
     * If yes, the note should be assessed; if no, it should not be assessed. If not specified, it is no for notes
     * with a `<cue>` child element and yes otherwise.
     */
    type: t.required(dataTypes.yesNo()),

    /**
     * Restricts the type to apply to a single player. If missing, the type applies to all players. It references the
     * id attribute of a `<player>` element defined within the matching `<score-part>`.
     */
    player: t.optional(dataTypes.idref()),

    /**
     * Restricts the type to apply to a set of times through a repeated section. If missing, the type applies all
     * times through the repeated section.
     */
    ['time-only']: t.optional(dataTypes.timeOnly()),
  },
  [] as const
);
