import { type Descriptor, type DescriptorChild, t, type XMLElementSchema } from '../lib/schema';

/** Builds an element's contents by hand, with `el` giving the schema of any element by name. */
type Contents = (el: (name: string) => XMLElementSchema) => DescriptorChild[];

/**
 * What the generator needs that musicxml.xsd does not say: names for content the XSD leaves anonymous, class names
 * for elements the XSD declares twice, default values for pattern types, and the places the generated schema is
 * pinned to the behaviour of the old hand-written elements where that disagreed with the XSD.
 */
export type Aliases = {
	/**
	 * Class names for elements whose name is shared by two differently shaped declarations, keyed by the element path
	 * from the document root.
	 */
	classNames: Record<string, string>;

	/**
	 * Accessor and type names for content, keyed by element name and then by the content's position: a top-level
	 * content index (`'0'`), and under it the choice branch or sequence item (`'0.2'`). The generator derives names on
	 * its own for single elements, repeated elements (`dot` → `dots`), repeated choices (`values`) and text content
	 * (`text`, or the simple type's name); everything else, and any of those to be named differently, is listed here.
	 */
	names: Record<string, Record<string, string>>;

	/**
	 * Contents described by hand where the XSD's nesting is not the shape we want the API to have, by element name:
	 * `<note>` flattens the XSD's nested choice into its four variations.
	 */
	contents: Record<string, Contents>;

	/**
	 * The default value of a simple type, used where a document's value is missing or invalid: required for a type
	 * defined by a pattern, and otherwise the XSD's first enumeration or union member unless listed here. An
	 * attribute's own simple type goes by the attribute's name (`xlink:show`).
	 */
	zeros: Record<string, string | number>;

	/** Pins to the hand-written elements this generator replaced, kept so the API and behaviour stay the same. */
	compat: {
		/** Simple types built differently from the XSD, by simple type name. */
		simpleTypes: Record<string, () => Descriptor>;
		/** Attributes built differently from the XSD, or absent from it, by `element@attribute`. */
		attributes: Record<string, () => Descriptor>;
		/** Elements whose text the XSD requires but the hand-written elements left optional. */
		optionalText: string[];
		/** Contents built differently from the XSD, by element name. */
		contents: Record<string, Contents>;
	};
};

