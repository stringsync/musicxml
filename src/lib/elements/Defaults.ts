import { element, t } from './factory';

/**
 * Parent elements: <score-partwise>, <score-timewise>
 *
 * The <defaults> element specifies score-wide defaults for scaling; whether or not the file is a concert score; layout;
 * and default values for the music font, word font, lyric font, and lyric language. Except for the <concert-score>
 * element, if any defaults are missing, the choice of what to use is determined by the application.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/defaults/}
 */
export const Defaults = element('defaults', {
  attributes: {},
  content: t.none(),
});
