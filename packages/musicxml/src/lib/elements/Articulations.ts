import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { Accent } from './Accent';
import { BreathMark } from './BreathMark';
import { Caesura } from './Caesura';
import { DetachedLegato } from './DetachedLegato';
import { Doit } from './Doit';
import { Falloff } from './Falloff';
import { OtherArticulation } from './OtherArticulation';
import { Plop } from './Plop';
import { Scoop } from './Scoop';
import { SoftAccent } from './SoftAccent';
import { Spiccato } from './Spiccato';
import { Staccatissimo } from './Staccatissimo';
import { Staccato } from './Staccato';
import { Stress } from './Stress';
import { StrongAccent } from './StrongAccent';
import { Tenuto } from './Tenuto';
import { Unstress } from './Unstress';

/**
 * The `<articulations>` element
 *
 * Parent element: `<notations>`
 *
 * The `<articulations>` element groups together articulations and accents.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/articulations/}
 */
export const Articulations = schema(
  'articulations',
  {
    /**
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),
  },
  [
    t.label({
      label: 'articulations',
      value: t.zeroOrMore(
        t.choices(
          Accent,
          StrongAccent,
          Staccato,
          Tenuto,
          DetachedLegato,
          Staccatissimo,
          Spiccato,
          Scoop,
          Plop,
          Doit,
          Falloff,
          BreathMark,
          Caesura,
          Stress,
          Unstress,
          SoftAccent,
          OtherArticulation
        )
      ),
    }),
  ] as const
);
