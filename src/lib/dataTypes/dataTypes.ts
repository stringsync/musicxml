import { t } from '../xml';

/**
 * The above-below type is used to indicate whether one element appears above or below another element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/above-below/}
 */
export const aboveBelow = () => t.choices('above' as const, 'below' as const);

/**
 * The accidental-value type represents notated accidentals supported by MusicXML. In the MusicXML 2.0 DTD this was a
 * string with values that could be included. The XSD strengthens the data typing to an enumerated list. The quarter-
 * and three-quarters- accidentals are Tartini-style quarter-tone accidentals. The -down and -up accidentals are
 * quarter-tone accidentals that include arrows pointing down or up. The slash- accidentals are used in Turkish
 * classical music. The numbered sharp and flat accidentals are superscripted versions of the accidental signs, used in
 * Turkish folk music. The sori and koron accidentals are microtonal sharp and flat accidentals used in Iranian and
 * Persian music. The other accidental covers accidentals other than those listed here. It is usually used in
 * combination with the smufl attribute to specify a particular Standard Music Font Layout (SMuFL) accidental. The smufl
 * attribute may be used with any accidental value to help specify the appearance of symbols that share the same
 * MusicXML semantics.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/accidental-value/}
 */
export const accidentalValue = () => {
  return t.choices(
    ...([
      'other',
      'sharp',
      'natural',
      'flat',
      'double-sharp',
      'sharp-sharp',
      'flat-flat',
      'natural-sharp',
      'natural-flat',
      'quarter-flat',
      'quarter-sharp',
      'three-quarters-flat',
      'three-quarters-sharp',
      'sharp-down',
      'sharp-up',
      'natural-down',
      'natural-up',
      'flat-down',
      'flat-up',
      'double-sharp-down',
      'double-sharp-up',
      'flat-flat-down',
      'flat-flat-up',
      'arrow-down',
      'arrow-up',
      'triple-sharp',
      'triple-flat',
      'slash-quarter-sharp',
      'slash-sharp',
      'slash-flat',
      'double-slash-flat',
      'sharp-1',
      'sharp-2',
      'sharp-3',
      'sharp-5',
      'flat-1',
      'flat-2',
      'flat-3',
      'flat-4',
      'sori',
      'koron',
    ] as const)
  );
};

/**
 * The accordion-middle type may have values of 1, 2, or 3, corresponding to having 1 to 3 dots in the middle section of
 * the accordion registration symbol. This type is not used if no dots are present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/accordion-middle/}
 */
export const accordionMiddle = () => t.choices(1 as const, 2 as const, 3 as const);

/**
 * See the definition in the W3C XML Schema standard.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/xsd-anyURI/}
 */
export const anyURI = () => t.string();

/**
 * The arrow-direction type represents the direction in which an arrow points, using Unicode arrow terminology.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/arrow-direction/}
 */
export const arrowDirection = () => {
  return t.choices(
    ...([
      'down',
      'left',
      'left right',
      'northeast',
      'northeast southwest',
      'northwest',
      'northwest southeast',
      'other',
      'right',
      'southeast',
      'southwest',
      'up',
      'up down',
    ] as const)
  );
};

/**
 * The arrow-style type represents the style of an arrow, using Unicode arrow terminology. Filled and hollow arrows
 * indicate polygonal single arrows. Paired arrows are duplicate single arrows in the same direction. Combined arrows
 * apply to double direction arrows like left right, indicating that an arrow in one direction should be combined with
 * an arrow in the other direction.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/arrow-style/}
 */
export const arrowStyle = () => {
  return t.choices(...(['combined', 'double', 'filled', 'hollow', 'other', 'paired', 'single'] as const));
};

/**
 * The backward-forward type is used to specify repeat directions. The start of the repeat has a forward direction while
 * the end of the repeat has a backward direction.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/backward-forward/}
 */
export const backwardForward = () => t.choices('backward' as const, 'forward' as const);

/**
 * The bar-style type represents barline style information. Choices are regular, dotted, dashed, heavy, light-light,
 * light-heavy, heavy-light, heavy-heavy, tick (a short stroke through the top line), short (a partial barline between
 * the 2nd and 4th lines), and none.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/bar-style/}
 */
export const barStyle = () => {
  return t.choices(
    ...([
      'none',
      'dashed',
      'dotted',
      'heavy',
      'heavy-heavy',
      'heavy-light',
      'light-heavy',
      'light-light',
      'regular',
      'short',
      'tick',
    ] as const)
  );
};