export const aliases: Aliases = {
	classNames: {
		'score-partwise/part': 'part-partwise',
		'score-partwise/part/measure': 'measure-partwise',
		'score-timewise/measure': 'measure-timewise',
		'score-timewise/measure/part': 'part-timewise',
	},

	names: {
		'accordion-middle': { '0': 'value' },
		articulations: { '0': 'articulations' },
		attributes: { '10': 'transpositions', '10.0': 'transposes', '10.1': 'for-parts' },
		'beat-repeat': { '0': 'beat-repeat' },
		'beat-unit-tied': { '1': 'beat-unit-dots' },
		bend: { '1': 'bends' },
		'bottom-margin': { '0': 'bottom-margin' },
		'clef-octave-change': { '0': 'clef-octave-change' },
		credit: { '3': 'value', '3.1': 'credit-token' },
		diatonic: { '0': 'diatonic' },
		'direction-type': {
			'0': 'direction-type',
			'0.0': 'rehearsals',
			'0.1': 'segnos',
			'0.2': 'codas',
			'0.3': 'tokens',
			'0.5': 'dynamics-list',
			'0.19': 'percussions',
		},
		distance: { '0': 'distance' },
		dynamics: { '0': 'value' },
		elevation: { '0': 'elevation' },
		encoding: { '0': 'encodings' },
		ensemble: { '0': 'size' },
		fifths: { '0': 'value' },
		first: { '0': 'swing-ratio' },
		'first-fret': { '0': 'fret' },
		'frame-frets': { '0': 'space-size' },
		'frame-strings': { '0': 'lines-size' },
		'group-abbreviation-display': { '0': 'texts' },
		'group-name-display': { '0': 'texts' },
		harmonic: { '0': 'types', '1': 'pitches' },
		harmony: { '0': 'values' },
		'instrument-change': { '1': 'instrument-types' },
		interchangeable: { '1': 'beats' },
		inversion: { '0': 'inversion' },
		key: { '0': 'value', '0.0': 'tranditional-key', '0.1': 'alternate-key' },
		'left-margin': { '0': 'left-margin' },
		'line-width': { '0': 'line-width' },
		listen: { '0': 'listens' },
		listening: { '0': 'listening' },
		lyric: { '0': 'value', '0.0': 'intelligible' },
		'measure-distance': { '0': 'value' },
		'measure-numbering': { '0': 'measure-number-value' },
		'measure-repeat': { '0': 'value' },
		'measure-style': { '0': 'value' },
		metronome: { '0': 'metronome', '0.0': 'beat-spec', '0.1': 'metronome-spec' },
		'metronome-tuplet': { '2': 'normal' },
		'midi-bank': { '0': 'midi16384' },
		'midi-channel': { '0': 'midi16' },
		'midi-program': { '0': 'midi128' },
		'midi-unpitched': { '0': 'midi128' },
		mode: { '0': 'mode' },
		'multiple-rest': { '0': 'multiple-rest' },
		note: {
			'0': 'variation',
			'0.0': 'tied-note',
			'0.1': 'cued-note',
			'0.2': 'tied-grace-note',
			'0.3': 'cued-grace-note',
		},
		'note-size': { '0': 'note-size' },
		'notehead-text': { '0': 'texts' },
		'numeral-fifths': { '0': 'value' },
		offset: { '0': 'value' },
		ornaments: { '0': 'values', '1': 'accidental-marks' },
		'page-height': { '0': 'value' },
		'page-layout': { '2': 'page-margins' },
		'page-width': { '0': 'value' },
		pan: { '0': 'value' },
		'part-abbreviation-display': { '0': 'texts' },
		'part-list': { '2': 'parts' },
		'part-name-display': { '0': 'texts' },
		percussion: { '0': 'value' },
		play: { '0': 'value' },
		rest: { '0': 'value' },
		'right-margin': { '0': 'value' },
		'score-instrument': { '3': 'instrument-types' },
		'score-part': { '9': 'midis' },
		slash: { '0': 'value' },
		sound: { '0': 'playbacks' },
		'staff-details': { '1': 'lines' },
		'staff-distance': { '0': 'value' },
		'staff-size': { '0': 'value' },
		swing: { '0': 'value', '0.1': 'alternate-swing' },
		'swing-type': { '0': 'eighth' },
		'system-distance': { '0': 'system-distance-value' },
		tenths: { '0': 'tenths-value' },
		time: { '0': 'value', '0.0': 'time-signature' },
		'time-modification': { '2': 'normal' },
		'top-margin': { '0': 'top-margin-value' },
		'top-system-distance': { '0': 'value' },
		volume: { '0': 'volume' },
	},

	contents: {
		note: (el) => [
			t.label({
				label: 'variation',
				value: t.choices(
					t.label({
						label: 'tied-note',
						value: [
							t.optional(el('chord')),
							t.choices(el('pitch'), el('unpitched'), el('rest')),
							t.required(el('duration')),
							t.choices([], [el('tie')], [el('tie'), el('tie')]),
						],
					}),
					t.label({
						label: 'cued-note',
						value: [
							t.required(el('cue')),
							t.optional(el('chord')),
							t.choices(el('pitch'), el('unpitched'), el('rest')),
							t.required(el('duration')),
						],
					}),
					t.label({
						label: 'tied-grace-note',
						value: [
							t.required(el('grace')),
							t.optional(el('chord')),
							t.choices(el('pitch'), el('unpitched'), el('rest')),
							t.choices([], [el('tie')], [el('tie'), el('tie')]),
						],
					}),
					t.label({
						label: 'cued-grace-note',
						value: [
							t.required(el('grace')),
							t.required(el('cue')),
							t.optional(el('chord')),
							t.choices(el('pitch'), el('unpitched'), el('rest')),
							t.required(el('duration')),
						],
					}),
				),
			}),
			t.label({ label: 'instruments', value: t.zeroOrMore(el('instrument')) }),
			t.optional(el('footnote')),
			t.optional(el('level')),
			t.optional(el('voice')),
			t.optional(el('type')),
			t.label({ label: 'dots', value: t.zeroOrMore(el('dot')) }),
			t.optional(el('accidental')),
			t.optional(el('time-modification')),
			t.optional(el('stem')),
			t.optional(el('notehead')),
			t.optional(el('notehead-text')),
			t.optional(el('staff')),
			t.label({
				label: 'beams',
				value: t.choices(
					...(Array.from({ length: 9 }, (_, n) => Array(n).fill(el('beam'))) as [
						DescriptorChild,
						...DescriptorChild[],
					]),
				),
			}),
			t.label({ label: 'notations', value: t.zeroOrMore(el('notations')) }),
			t.label({ label: 'lyrics', value: t.zeroOrMore(el('lyric')) }),
			t.optional(el('play')),
			t.optional(el('listen')),
		],
	},

	zeros: {
		// Pattern types.
		color: '#000000',
		'comma-separated-text': ' ',
		'ending-number': '',
		'smufl-coda-glyph-name': 'coda',
		'smufl-segno-glyph-name': 'segno',
		'time-only': '1',
		// Enumerations and unions whose default is not the XSD's first value.
		'accidental-value': 'other',
		'arrow-direction': 'down',
		'arrow-style': 'combined',
		'bar-style': 'none',
		'beam-value': 'backward hook',
		'breath-mark-value': 'comma',
		'circular-arrow': 'anticlockwise',
		'enclosure-shape': 'none',
		'fermata-shape': '',
		'font-size': 'xx-small',
		'harmon-closed-location': 'bottom',
		'harmony-arrangement': 'horizontal',
		'harmony-type': 'alternate',
		'hole-closed-location': 'bottom',
		'kind-value': 'none',
		'line-end': 'none',
		'line-type': 'dashed',
		'margin-type': 'both',
		'note-type-value': 'whole',
		'notehead-value': 'other',
		'number-or-normal': 'normal',
		'positive-integer-or-empty': '',
		'principal-voice-symbol': 'none',
		'show-frets': 'letters',
		'show-tuplet': 'none',
		'staff-type': 'regular',
		'start-note': 'below',
		'stem-value': 'none',
		'stick-material': 'x',
		'swing-type-value': 'eighth',
		syllabic: 'begin',
		'symbol-size': 'cue',
		'system-relation-number': 'none',
		'system-relation': 'none',
		'time-relation': 'space',
		'time-symbol': 'normal',
		'tip-direction': 'down',
		'trill-step': 'unison',
		'two-note-turn': 'none',
		'xlink:actuate': 'none',
		'xlink:show': 'none',
	},

	compat: {
		simpleTypes: {
			// The XSD patterns end in `\c+` or `\c*` (further name characters); the hand-written ones left that off and
			// chose zero values that would not match the real patterns.
			'smufl-accidental-glyph-name': () =>
				t.regex({ pattern: /(acc|medRenFla|medRenNatura|medRenShar|kievanAccidental)/, zero: 'acc' }),
			'smufl-lyrics-glyph-name': () => t.regex({ pattern: /lyrics/, zero: 'lyrics' }),
			'smufl-pictogram-glyph-name': () => t.regex({ pattern: /pict/, zero: 'pict' }),
			'smufl-wavy-line-glyph-name': () => t.regex({ pattern: /(wiggle)|(guitar\c*VibratoStroke)/, zero: 'wiggle' }),
			// The XSD says greater than 0; the engine has inclusive bounds only.
			'positive-divisions': () => t.float({ min: 1 }),
			// The XSD is a union of yes-no and decimal.
			'yes-no-number': () => t.choices('no', 'yes', 0, 1),
			// The XSD is a token of at least one character.
			'measure-text': () => t.not({ include: t.choices('yes', t.string()), exclude: t.constant('') }),
			// The XSD is a plain string.
			mode: () =>
				t.choices(
					'none',
					'major',
					'minor',
					'dorian',
					'phrygian',
					'lydian',
					'mixolydian',
					'aeolian',
					'ionian',
					'locrian',
					t.string(),
				),
			// Typos in the hand-written values: the XSD has before-barline and football rattle.
			'cancel-location': () => t.choices('left', 'right', 'beforeBarline'),
			'wood-value': () =>
				t.choices(
					...([
						'bamboo scraper',
						'board clapper',
						'cabasa',
						'castanets',
						'castanets with handle',
						'claves',
						'footbal rattle',
						'guiro',
						'log drum',
						'maraca',
						'maracas',
						'quijada',
						'rainstick',
						'ratchet',
						'reco-reco',
						'sandpaper blocks',
						'slit drum',
						'temple block',
						'vibraslap',
						'whip',
						'wood block',
					] as [string, ...string[]]),
				),
		},
		attributes: {
			// The library writes MusicXML 4.0 documents; the XSD only says the attribute defaults to 1.0.
			'score-partwise@version': () => t.constant('4.0'),
			'score-timewise@version': () => t.constant('4.0'),
			// Required in the XSD.
			'credit-image@source': () => t.optional(t.string()),
			'credit-image@type': () => t.optional(t.string()),
			'tuplet@type': () => t.optional(t.choices('start', 'stop')),
			// Tokens in the XSD, whose documentation lists the values the hand-written elements made enumerations.
			'distance@type': () => t.required(t.choices('beam', 'hyphen')),
			'line-width@type': () =>
				t.required(
					t.choices(
						...([
							'beam',
							'bracket',
							'dashes',
							'enclosure',
							'ending',
							'extend',
							'heavy barline',
							'leger',
							'light barline',
							'octave shift',
							'pedal',
							'slur middle',
							'slur tip',
							'staff',
							'stem',
							'tie middle',
							'tie tip',
							'tuplet bracket',
							'wedge',
						] as [string, ...string[]]),
					),
				),
			'glyph@type': () =>
				t.required(
					t.choices(
						...([
							'quarter-rest',
							'g-clef-ottava-bassa',
							'c-clef',
							'f-clef',
							'percussion-clef',
							'octave-shift-up-8',
							'octave-shift-down-8',
							'octave-shift-down-15',
							'octave-shift-continue-15',
							'octave-shift-down-22',
							'octave-shift-up-22',
							'octave-shift-continue-22',
						] as [string, ...string[]]),
					),
				),
			// valign-image in the XSD, which has no baseline.
			'image@valign': () => t.optional(t.choices('top', 'middle', 'bottom', 'baseline')),
			// Attributes the XSD does not have: misspellings of non-controlling and accelerate, and extras.
			'measure@non-controller': () => t.optional(t.choices('yes', 'no')),
			'trill-mark@acccelerate': () => t.optional(t.choices('yes', 'no')),
			'with-bar@first-beat': () => t.optional(t.float({ min: 0, max: 100 })),
			'numeral-alter@text': () => t.optional(t.string()),
			'harmon-mute@smufl': () => t.optional(t.string()),
			'text@default-x': () => t.optional(t.float()),
			'text@default-y': () => t.optional(t.float()),
			'frame@font-family': () => t.optional(t.regex({ pattern: /[^,]+(, ?[^,]+)*/, zero: ' ' })),
			'frame@font-size': () =>
				t.optional(
					t.choices(t.choices('xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'), t.float()),
				),
			'frame@font-style': () => t.optional(t.choices('normal', 'italic')),
			'frame@font-weight': () => t.optional(t.choices('normal', 'bold')),
			'part-symbol@font-family': () => t.optional(t.regex({ pattern: /[^,]+(, ?[^,]+)*/, zero: ' ' })),
			'part-symbol@font-size': () =>
				t.optional(
					t.choices(t.choices('xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'), t.float()),
				),
			'part-symbol@font-style': () => t.optional(t.choices('normal', 'italic')),
			'part-symbol@font-weight': () => t.optional(t.choices('normal', 'bold')),
		},
		optionalText: [
			'breath-mark',
			'caesura',
			'display-text',
			'fifths',
			'metronome-relation',
			'other-technical',
			'source',
			'tap',
		],
		contents: {
			// Both or neither in the XSD.
			unpitched: (el) => [t.required(el('display-step')), t.required(el('display-octave'))],
			'page-layout': (el) => [
				t.optional(el('page-height')),
				t.optional(el('page-width')),
				t.label({
					label: 'page-margins',
					value: t.choices([], [el('page-margins')], [el('page-margins'), el('page-margins')]),
				}),
			],
			// A choice between a direction and a circular arrow in the XSD.
			arrow: (el) => [
				t.required(el('arrow-direction')),
				t.optional(el('arrow-style')),
				t.optional(el('arrowhead')),
				t.optional(el('circular-arrow')),
			],
			// Optional single choices in the XSD, made repeatable here.
			harmonic: (el) => [
				t.label({ label: 'types', value: t.zeroOrMore(t.choices(el('natural'), el('artificial'))) }),
				t.label({
					label: 'pitches',
					value: t.zeroOrMore(t.choices(el('base-pitch'), el('touching-pitch'), el('sounding-pitch'))),
				}),
			],
			bend: (el) => [
				t.required(el('bend-alter')),
				t.label({ label: 'bends', value: t.zeroOrMore(t.choices(el('pre-bend'), el('release'))) }),
				t.optional(el('with-bar')),
			],
			'instrument-change': (el) => [
				t.optional(el('instrument-sound')),
				t.label({ label: 'instrument-types', value: t.zeroOrMore(t.choices(el('solo'), el('ensemble'))) }),
				t.optional(el('virtual-instrument')),
			],
			'score-instrument': (el) => [
				t.required(el('instrument-name')),
				t.optional(el('instrument-abbreviation')),
				t.optional(el('instrument-sound')),
				t.label({ label: 'instrument-types', value: t.zeroOrMore(t.choices(el('solo'), el('ensemble'))) }),
				t.optional(el('virtual-instrument')),
			],
			// Repeated sequences of optionals in the XSD, or repeated choices, swapped for one another.
			'score-part': (el) => [
				t.optional(el('identification')),
				t.label({ label: 'part-links', value: t.zeroOrMore(el('part-link')) }),
				t.required(el('part-name')),
				t.optional(el('part-name-display')),
				t.optional(el('part-abbreviation')),
				t.optional(el('part-abbreviation-display')),
				t.label({ label: 'groups', value: t.zeroOrMore(el('group')) }),
				t.label({ label: 'score-instruments', value: t.zeroOrMore(el('score-instrument')) }),
				t.label({ label: 'players', value: t.zeroOrMore(el('player')) }),
				t.label({ label: 'midis', value: t.zeroOrMore(t.choices(el('midi-device'), el('midi-instrument'))) }),
			],
			encoding: (el) => [
				t.label({
					label: 'encodings',
					value: t.zeroOrMore([
						t.optional(el('encoding-date')),
						t.optional(el('encoder')),
						t.optional(el('software')),
						t.optional(el('encoding-description')),
						t.optional(el('supports')),
					]),
				}),
			],
			'notehead-text': (el) => [
				t.label({
					label: 'texts',
					value: t.oneOrMore([t.required(el('display-text')), t.required(el('accidental-text'))]),
				}),
			],
			// Accidental marks follow each ornament in the XSD; here they all come after the ornaments.
			ornaments: (el) => [
				t.label({
					label: 'values',
					value: t.zeroOrMore(
						t.choices(
							el('trill-mark'),
							el('turn'),
							el('delayed-turn'),
							el('inverted-turn'),
							el('delayed-inverted-turn'),
							el('vertical-turn'),
							el('inverted-vertical-turn'),
							el('shake'),
							el('wavy-line'),
							el('mordent'),
							el('inverted-mordent'),
							el('schleifer'),
							el('tremolo'),
							el('haydn'),
							el('other-ornament'),
						),
					),
				}),
				t.label({ label: 'accidental-marks', value: t.zeroOrMore(el('accidental-mark')) }),
			],
		},
	},
};
