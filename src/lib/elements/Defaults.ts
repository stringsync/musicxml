import { t, xml } from '../xml';
import { Appearance } from './Appearance';
import { ConcertScore } from './ConcertScore';
import { LyricFont } from './LyricFont';
import { LyricLanguage } from './LyricLanguage';
import { MusicFont } from './MusicFont';
import { PageLayout } from './PageLayout';
import { Scaling } from './Scaling';
import { SystemLayout } from './SystemLayout';
import { WordFont } from './WordFont';

/**
 * The `<defautls>` element
 *
 * Parent elements: `<score-partwise>`, `<score-timewise>`
 *
 * The `<defaults>` element specifies score-wide defaults for scaling; whether or not the file is a concert score;
 * layout; and default values for the music font, word font, lyric font, and lyric language. Except for the
 * `<concert-score>` element, if any defaults are missing, the choice of what to use is determined by the application.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/defaults/}
 */
export type Defaults = ReturnType<typeof Defaults>;

export const Defaults = xml.element(
  'defaults',
  {
    attributes: {},
    content: [
      t.optional(Scaling),
      t.optional(ConcertScore),
      t.optional(PageLayout),
      t.optional(SystemLayout),
      t.optional(Appearance),
      t.optional(MusicFont),
      t.optional(WordFont),
      t.zeroOrMore(LyricFont),
      t.zeroOrMore(LyricLanguage),
    ] as const,
  },
  {}
);
