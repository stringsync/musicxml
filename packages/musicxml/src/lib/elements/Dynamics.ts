import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { F } from './F';
import { Ff } from './Ff';
import { Fff } from './Fff';
import { Ffff } from './Ffff';
import { Fffff } from './Fffff';
import { Ffffff } from './Ffffff';
import { Fp } from './Fp';
import { Fz } from './Fz';
import { Mf } from './Mf';
import { Mp } from './Mp';
import { N } from './N';
import { OtherDynamics } from './OtherDynamics';
import { P } from './P';
import { Pf } from './Pf';
import { Pp } from './Pp';
import { Ppp } from './Ppp';
import { Pppp } from './Pppp';
import { Ppppp } from './Ppppp';
import { Pppppp } from './Pppppp';
import { Rf } from './Rf';
import { Rfz } from './Rfz';
import { Sf } from './Sf';
import { Sffz } from './Sffz';
import { Sfp } from './Sfp';
import { Sfpp } from './Sfpp';
import { Sfz } from './Sfz';
import { Sfzp } from './Sfzp';

/**
 * The `<dynamics>` element
 *
 * Parent elements: `<direction-type>`, `<notations>`
 *
 * Dynamics can be associated either with a note or a general musical direction. To avoid inconsistencies between and
 * amongst the letter abbreviations for dynamics (what is sf vs. sfz, standing alone or with a trailing dynamic that is
 * not always piano), we use the actual letters as the names of these dynamic elements. The `<other-dynamics>` element
 * allows other dynamic marks that are not covered here. Dynamics elements may also be combined to create marks not
 * covered by a single element, such as `<sf/>``<mp/>`.
 *
 * These letter dynamic symbols are separated from crescendo, decrescendo, and wedge indications. Dynamic representation
 * is inconsistent in scores. Many things are assumed by the composer and left out, such as returns to original
 * dynamics. The MusicXML format captures what is in the score, but does not try to be optimal for analysis or synthesis
 * of dynamics.
 *
 * The placement attribute is used when the dynamics are associated with a `<note>`. It is ignored when the dynamics are
 * associated with a `<direction>`. In that case the `<direction>` element's placement attribute is used instead.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/dynamics/}
 */
export const Dynamics = schema(
  'dynamics',
  {
    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),

    /**
     * Changes the computation of the default horizontal position. If the parent is a `<notehead-text>` element, the
     * origin is changed relative to the left-hand side of the note or the musical position within the bar. Otherwise,
     * the origin is changed relative to the start of the first measure on the system, and these values are used when
     * the current measure or a succeeding measure starts a new system. Positive x is right and negative x is left.
     */
    ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
     * staff. Positive y is up and negative y is down.
     */
    ['default-y']: t.label({ label: 'default-y', value: t.optional(dataTypes.tenths()) }),

    /**
     * Formatting of an enclosure around text or symbols.
     */
    enclosure: t.optional(dataTypes.enclosureShape()),

    /**
     * A comma-separated list of font names.
     */
    ['font-family']: t.optional(dataTypes.fontFamily()),

    /**
     * One of the CSS sizes or a numeric point size.
     */
    ['font-size']: t.optional(dataTypes.fontSize()),

    /**
     * Normal or italic style.
     */
    ['font-style']: t.optional(dataTypes.fontStyle()),

    /**
     * Normal or bold weight.
     */
    ['font-weight']: t.optional(dataTypes.fontWeight()),

    /**
     * In cases where text extends over more than one line, horizontal alignment and justify values can be different.
     * The most typical case is for credits, such as:
     *
     * Words and music by
     *   Pat Songwriter
     *
     * Typically this type of credit is aligned to the right, so that the position information refers to the
     * right-most part of the text. But in this example, the text is center-justified, not right-justified.
     *
     * The halign attribute is used in these situations. If it is not present, its value is the same as for the
     * justify attribute. For elements where a justify attribute is not allowed, the default is
     * implementation-dependent.
     */
    halign: t.optional(dataTypes.leftCenterRight()),

    /**
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),

    /**
     * Number of lines to use when overlining text.
     */
    overline: t.optional(dataTypes.numberOfLines()),

    /**
     * Indicates whether something is above or below another element, such as a note or a notation.
     */
    placement: t.optional(dataTypes.aboveBelow()),

    /**
     * Number of lines to use when striking through text.
     */
    ['line-through']: t.optional(dataTypes.numberOfLines()),

    /**
     * Changes the horizontal position relative to the default position, either as computed by the individual program,
     * or as overridden by the default-x attribute. Positive x is right and negative x is left.
     */
    ['relative-x']: t.label({ label: 'relative-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the vertical position relative to the default position, either as computed by the individual program,
     * or as overridden by the default-y attribute. Positive y is up and negative y is down.
     */
    ['relative-y']: t.label({ label: 'relative-y', value: t.optional(dataTypes.tenths()) }),

    underline: t.optional(dataTypes.numberOfLines()),

    /**
     * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
     * implementation-dependent.
     */
    valign: t.optional(dataTypes.valign()),
  },
  [
    t.label({
      label: 'value',
      value: t.zeroOrMore(
        t.choices(
          P,
          Pp,
          Ppp,
          Pppp,
          Ppppp,
          Pppppp,
          F,
          Ff,
          Fff,
          Ffff,
          Fffff,
          Fffff,
          Ffffff,
          Mp,
          Mf,
          Sf,
          Sfp,
          Sfpp,
          Fp,
          Rf,
          Rfz,
          Sfz,
          Sffz,
          Fz,
          N,
          Pf,
          Sfzp,
          OtherDynamics
        )
      ),
    }),
  ] as const
);
