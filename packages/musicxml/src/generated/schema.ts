import type { Descriptor, XMLElementCtor, XMLElementSchema } from '../lib/schema';

const constructors: Record<string, XMLElementCtor> = {};
export const registerElement = (name: string, element: XMLElementCtor): void => {
	constructors[name] = element;
};

// Array entries, like object fields, resolve constructors only after the classes load.
const withElements = (values: any[], refs: Record<number, () => XMLElementCtor>): any => {
	for (const [index, get] of Object.entries(refs)) {
		Object.defineProperty(values, index, { get, enumerable: true, configurable: true });
	}
	return values;
};

const shared0: Record<string, Descriptor> = {};

const shared1: Descriptor = { type: 'string' };

const shared2: Descriptor = { type: 'required', value: shared1 };

const shared3: Descriptor = { type: 'label', label: 'text', value: shared2 };

const shared4: Descriptor = { type: 'choices', choices: ['none', 'onRequest', 'onLoad', 'other'] };

const shared5: Descriptor = { type: 'optional', value: shared4 };

const shared6: Descriptor = { type: 'optional', value: shared1 };

const shared7: Descriptor = { type: 'choices', choices: ['none', 'new', 'replace', 'embed', 'other'] };

const shared8: Descriptor = { type: 'optional', value: shared7 };

const shared9: Descriptor = { type: 'choices', choices: ['simple'] };

const shared10: Descriptor = { type: 'optional', value: shared9 };

const shared11: Record<string, Descriptor> = {
	'xlink:actuate': shared5,
	'xlink:href': shared2,
	'xlink:role': shared6,
	'xlink:show': shared8,
	'xlink:title': shared6,
	'xlink:type': shared10,
};

const shared12: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.WorkNumber;
	},
};

const shared13: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.WorkTitle;
	},
};

const shared14: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Opus;
	},
};

const shared15: Record<string, Descriptor> = { type: shared6 };

const shared16: Descriptor = { type: 'date' };

const shared17: Descriptor = { type: 'required', value: shared16 };

const shared18: Descriptor = { type: 'label', label: 'yyyy-mm-dd', value: shared17 };

const shared19: Descriptor = { type: 'choices', choices: ['yes', 'no'] };

const shared20: Descriptor = { type: 'required', value: shared19 };

const shared21: Record<string, Descriptor> = { attribute: shared6, element: shared2, type: shared20, value: shared6 };

const shared22: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.EncodingDate;
	},
};

const shared23: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Encoder;
	},
};

const shared24: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Software;
	},
};

const shared25: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.EncodingDescription;
	},
};

const shared26: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Supports;
	},
};

const shared27: Descriptor = { type: 'zeroOrMore', value: [shared22, shared23, shared24, shared25, shared26] };

const shared28: Descriptor = { type: 'label', label: 'encodings', value: shared27 };

const shared29: Descriptor = { type: 'label', label: 'text', value: shared6 };

const shared30: Record<string, Descriptor> = { name: shared2 };

const shared31: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.MiscellaneousField;
	},
};

const shared32: Descriptor = { type: 'label', label: 'miscellaneous-fields', value: shared31 };

const shared33: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Creator;
	},
};

const shared34: Descriptor = { type: 'label', label: 'creators', value: shared33 };

const shared35: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Rights;
	},
};

const shared36: Descriptor = { type: 'label', label: 'rights', value: shared35 };

const shared37: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Encoding;
	},
};

const shared38: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Source;
	},
};

const shared39: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Relation;
	},
};

const shared40: Descriptor = { type: 'label', label: 'relations', value: shared39 };

const shared41: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Miscellaneous;
	},
};

const shared42: Descriptor = { type: 'float', min: -Infinity, max: Infinity };

const shared43: Descriptor = { type: 'required', value: shared42 };

const shared44: Descriptor = { type: 'label', label: 'millimeters', value: shared43 };

const shared45: Descriptor = { type: 'label', label: 'tenths-value', value: shared43 };

const shared46: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Millimeters;
	},
};

const shared47: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Tenths;
	},
};

const shared48: Descriptor = { type: 'label', label: 'value', value: shared43 };

const shared49: Descriptor = { type: 'label', label: 'left-margin', value: shared43 };

const shared50: Descriptor = { type: 'label', label: 'top-margin-value', value: shared43 };

const shared51: Descriptor = { type: 'label', label: 'bottom-margin', value: shared43 };

const shared52: Descriptor = { type: 'choices', choices: ['both', 'odd', 'even'] };

const shared53: Descriptor = { type: 'optional', value: shared52 };

const shared54: Record<string, Descriptor> = { type: shared53 };

const shared55: Descriptor = {
	type: 'required',
	get value() {
		return constructors.LeftMargin;
	},
};

const shared56: Descriptor = {
	type: 'required',
	get value() {
		return constructors.RightMargin;
	},
};

const shared57: Descriptor = {
	type: 'required',
	get value() {
		return constructors.TopMargin;
	},
};

const shared58: Descriptor = {
	type: 'required',
	get value() {
		return constructors.BottomMargin;
	},
};

const shared59: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.PageHeight;
	},
};

const shared60: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.PageWidth;
	},
};

const shared61: Descriptor = {
	type: 'choices',
	choices: [
		[],
		withElements([null], { 0: () => constructors.PageMargins }),
		withElements([null, null], { 0: () => constructors.PageMargins, 1: () => constructors.PageMargins }),
	],
};

const shared62: Descriptor = { type: 'label', label: 'page-margins', value: shared61 };

const shared63: Descriptor = { type: 'label', label: 'system-distance-value', value: shared43 };

const shared64: Descriptor = { type: 'regex', pattern: /#[\dA-F]{6}([\dA-F][\dA-F])?/, zero: '#000000' };

const shared65: Descriptor = { type: 'optional', value: shared64 };

const shared66: Descriptor = { type: 'optional', value: shared42 };

const shared67: Descriptor = { type: 'regex', pattern: /[^,]+(, ?[^,]+)*/, zero: ' ' };

const shared68: Descriptor = { type: 'optional', value: shared67 };

const shared69: Descriptor = {
	type: 'choices',
	choices: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
};

const shared70: Descriptor = { type: 'choices', choices: [shared69, shared42] };

const shared71: Descriptor = { type: 'optional', value: shared70 };

const shared72: Descriptor = { type: 'choices', choices: ['normal', 'italic'] };

const shared73: Descriptor = { type: 'optional', value: shared72 };

const shared74: Descriptor = { type: 'choices', choices: ['normal', 'bold'] };

const shared75: Descriptor = { type: 'optional', value: shared74 };

const shared76: Descriptor = { type: 'choices', choices: ['left', 'center', 'right'] };

const shared77: Descriptor = { type: 'optional', value: shared76 };

const shared78: Descriptor = { type: 'optional', value: shared19 };

const shared79: Descriptor = { type: 'choices', choices: ['top', 'middle', 'bottom', 'baseline'] };

const shared80: Descriptor = { type: 'optional', value: shared79 };

const shared81: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	valign: shared80,
};

const shared82: Descriptor = {
	type: 'required',
	get value() {
		return constructors.LeftDivider;
	},
};

const shared83: Descriptor = {
	type: 'required',
	get value() {
		return constructors.RightDivider;
	},
};

const shared84: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.SystemMargins;
	},
};

const shared85: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.SystemDistance;
	},
};

const shared86: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.TopSystemDistance;
	},
};

const shared87: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.SystemDividers;
	},
};

const shared88: Descriptor = { type: 'int', min: 1, max: Infinity };

const shared89: Descriptor = { type: 'optional', value: shared88 };

const shared90: Record<string, Descriptor> = { number: shared89 };

const shared91: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.StaffDistance;
	},
};

const shared92: Descriptor = {
	type: 'choices',
	choices: [
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
	],
};

const shared93: Descriptor = { type: 'required', value: shared92 };

const shared94: Record<string, Descriptor> = { type: shared93 };

const shared95: Descriptor = { type: 'label', label: 'line-width', value: shared43 };

const shared96: Descriptor = { type: 'choices', choices: ['cue', 'grace', 'grace-cue', 'large'] };

const shared97: Descriptor = { type: 'required', value: shared96 };

const shared98: Record<string, Descriptor> = { type: shared97 };

const shared99: Descriptor = { type: 'float', min: 0, max: Infinity };

const shared100: Descriptor = { type: 'required', value: shared99 };

const shared101: Descriptor = { type: 'label', label: 'note-size', value: shared100 };

const shared102: Descriptor = { type: 'choices', choices: ['beam', 'hyphen'] };

const shared103: Descriptor = { type: 'required', value: shared102 };

const shared104: Record<string, Descriptor> = { type: shared103 };

const shared105: Descriptor = { type: 'label', label: 'distance', value: shared43 };

const shared106: Descriptor = {
	type: 'choices',
	choices: [
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
	],
};

const shared107: Descriptor = { type: 'required', value: shared106 };

const shared108: Record<string, Descriptor> = { type: shared107 };

const shared109: Record<string, Descriptor> = { type: shared2 };

const shared110: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.LineWidth;
	},
};

const shared111: Descriptor = { type: 'label', label: 'line-widths', value: shared110 };

const shared112: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.NoteSize;
	},
};

const shared113: Descriptor = { type: 'label', label: 'note-sizes', value: shared112 };

const shared114: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Distance;
	},
};

const shared115: Descriptor = { type: 'label', label: 'distances', value: shared114 };

const shared116: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Glyph;
	},
};

const shared117: Descriptor = { type: 'label', label: 'glyphs', value: shared116 };

const shared118: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.OtherAppearance;
	},
};

const shared119: Descriptor = { type: 'label', label: 'other-appearances', value: shared118 };

const shared120: Record<string, Descriptor> = {
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
};

const shared121: Record<string, Descriptor> = {
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	name: shared6,
	number: shared6,
};

const shared122: Record<string, Descriptor> = { name: shared6, number: shared6, 'xml:lang': shared2 };

const shared123: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Scaling;
	},
};

const shared124: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.ConcertScore;
	},
};

const shared125: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.PageLayout;
	},
};

const shared126: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.SystemLayout;
	},
};

const shared127: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.StaffLayout;
	},
};

const shared128: Descriptor = { type: 'label', label: 'staff-layouts', value: shared127 };

const shared129: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Appearance;
	},
};

const shared130: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MusicFont;
	},
};

const shared131: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.WordFont;
	},
};

const shared132: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.LyricFont;
	},
};

const shared133: Descriptor = { type: 'label', label: 'lyric-fonts', value: shared132 };

const shared134: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.LyricLanguage;
	},
};

const shared135: Descriptor = { type: 'label', label: 'lyric-languages', value: shared134 };

const shared136: Record<string, Descriptor> = {
	'default-x': shared66,
	'default-y': shared66,
	element: shared6,
	name: shared6,
	position: shared89,
	'relative-x': shared66,
	'relative-y': shared66,
	'xlink:actuate': shared5,
	'xlink:href': shared2,
	'xlink:role': shared6,
	'xlink:show': shared8,
	'xlink:title': shared6,
	'xlink:type': shared10,
};

const shared137: Descriptor = { type: 'regex', pattern: /[A-Za-z_][A-Za-z0-9.-_]*/, zero: '_' };

const shared138: Descriptor = { type: 'required', value: shared137 };

const shared139: Record<string, Descriptor> = { element: shared6, id: shared138, name: shared6, position: shared89 };

const shared140: Descriptor = { type: 'optional', value: shared137 };

const shared141: Descriptor = { type: 'choices', choices: ['top', 'middle', 'bottom'] };

const shared142: Descriptor = { type: 'optional', value: shared141 };

const shared143: Record<string, Descriptor> = {
	'default-x': shared66,
	'default-y': shared66,
	halign: shared77,
	height: shared66,
	id: shared140,
	'relative-x': shared66,
	'relative-y': shared66,
	source: shared6,
	type: shared6,
	valign: shared142,
	width: shared66,
};

const shared144: Descriptor = { type: 'choices', choices: ['ltr', 'rtl', 'lro', 'rlo'] };

const shared145: Descriptor = { type: 'optional', value: shared144 };

const shared146: Descriptor = {
	type: 'choices',
	choices: [
		'none',
		'rectangle',
		'square',
		'oval',
		'circle',
		'bracket',
		'inverted-bracket',
		'triangle',
		'diamond',
		'pentagon',
		'hexagon',
		'heptagon',
		'octagon',
		'nonagon',
		'decagon',
	],
};

const shared147: Descriptor = { type: 'optional', value: shared146 };

const shared148: Descriptor = { type: 'choices', choices: ['normal'] };

const shared149: Descriptor = { type: 'choices', choices: [shared148, shared42] };

const shared150: Descriptor = { type: 'optional', value: shared149 };

const shared151: Descriptor = { type: 'int', min: 0, max: 3 };

const shared152: Descriptor = { type: 'optional', value: shared151 };

const shared153: Descriptor = { type: 'float', min: -180, max: 180 };

const shared154: Descriptor = { type: 'optional', value: shared153 };

const shared155: Descriptor = { type: 'choices', choices: ['default', 'preserve'] };

const shared156: Descriptor = { type: 'optional', value: shared155 };

const shared157: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	dir: shared145,
	enclosure: shared147,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	justify: shared77,
	'letter-spacing': shared150,
	'line-height': shared150,
	'line-through': shared152,
	overline: shared152,
	'relative-x': shared66,
	'relative-y': shared66,
	rotation: shared154,
	underline: shared152,
	valign: shared80,
	'xml:lang': shared6,
	'xml:space': shared156,
};

const shared158: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	dir: shared145,
	enclosure: shared147,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	justify: shared77,
	'letter-spacing': shared150,
	'line-height': shared150,
	'line-through': shared152,
	overline: shared152,
	'relative-x': shared66,
	'relative-y': shared66,
	rotation: shared154,
	underline: shared152,
	valign: shared80,
};

const shared159: Record<string, Descriptor> = { id: shared140, page: shared89 };

const shared160: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.CreditType;
	},
};

const shared161: Descriptor = { type: 'label', label: 'credit-types', value: shared160 };

const shared162: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Link;
	},
};

const shared163: Descriptor = { type: 'label', label: 'links', value: shared162 };

const shared164: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Bookmark;
	},
};

const shared165: Descriptor = { type: 'label', label: 'bookmarks', value: shared164 };

const shared166: Descriptor = {
	type: 'choices',
	choices: withElements([null, null], { 0: () => constructors.CreditWords, 1: () => constructors.CreditSymbol }),
};

const shared167: Descriptor = { type: 'zeroOrMore', value: [shared162, shared164, shared166] };

const shared168: Descriptor = { type: 'label', label: 'credit-token', value: [shared166, shared167] };

const shared169: Descriptor = {
	type: 'choices',
	choices: withElements([null, shared168], { 0: () => constructors.CreditImage }),
};

const shared170: Descriptor = { type: 'label', label: 'value', value: shared169 };

const shared171: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	justify: shared77,
	'relative-x': shared66,
	'relative-y': shared66,
};

const shared172: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	dir: shared145,
	enclosure: shared147,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	justify: shared77,
	'letter-spacing': shared150,
	'line-height': shared150,
	'line-through': shared152,
	overline: shared152,
	'relative-x': shared66,
	'relative-y': shared66,
	rotation: shared154,
	underline: shared152,
	valign: shared80,
	'xml:lang': shared6,
	'xml:space': shared156,
};

const shared173: Descriptor = {
	type: 'regex',
	pattern: /(acc|medRenFla|medRenNatura|medRenShar|kievanAccidental)/,
	zero: 'acc',
};

const shared174: Descriptor = { type: 'optional', value: shared173 };

const shared175: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	dir: shared145,
	enclosure: shared147,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	justify: shared77,
	'letter-spacing': shared150,
	'line-height': shared150,
	'line-through': shared152,
	overline: shared152,
	'relative-x': shared66,
	'relative-y': shared66,
	rotation: shared154,
	smufl: shared174,
	underline: shared152,
	valign: shared80,
	'xml:lang': shared6,
	'xml:space': shared156,
};

const shared176: Descriptor = {
	type: 'choices',
	choices: [
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
	],
};

const shared177: Descriptor = { type: 'required', value: shared176 };

const shared178: Descriptor = { type: 'label', label: 'accidental-value', value: shared177 };

const shared179: Record<string, Descriptor> = { 'print-object': shared78 };

const shared180: Descriptor = {
	type: 'choices',
	choices: withElements([null, null], { 0: () => constructors.DisplayText, 1: () => constructors.AccidentalText }),
};

const shared181: Descriptor = { type: 'zeroOrMore', value: shared180 };

const shared182: Descriptor = { type: 'label', label: 'texts', value: shared181 };

const shared183: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'relative-x': shared66,
	'relative-y': shared66,
};

const shared184: Descriptor = { type: 'choices', choices: ['none', 'brace', 'line', 'bracket', 'square'] };

const shared185: Descriptor = { type: 'required', value: shared184 };

const shared186: Descriptor = { type: 'label', label: 'group-symbol-value', value: shared185 };

const shared187: Record<string, Descriptor> = { color: shared65 };

const shared188: Descriptor = { type: 'choices', choices: ['yes', 'no', 'Mensurstrich'] };

const shared189: Descriptor = { type: 'required', value: shared188 };

const shared190: Descriptor = { type: 'label', label: 'group-barline-value', value: shared189 };

const shared191: Descriptor = { type: 'choices', choices: ['cue', 'full', 'grace-cue', 'large'] };

const shared192: Descriptor = { type: 'optional', value: shared191 };

const shared193: Descriptor = { type: 'choices', choices: ['start', 'stop', 'single'] };

const shared194: Descriptor = { type: 'optional', value: shared193 };

const shared195: Record<string, Descriptor> = {
	bracket: shared78,
	parentheses: shared78,
	reference: shared78,
	size: shared192,
	type: shared194,
};

const shared196: Descriptor = { type: 'choices', choices: ['start', 'stop'] };

const shared197: Descriptor = { type: 'required', value: shared196 };

const shared198: Record<string, Descriptor> = { number: shared6, type: shared197 };

const shared199: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.GroupName;
	},
};

const shared200: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.GroupNameDisplay;
	},
};

const shared201: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.GroupAbbreviation;
	},
};

const shared202: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.GroupAbbreviationDisplay;
	},
};

const shared203: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.GroupSymbol;
	},
};

const shared204: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.GroupBarline;
	},
};

const shared205: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.GroupTime;
	},
};

const shared206: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Footnote;
	},
};

const shared207: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Level;
	},
};

const shared208: Record<string, Descriptor> = { id: shared138 };

const shared209: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.InstrumentLink;
	},
};

const shared210: Descriptor = { type: 'label', label: 'instrument-links', value: shared209 };

const shared211: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.GroupLink;
	},
};

const shared212: Descriptor = { type: 'label', label: 'group-links', value: shared211 };

const shared213: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	justify: shared77,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
};

const shared214: Descriptor = { type: 'choices', choices: [''] };

const shared215: Descriptor = { type: 'choices', choices: [shared214, shared88] };

const shared216: Descriptor = { type: 'required', value: shared215 };

const shared217: Descriptor = { type: 'label', label: 'size', value: shared216 };

const shared218: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.VirtualLibrary;
	},
};

const shared219: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.VirtualName;
	},
};

const shared220: Descriptor = {
	type: 'required',
	get value() {
		return constructors.InstrumentName;
	},
};

const shared221: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.InstrumentAbbreviation;
	},
};

const shared222: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.InstrumentSound;
	},
};

const shared223: Descriptor = {
	type: 'choices',
	choices: withElements([null, null], { 0: () => constructors.Solo, 1: () => constructors.Ensemble }),
};

const shared224: Descriptor = { type: 'zeroOrMore', value: shared223 };

const shared225: Descriptor = { type: 'label', label: 'instrument-types', value: shared224 };

const shared226: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.VirtualInstrument;
	},
};

const shared227: Descriptor = {
	type: 'required',
	get value() {
		return constructors.PlayerName;
	},
};

const shared228: Descriptor = { type: 'int', min: 1, max: 16 };

const shared229: Descriptor = { type: 'optional', value: shared228 };

const shared230: Descriptor = { type: 'label', label: 'midi16', value: shared229 };

const shared231: Record<string, Descriptor> = { id: shared140, port: shared230 };

const shared232: Descriptor = { type: 'required', value: shared228 };

const shared233: Descriptor = { type: 'label', label: 'midi16', value: shared232 };

const shared234: Descriptor = { type: 'int', min: 1, max: 16384 };

const shared235: Descriptor = { type: 'required', value: shared234 };

const shared236: Descriptor = { type: 'label', label: 'midi16384', value: shared235 };

const shared237: Descriptor = { type: 'int', min: 1, max: 128 };

const shared238: Descriptor = { type: 'required', value: shared237 };

const shared239: Descriptor = { type: 'label', label: 'midi128', value: shared238 };

const shared240: Descriptor = { type: 'float', min: 0, max: 100 };

const shared241: Descriptor = { type: 'required', value: shared240 };

const shared242: Descriptor = { type: 'label', label: 'volume', value: shared241 };

const shared243: Descriptor = { type: 'required', value: shared153 };

const shared244: Descriptor = { type: 'label', label: 'value', value: shared243 };

const shared245: Descriptor = { type: 'label', label: 'elevation', value: shared243 };

const shared246: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MidiChannel;
	},
};

const shared247: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MidiName;
	},
};

const shared248: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MidiBank;
	},
};

const shared249: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MidiProgram;
	},
};

const shared250: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MidiUnpitched;
	},
};

const shared251: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Volume;
	},
};

const shared252: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Pan;
	},
};

const shared253: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Elevation;
	},
};

const shared254: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Identification;
	},
};

const shared255: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.PartLink;
	},
};

const shared256: Descriptor = { type: 'label', label: 'part-links', value: shared255 };

const shared257: Descriptor = {
	type: 'required',
	get value() {
		return constructors.PartName;
	},
};

const shared258: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.PartNameDisplay;
	},
};

const shared259: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.PartAbbreviation;
	},
};

const shared260: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.PartAbbreviationDisplay;
	},
};

const shared261: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Group;
	},
};

const shared262: Descriptor = { type: 'label', label: 'groups', value: shared261 };

const shared263: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.ScoreInstrument;
	},
};

const shared264: Descriptor = { type: 'label', label: 'score-instruments', value: shared263 };

const shared265: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Player;
	},
};

const shared266: Descriptor = { type: 'label', label: 'players', value: shared265 };

const shared267: Descriptor = {
	type: 'choices',
	choices: withElements([null, null], { 0: () => constructors.MidiDevice, 1: () => constructors.MidiInstrument }),
};

const shared268: Descriptor = { type: 'zeroOrMore', value: shared267 };

const shared269: Descriptor = { type: 'label', label: 'midis', value: shared268 };

const shared270: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.PartGroup;
	},
};

const shared271: Descriptor = { type: 'label', label: 'part-groups', value: shared270 };

const shared272: Descriptor = {
	type: 'required',
	get value() {
		return constructors.ScorePart;
	},
};

const shared273: Descriptor = {
	type: 'required',
	get value() {
		return constructors.PartGroup;
	},
};

const shared274: Descriptor = { type: 'choices', choices: [shared273, shared272] };

const shared275: Descriptor = { type: 'zeroOrMore', value: shared274 };

const shared276: Descriptor = { type: 'label', label: 'parts', value: shared275 };

const shared277: Descriptor = { type: 'choices', choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] };

const shared278: Descriptor = { type: 'required', value: shared277 };

const shared279: Descriptor = { type: 'label', label: 'step', value: shared278 };

const shared280: Descriptor = { type: 'label', label: 'semitones', value: shared43 };

const shared281: Descriptor = { type: 'int', min: 0, max: 9 };

const shared282: Descriptor = { type: 'required', value: shared281 };

const shared283: Descriptor = { type: 'label', label: 'octave', value: shared282 };

const shared284: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Step;
	},
};

const shared285: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Alter;
	},
};

const shared286: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Octave;
	},
};

const shared287: Descriptor = {
	type: 'required',
	get value() {
		return constructors.DisplayStep;
	},
};

const shared288: Descriptor = {
	type: 'required',
	get value() {
		return constructors.DisplayOctave;
	},
};

const shared289: Record<string, Descriptor> = { measure: shared78 };

const shared290: Descriptor = { type: 'optional', value: [shared287, shared288] };

const shared291: Descriptor = { type: 'label', label: 'value', value: shared290 };

const shared292: Descriptor = { type: 'float', min: 1, max: Infinity };

const shared293: Descriptor = { type: 'required', value: shared292 };

const shared294: Descriptor = { type: 'label', label: 'positive-divisions', value: shared293 };

const shared295: Descriptor = { type: 'regex', pattern: /[1-9][0-9]*(, ?[1-9][0-9]*)*/, zero: '1' };

const shared296: Descriptor = { type: 'optional', value: shared295 };

const shared297: Record<string, Descriptor> = { 'time-only': shared296, type: shared197 };

const shared298: Descriptor = { type: 'optional', value: shared240 };

const shared299: Record<string, Descriptor> = {
	'make-time': shared66,
	slash: shared78,
	'steal-time-following': shared298,
	'steal-time-previous': shared298,
};

const shared300: Record<string, Descriptor> = { size: shared192 };

const shared301: Descriptor = {
	type: 'choices',
	choices: [
		'whole',
		'1024th',
		'512th',
		'256th',
		'128th',
		'64th',
		'32nd',
		'16th',
		'eighth',
		'quarter',
		'half',
		'breve',
		'long',
		'maxima',
	],
};

const shared302: Descriptor = { type: 'required', value: shared301 };

const shared303: Descriptor = { type: 'label', label: 'note-type-value', value: shared302 };

const shared304: Descriptor = { type: 'choices', choices: ['above', 'below'] };

const shared305: Descriptor = { type: 'optional', value: shared304 };

const shared306: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
};

const shared307: Record<string, Descriptor> = {
	bracket: shared78,
	cautionary: shared78,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	editorial: shared78,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	parentheses: shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	size: shared192,
	smufl: shared174,
};

const shared308: Descriptor = { type: 'int', min: 0, max: Infinity };

const shared309: Descriptor = { type: 'required', value: shared308 };

const shared310: Descriptor = { type: 'label', label: 'value', value: shared309 };

const shared311: Descriptor = {
	type: 'required',
	get value() {
		return constructors.ActualNotes;
	},
};

const shared312: Descriptor = {
	type: 'required',
	get value() {
		return constructors.NormalNotes;
	},
};

const shared313: Descriptor = {
	type: 'required',
	get value() {
		return constructors.NormalType;
	},
};

const shared314: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.NormalDot;
	},
};

const shared315: Descriptor = { type: 'optional', value: [shared313, shared314] };

const shared316: Descriptor = { type: 'label', label: 'normal', value: shared315 };

const shared317: Descriptor = { type: 'choices', choices: ['none', 'down', 'up', 'double'] };

const shared318: Descriptor = { type: 'required', value: shared317 };

const shared319: Descriptor = { type: 'label', label: 'stem-value', value: shared318 };

const shared320: Record<string, Descriptor> = {
	color: shared65,
	filled: shared78,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	parentheses: shared78,
	smufl: shared6,
};

const shared321: Descriptor = {
	type: 'choices',
	choices: [
		'other',
		'slash',
		'triangle',
		'diamond',
		'square',
		'cross',
		'x',
		'circle-x',
		'inverted triangle',
		'arrow down',
		'arrow up',
		'circled',
		'slashed',
		'back slashed',
		'normal',
		'cluster',
		'circle dot',
		'left triangle',
		'rectangle',
		'none',
		'do',
		're',
		'mi',
		'fa',
		'fa up',
		'so',
		'la',
		'ti',
	],
};

const shared322: Descriptor = { type: 'required', value: shared321 };

const shared323: Descriptor = { type: 'label', label: 'notehead-value', value: shared322 };

const shared324: Descriptor = {
	type: 'required',
	get value() {
		return constructors.DisplayText;
	},
};

const shared325: Descriptor = {
	type: 'required',
	get value() {
		return constructors.AccidentalText;
	},
};

const shared326: Descriptor = { type: 'oneOrMore', value: [shared324, shared325] };

const shared327: Descriptor = { type: 'label', label: 'texts', value: shared326 };

const shared328: Descriptor = { type: 'required', value: shared88 };

const shared329: Descriptor = { type: 'label', label: 'value', value: shared328 };

const shared330: Descriptor = { type: 'choices', choices: ['accel', 'rit', 'none'] };

const shared331: Descriptor = { type: 'optional', value: shared330 };

const shared332: Descriptor = { type: 'int', min: 1, max: 8 };

const shared333: Descriptor = { type: 'optional', value: shared332 };

const shared334: Record<string, Descriptor> = {
	color: shared65,
	fan: shared331,
	id: shared140,
	number: shared333,
	repeater: shared78,
};

const shared335: Descriptor = {
	type: 'choices',
	choices: ['backward hook', 'begin', 'continue', 'end', 'forward hook'],
};

const shared336: Descriptor = { type: 'required', value: shared335 };

const shared337: Descriptor = { type: 'label', label: 'beam-value', value: shared336 };

const shared338: Descriptor = { type: 'choices', choices: ['dashed', 'solid', 'dotted', 'wavy'] };

const shared339: Descriptor = { type: 'optional', value: shared338 };

const shared340: Descriptor = { type: 'choices', choices: ['over', 'under'] };

const shared341: Descriptor = { type: 'optional', value: shared340 };

const shared342: Descriptor = { type: 'choices', choices: ['start', 'stop', 'continue', 'let-ring'] };

const shared343: Descriptor = { type: 'required', value: shared342 };

const shared344: Record<string, Descriptor> = {
	'bezier-offset': shared66,
	'bezier-offset2': shared66,
	'bezier-x': shared66,
	'bezier-x2': shared66,
	'bezier-y': shared66,
	'bezier-y2': shared66,
	color: shared65,
	'dash-length': shared66,
	'default-x': shared66,
	'default-y': shared66,
	id: shared140,
	'line-type': shared339,
	number: shared229,
	orientation: shared341,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	'space-length': shared66,
	type: shared343,
};

const shared345: Descriptor = { type: 'choices', choices: ['start', 'stop', 'continue'] };

const shared346: Descriptor = { type: 'required', value: shared345 };

const shared347: Record<string, Descriptor> = {
	'bezier-offset': shared66,
	'bezier-offset2': shared66,
	'bezier-x': shared66,
	'bezier-x2': shared66,
	'bezier-y': shared66,
	'bezier-y2': shared66,
	color: shared65,
	'dash-length': shared66,
	'default-x': shared66,
	'default-y': shared66,
	id: shared140,
	'line-type': shared339,
	number: shared229,
	orientation: shared341,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	'space-length': shared66,
	type: shared346,
};

const shared348: Record<string, Descriptor> = {
	color: shared65,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
};

const shared349: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.TupletNumber;
	},
};

const shared350: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.TupletType;
	},
};

const shared351: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.TupletDot;
	},
};

const shared352: Descriptor = { type: 'label', label: 'tuplet-dots', value: shared351 };

const shared353: Descriptor = { type: 'choices', choices: ['straight', 'curved'] };

const shared354: Descriptor = { type: 'optional', value: shared353 };

const shared355: Descriptor = { type: 'choices', choices: ['none', 'actual', 'both'] };

const shared356: Descriptor = { type: 'optional', value: shared355 };

const shared357: Descriptor = { type: 'optional', value: shared196 };

const shared358: Record<string, Descriptor> = {
	bracket: shared78,
	'default-x': shared66,
	'default-y': shared66,
	id: shared140,
	'line-shape': shared354,
	number: shared229,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	'show-number': shared356,
	'show-type': shared356,
	type: shared357,
};

const shared359: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.TupletActual;
	},
};

const shared360: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.TupletNormal;
	},
};

const shared361: Record<string, Descriptor> = {
	color: shared65,
	'dash-length': shared66,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	id: shared140,
	'line-type': shared339,
	number: shared229,
	'relative-x': shared66,
	'relative-y': shared66,
	'space-length': shared66,
	type: shared197,
};

const shared362: Descriptor = { type: 'float', min: 2, max: Infinity };

const shared363: Descriptor = { type: 'optional', value: shared362 };

const shared364: Record<string, Descriptor> = {
	accelerate: shared78,
	beats: shared363,
	color: shared65,
	'dash-length': shared66,
	'default-x': shared66,
	'default-y': shared66,
	'first-beat': shared298,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	id: shared140,
	'last-beat': shared298,
	'line-type': shared339,
	number: shared229,
	'relative-x': shared66,
	'relative-y': shared66,
	'space-length': shared66,
	type: shared197,
};

const shared365: Descriptor = { type: 'choices', choices: ['below', 'upper', 'main'] };

const shared366: Descriptor = { type: 'optional', value: shared365 };

const shared367: Descriptor = { type: 'choices', choices: ['unison', 'whole', 'half'] };

const shared368: Descriptor = { type: 'optional', value: shared367 };

const shared369: Descriptor = { type: 'choices', choices: ['none', 'whole', 'half'] };

const shared370: Descriptor = { type: 'optional', value: shared369 };

const shared371: Record<string, Descriptor> = {
	acccelerate: shared78,
	accelerate: shared78,
	beats: shared363,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'last-beat': shared298,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	'second-beat': shared298,
	'start-note': shared366,
	'trill-step': shared368,
	'two-note-turn': shared370,
};

const shared372: Record<string, Descriptor> = {
	accelerate: shared78,
	beats: shared363,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'last-beat': shared298,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	'second-beat': shared298,
	slash: shared78,
	'start-note': shared366,
	'trill-step': shared368,
	'two-note-turn': shared370,
};

const shared373: Record<string, Descriptor> = {
	accelerate: shared78,
	beats: shared363,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'last-beat': shared298,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	'second-beat': shared298,
	'start-note': shared366,
	'trill-step': shared368,
	'two-note-turn': shared370,
};

const shared374: Descriptor = { type: 'regex', pattern: /(wiggle)|(guitar\c*VibratoStroke)/, zero: 'wiggle' };

const shared375: Descriptor = { type: 'optional', value: shared374 };

const shared376: Record<string, Descriptor> = {
	accelerate: shared78,
	beats: shared363,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'last-beat': shared298,
	number: shared229,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	'second-beat': shared298,
	smufl: shared375,
	'start-note': shared366,
	'trill-step': shared368,
	'two-note-turn': shared370,
	type: shared346,
};

const shared377: Record<string, Descriptor> = {
	accelerate: shared78,
	approach: shared305,
	beats: shared363,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	departure: shared305,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'last-beat': shared298,
	long: shared78,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	'second-beat': shared298,
	'start-note': shared366,
	'trill-step': shared368,
	'two-note-turn': shared370,
};

const shared378: Descriptor = { type: 'choices', choices: ['start', 'stop', 'single', 'unmeasured'] };

const shared379: Descriptor = { type: 'optional', value: shared378 };

const shared380: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	smufl: shared6,
	type: shared379,
};

const shared381: Descriptor = { type: 'int', min: 0, max: 8 };

const shared382: Descriptor = { type: 'required', value: shared381 };

const shared383: Descriptor = { type: 'label', label: 'tremolo-marks', value: shared382 };

const shared384: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	smufl: shared6,
};

const shared385: Record<string, Descriptor> = {
	bracket: shared78,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	id: shared140,
	parentheses: shared78,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	size: shared192,
	smufl: shared174,
};

const shared386: Record<string, Descriptor> = { id: shared140 };

const shared387: Descriptor = {
	type: 'choices',
	choices: withElements([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], {
		0: () => constructors.TrillMark,
		1: () => constructors.Turn,
		2: () => constructors.DelayedTurn,
		3: () => constructors.InvertedTurn,
		4: () => constructors.DelayedInvertedTurn,
		5: () => constructors.VerticalTurn,
		6: () => constructors.InvertedVerticalTurn,
		7: () => constructors.Shake,
		8: () => constructors.WavyLine,
		9: () => constructors.Mordent,
		10: () => constructors.InvertedMordent,
		11: () => constructors.Schleifer,
		12: () => constructors.Tremolo,
		13: () => constructors.Haydn,
		14: () => constructors.OtherOrnament,
	}),
};

const shared388: Descriptor = { type: 'zeroOrMore', value: shared387 };

const shared389: Descriptor = { type: 'label', label: 'values', value: shared388 };

const shared390: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.AccidentalMark;
	},
};

const shared391: Descriptor = { type: 'label', label: 'accidental-marks', value: shared390 };

const shared392: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	placement: shared305,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
};

const shared393: Descriptor = {
	type: 'choices',
	choices: withElements([null, null], { 0: () => constructors.Natural, 1: () => constructors.Artificial }),
};

const shared394: Descriptor = { type: 'zeroOrMore', value: shared393 };

const shared395: Descriptor = { type: 'label', label: 'types', value: shared394 };

const shared396: Descriptor = {
	type: 'choices',
	choices: withElements([null, null, null], {
		0: () => constructors.BasePitch,
		1: () => constructors.TouchingPitch,
		2: () => constructors.SoundingPitch,
	}),
};

const shared397: Descriptor = { type: 'zeroOrMore', value: shared396 };

const shared398: Descriptor = { type: 'label', label: 'pitches', value: shared397 };

const shared399: Record<string, Descriptor> = {
	alternate: shared78,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	substitution: shared78,
};

const shared400: Descriptor = { type: 'label', label: 'string-number', value: shared328 };

const shared401: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	number: shared229,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	type: shared197,
};

const shared402: Record<string, Descriptor> = { offset: shared66 };

const shared403: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'first-beat': shared298,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
};

const shared404: Descriptor = { type: 'choices', choices: ['angled', 'curved'] };

const shared405: Descriptor = { type: 'optional', value: shared404 };

const shared406: Record<string, Descriptor> = {
	accelerate: shared78,
	beats: shared363,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'first-beat': shared298,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'last-beat': shared298,
	'relative-x': shared66,
	'relative-y': shared66,
	shape: shared405,
};

const shared407: Descriptor = {
	type: 'required',
	get value() {
		return constructors.BendAlter;
	},
};

const shared408: Descriptor = {
	type: 'choices',
	choices: withElements([null, null], { 0: () => constructors.PreBend, 1: () => constructors.Release }),
};

const shared409: Descriptor = { type: 'zeroOrMore', value: shared408 };

const shared410: Descriptor = { type: 'label', label: 'bends', value: shared409 };

const shared411: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.WithBar;
	},
};

const shared412: Descriptor = { type: 'choices', choices: ['left', 'right'] };

const shared413: Descriptor = { type: 'optional', value: shared412 };

const shared414: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	hand: shared413,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
};

const shared415: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	substitution: shared78,
};

const shared416: Descriptor = { type: 'choices', choices: ['bottom', 'right', 'left', 'top'] };

const shared417: Descriptor = { type: 'optional', value: shared416 };

const shared418: Record<string, Descriptor> = { location: shared417 };

const shared419: Descriptor = { type: 'choices', choices: ['yes', 'no', 'half'] };

const shared420: Descriptor = { type: 'required', value: shared419 };

const shared421: Descriptor = { type: 'label', label: 'hole-closed-value', value: shared420 };

const shared422: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.HoleType;
	},
};

const shared423: Descriptor = {
	type: 'required',
	get value() {
		return constructors.HoleClosed;
	},
};

const shared424: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.HoleShape;
	},
};

const shared425: Descriptor = {
	type: 'choices',
	choices: [
		'down',
		'left',
		'up',
		'right',
		'northwest',
		'northeast',
		'southeast',
		'southwest',
		'left right',
		'up down',
		'northwest southeast',
		'northeast southwest',
		'other',
	],
};

const shared426: Descriptor = { type: 'required', value: shared425 };

const shared427: Descriptor = { type: 'label', label: 'arrow-direction', value: shared426 };

const shared428: Descriptor = {
	type: 'choices',
	choices: ['combined', 'single', 'double', 'filled', 'hollow', 'paired', 'other'],
};

const shared429: Descriptor = { type: 'required', value: shared428 };

const shared430: Descriptor = { type: 'label', label: 'arrow-style', value: shared429 };

const shared431: Descriptor = { type: 'choices', choices: ['anticlockwise', 'clockwise'] };

const shared432: Descriptor = { type: 'required', value: shared431 };

const shared433: Descriptor = { type: 'label', label: 'circular-arrow', value: shared432 };

const shared434: Descriptor = {
	type: 'required',
	get value() {
		return constructors.ArrowDirection;
	},
};

const shared435: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.ArrowStyle;
	},
};

const shared436: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Arrowhead;
	},
};

const shared437: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.CircularArrow;
	},
};

const shared438: Descriptor = {
	type: 'choices',
	choices: [
		'belltree',
		'damp',
		'echo',
		'gyro',
		'hand martellato',
		'mallet lift',
		'mallet table',
		'martellato',
		'martellato lift',
		'muted martellato',
		'pluck lift',
		'swing',
	],
};

const shared439: Descriptor = { type: 'required', value: shared438 };

const shared440: Descriptor = { type: 'label', label: 'handbell-value', value: shared439 };

const shared441: Descriptor = { type: 'label', label: 'harmon-closed-value', value: shared420 };

const shared442: Descriptor = {
	type: 'required',
	get value() {
		return constructors.HarmonClosed;
	},
};

const shared443: Descriptor = {
	type: 'choices',
	choices: withElements(
		[
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
		],
		{
			0: () => constructors.UpBow,
			1: () => constructors.DownBow,
			2: () => constructors.Harmonic,
			3: () => constructors.OpenString,
			4: () => constructors.ThumbPosition,
			5: () => constructors.Fingering,
			6: () => constructors.Pluck,
			7: () => constructors.DoubleTongue,
			8: () => constructors.TripleTongue,
			9: () => constructors.Stopped,
			10: () => constructors.SnapPizzicato,
			11: () => constructors.Fret,
			12: () => constructors.String,
			13: () => constructors.HammerOn,
			14: () => constructors.PullOff,
			15: () => constructors.Bend,
			16: () => constructors.Tap,
			17: () => constructors.Heel,
			18: () => constructors.Toe,
			19: () => constructors.Fingernails,
			20: () => constructors.Hole,
			21: () => constructors.Arrow,
			22: () => constructors.Handbell,
			23: () => constructors.BrassBend,
			24: () => constructors.Flip,
			25: () => constructors.Smear,
			26: () => constructors.Open,
			27: () => constructors.HalfMuted,
			28: () => constructors.HarmonMute,
			29: () => constructors.Golpe,
			30: () => constructors.OtherTechnical,
		},
	),
};

const shared444: Descriptor = { type: 'zeroOrMore', value: shared443 };

const shared445: Descriptor = { type: 'label', label: 'values', value: shared444 };

const shared446: Descriptor = { type: 'choices', choices: ['up', 'down'] };

const shared447: Descriptor = { type: 'optional', value: shared446 };

const shared448: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	type: shared447,
};

const shared449: Descriptor = { type: 'choices', choices: ['short', 'medium', 'long'] };

const shared450: Descriptor = { type: 'optional', value: shared449 };

const shared451: Record<string, Descriptor> = {
	color: shared65,
	'dash-length': shared66,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'line-length': shared450,
	'line-shape': shared354,
	'line-type': shared339,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	'space-length': shared66,
};

const shared452: Descriptor = { type: 'choices', choices: ['comma', '', 'tick', 'upbow', 'salzedo'] };

const shared453: Descriptor = { type: 'optional', value: shared452 };

const shared454: Descriptor = { type: 'label', label: 'breath-mark-value', value: shared453 };

const shared455: Descriptor = { type: 'choices', choices: ['normal', 'thick', 'short', 'curved', 'single', ''] };

const shared456: Descriptor = { type: 'optional', value: shared455 };

const shared457: Descriptor = { type: 'label', label: 'caesura-value', value: shared456 };

const shared458: Descriptor = {
	type: 'choices',
	choices: withElements(
		[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
		{
			0: () => constructors.Accent,
			1: () => constructors.StrongAccent,
			2: () => constructors.Staccato,
			3: () => constructors.Tenuto,
			4: () => constructors.DetachedLegato,
			5: () => constructors.Staccatissimo,
			6: () => constructors.Spiccato,
			7: () => constructors.Scoop,
			8: () => constructors.Plop,
			9: () => constructors.Doit,
			10: () => constructors.Falloff,
			11: () => constructors.BreathMark,
			12: () => constructors.Caesura,
			13: () => constructors.Stress,
			14: () => constructors.Unstress,
			15: () => constructors.SoftAccent,
			16: () => constructors.OtherArticulation,
		},
	),
};

const shared459: Descriptor = { type: 'zeroOrMore', value: shared458 };

const shared460: Descriptor = { type: 'label', label: 'articulations', value: shared459 };

const shared461: Record<string, Descriptor> = { smufl: shared6 };

const shared462: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	enclosure: shared147,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	'line-through': shared152,
	overline: shared152,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	underline: shared152,
	valign: shared80,
};

const shared463: Descriptor = {
	type: 'choices',
	choices: withElements(
		[
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
		],
		{
			0: () => constructors.P,
			1: () => constructors.Pp,
			2: () => constructors.Ppp,
			3: () => constructors.Pppp,
			4: () => constructors.Ppppp,
			5: () => constructors.Pppppp,
			6: () => constructors.F,
			7: () => constructors.Ff,
			8: () => constructors.Fff,
			9: () => constructors.Ffff,
			10: () => constructors.Fffff,
			11: () => constructors.Ffffff,
			12: () => constructors.Mp,
			13: () => constructors.Mf,
			14: () => constructors.Sf,
			15: () => constructors.Sfp,
			16: () => constructors.Sfpp,
			17: () => constructors.Fp,
			18: () => constructors.Rf,
			19: () => constructors.Rfz,
			20: () => constructors.Sfz,
			21: () => constructors.Sffz,
			22: () => constructors.Fz,
			23: () => constructors.N,
			24: () => constructors.Pf,
			25: () => constructors.Sfzp,
			26: () => constructors.OtherDynamics,
		},
	),
};

const shared464: Descriptor = { type: 'zeroOrMore', value: shared463 };

const shared465: Descriptor = { type: 'label', label: 'value', value: shared464 };

const shared466: Descriptor = { type: 'choices', choices: ['upright', 'inverted'] };

const shared467: Descriptor = { type: 'optional', value: shared466 };

const shared468: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	id: shared140,
	'relative-x': shared66,
	'relative-y': shared66,
	type: shared467,
};

const shared469: Descriptor = {
	type: 'choices',
	choices: ['', 'normal', 'angled', 'square', 'double-angled', 'double-square', 'double-dot', 'half-curve', 'curlew'],
};

const shared470: Descriptor = { type: 'required', value: shared469 };

const shared471: Descriptor = { type: 'label', label: 'fermata-shape', value: shared470 };

const shared472: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	direction: shared447,
	id: shared140,
	number: shared229,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	unbroken: shared78,
};

const shared473: Descriptor = { type: 'choices', choices: ['top', 'bottom'] };

const shared474: Descriptor = { type: 'required', value: shared473 };

const shared475: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	id: shared140,
	number: shared229,
	placement: shared305,
	'relative-x': shared66,
	'relative-y': shared66,
	type: shared474,
};

const shared476: Descriptor = { type: 'required', value: shared193 };

const shared477: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	id: shared140,
	number: shared229,
	placement: shared305,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	smufl: shared6,
	type: shared476,
};

const shared478: Record<string, Descriptor> = { id: shared140, 'print-object': shared78 };

const shared479: Descriptor = {
	type: 'choices',
	choices: withElements([null, null, null, null, null, null, null, null, null, null, null, null, null, null], {
		0: () => constructors.Tied,
		1: () => constructors.Slur,
		2: () => constructors.Tuplet,
		3: () => constructors.Glissando,
		4: () => constructors.Slide,
		5: () => constructors.Ornaments,
		6: () => constructors.Technical,
		7: () => constructors.Articulations,
		8: () => constructors.Dynamics,
		9: () => constructors.Fermata,
		10: () => constructors.Arpeggiate,
		11: () => constructors.NonArpeggiate,
		12: () => constructors.AccidentalMark,
		13: () => constructors.OtherNotation,
	}),
};

const shared480: Descriptor = { type: 'zeroOrMore', value: shared479 };

const shared481: Descriptor = { type: 'label', label: 'values', value: shared480 };

const shared482: Descriptor = { type: 'choices', choices: ['begin', 'single', 'end', 'middle'] };

const shared483: Descriptor = { type: 'required', value: shared482 };

const shared484: Descriptor = { type: 'label', label: 'syllabic', value: shared483 };

const shared485: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	dir: shared145,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'letter-spacing': shared150,
	'line-through': shared152,
	overline: shared152,
	rotation: shared154,
	underline: shared152,
	'xml:lang': shared6,
};

const shared486: Descriptor = { type: 'regex', pattern: /lyrics/, zero: 'lyrics' };

const shared487: Descriptor = { type: 'optional', value: shared486 };

const shared488: Record<string, Descriptor> = {
	color: shared65,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	smufl: shared487,
};

const shared489: Descriptor = { type: 'optional', value: shared345 };

const shared490: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'relative-x': shared66,
	'relative-y': shared66,
	type: shared489,
};

const shared491: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	id: shared140,
	justify: shared77,
	name: shared6,
	number: shared6,
	placement: shared305,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	'time-only': shared296,
};

const shared492: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Syllabic;
	},
};

const shared493: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Text;
	},
};

const shared494: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Elision;
	},
};

const shared495: Descriptor = { type: 'optional', value: [shared494, shared492] };

const shared496: Descriptor = { type: 'zeroOrMore', value: [shared495, shared493] };

const shared497: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Extend;
	},
};

const shared498: Descriptor = {
	type: 'label',
	label: 'intelligible',
	value: [shared492, shared493, shared496, shared497],
};

const shared499: Descriptor = {
	type: 'choices',
	choices: withElements([shared498, null, null, null], {
		1: () => constructors.Extend,
		2: () => constructors.Laughing,
		3: () => constructors.Humming,
	}),
};

const shared500: Descriptor = { type: 'label', label: 'value', value: shared499 };

const shared501: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.EndLine;
	},
};

const shared502: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.EndParagraph;
	},
};

const shared503: Descriptor = {
	type: 'choices',
	choices: [
		'on',
		'off',
		'straight',
		'cup',
		'harmon-no-stem',
		'harmon-stem',
		'bucket',
		'plunger',
		'hat',
		'solotone',
		'practice',
		'stop-mute',
		'stop-hand',
		'echo',
		'palm',
	],
};

const shared504: Descriptor = { type: 'required', value: shared503 };

const shared505: Descriptor = { type: 'label', label: 'mute', value: shared504 };

const shared506: Descriptor = {
	type: 'choices',
	choices: ['high', 'medium-high', 'medium', 'medium-low', 'low', 'very-low'],
};

const shared507: Descriptor = { type: 'required', value: shared506 };

const shared508: Descriptor = { type: 'label', label: 'semi-pitched', value: shared507 };

const shared509: Descriptor = {
	type: 'choices',
	choices: withElements([null, null, null, null], {
		0: () => constructors.Ipa,
		1: () => constructors.Mute,
		2: () => constructors.SemiPitched,
		3: () => constructors.OtherPlay,
	}),
};

const shared510: Descriptor = { type: 'zeroOrMore', value: shared509 };

const shared511: Descriptor = { type: 'label', label: 'value', value: shared510 };

const shared512: Record<string, Descriptor> = { player: shared140, 'time-only': shared296, type: shared20 };

const shared513: Record<string, Descriptor> = { player: shared140, 'time-only': shared296 };

const shared514: Record<string, Descriptor> = { player: shared140, 'time-only': shared296, type: shared2 };

const shared515: Descriptor = {
	type: 'choices',
	choices: withElements([null, null, null], {
		0: () => constructors.Assess,
		1: () => constructors.Wait,
		2: () => constructors.OtherListen,
	}),
};

const shared516: Descriptor = { type: 'oneOrMore', value: shared515 };

const shared517: Descriptor = { type: 'label', label: 'listens', value: shared516 };

const shared518: Descriptor = { type: 'optional', value: shared99 };

const shared519: Record<string, Descriptor> = {
	attack: shared66,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	dynamics: shared518,
	'end-dynamics': shared518,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	id: shared140,
	pizzicato: shared78,
	'print-dot': shared78,
	'print-leger': shared78,
	'print-lyric': shared78,
	'print-object': shared78,
	'print-spacing': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	release: shared66,
	'time-only': shared296,
};

const shared520: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Chord;
	},
};

const shared521: Descriptor = {
	type: 'choices',
	choices: withElements([null, null, null], {
		0: () => constructors.Pitch,
		1: () => constructors.Unpitched,
		2: () => constructors.Rest,
	}),
};

const shared522: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Duration;
	},
};

const shared523: Descriptor = {
	type: 'choices',
	choices: [
		[],
		withElements([null], { 0: () => constructors.Tie }),
		withElements([null, null], { 0: () => constructors.Tie, 1: () => constructors.Tie }),
	],
};

const shared524: Descriptor = {
	type: 'label',
	label: 'tied-note',
	value: [shared520, shared521, shared522, shared523],
};

const shared525: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Cue;
	},
};

const shared526: Descriptor = {
	type: 'label',
	label: 'cued-note',
	value: [shared525, shared520, shared521, shared522],
};

const shared527: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Grace;
	},
};

const shared528: Descriptor = {
	type: 'label',
	label: 'tied-grace-note',
	value: [shared527, shared520, shared521, shared523],
};

const shared529: Descriptor = {
	type: 'label',
	label: 'cued-grace-note',
	value: [shared527, shared525, shared520, shared521, shared522],
};

const shared530: Descriptor = { type: 'choices', choices: [shared524, shared526, shared528, shared529] };

const shared531: Descriptor = { type: 'label', label: 'variation', value: shared530 };

const shared532: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Instrument;
	},
};

const shared533: Descriptor = { type: 'label', label: 'instruments', value: shared532 };

const shared534: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Voice;
	},
};

const shared535: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Type;
	},
};

const shared536: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Dot;
	},
};

const shared537: Descriptor = { type: 'label', label: 'dots', value: shared536 };

const shared538: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Accidental;
	},
};

const shared539: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.TimeModification;
	},
};

const shared540: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Stem;
	},
};

const shared541: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Notehead;
	},
};

const shared542: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.NoteheadText;
	},
};

const shared543: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Staff;
	},
};

const shared544: Descriptor = {
	type: 'choices',
	choices: [
		[],
		withElements([null], { 0: () => constructors.Beam }),
		withElements([null, null], { 0: () => constructors.Beam, 1: () => constructors.Beam }),
		withElements([null, null, null], {
			0: () => constructors.Beam,
			1: () => constructors.Beam,
			2: () => constructors.Beam,
		}),
		withElements([null, null, null, null], {
			0: () => constructors.Beam,
			1: () => constructors.Beam,
			2: () => constructors.Beam,
			3: () => constructors.Beam,
		}),
		withElements([null, null, null, null, null], {
			0: () => constructors.Beam,
			1: () => constructors.Beam,
			2: () => constructors.Beam,
			3: () => constructors.Beam,
			4: () => constructors.Beam,
		}),
		withElements([null, null, null, null, null, null], {
			0: () => constructors.Beam,
			1: () => constructors.Beam,
			2: () => constructors.Beam,
			3: () => constructors.Beam,
			4: () => constructors.Beam,
			5: () => constructors.Beam,
		}),
		withElements([null, null, null, null, null, null, null], {
			0: () => constructors.Beam,
			1: () => constructors.Beam,
			2: () => constructors.Beam,
			3: () => constructors.Beam,
			4: () => constructors.Beam,
			5: () => constructors.Beam,
			6: () => constructors.Beam,
		}),
		withElements([null, null, null, null, null, null, null, null], {
			0: () => constructors.Beam,
			1: () => constructors.Beam,
			2: () => constructors.Beam,
			3: () => constructors.Beam,
			4: () => constructors.Beam,
			5: () => constructors.Beam,
			6: () => constructors.Beam,
			7: () => constructors.Beam,
		}),
	],
};

const shared545: Descriptor = { type: 'label', label: 'beams', value: shared544 };

const shared546: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Notations;
	},
};

const shared547: Descriptor = { type: 'label', label: 'notations', value: shared546 };

const shared548: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Lyric;
	},
};

const shared549: Descriptor = { type: 'label', label: 'lyrics', value: shared548 };

const shared550: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Play;
	},
};

const shared551: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Listen;
	},
};

const shared552: Descriptor = { type: 'regex', pattern: /segno[\w.:-]*/, zero: 'segno' };

const shared553: Descriptor = { type: 'optional', value: shared552 };

const shared554: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	'relative-x': shared66,
	'relative-y': shared66,
	smufl: shared553,
	valign: shared80,
};

const shared555: Descriptor = { type: 'regex', pattern: /coda[\w.:-]*/, zero: 'coda' };

const shared556: Descriptor = { type: 'optional', value: shared555 };

const shared557: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	'relative-x': shared66,
	'relative-y': shared66,
	smufl: shared556,
	valign: shared80,
};

const shared558: Descriptor = { type: 'choices', choices: ['crescendo', 'diminuendo', 'stop', 'continue'] };

const shared559: Descriptor = { type: 'required', value: shared558 };

const shared560: Record<string, Descriptor> = {
	color: shared65,
	'dash-length': shared66,
	'default-x': shared66,
	'default-y': shared66,
	id: shared140,
	'line-type': shared339,
	niente: shared78,
	number: shared229,
	'relative-x': shared66,
	'relative-y': shared66,
	'space-length': shared66,
	spread: shared66,
	type: shared559,
};

const shared561: Record<string, Descriptor> = {
	color: shared65,
	'dash-length': shared66,
	'default-x': shared66,
	'default-y': shared66,
	id: shared140,
	number: shared229,
	'relative-x': shared66,
	'relative-y': shared66,
	'space-length': shared66,
	type: shared346,
};

const shared562: Descriptor = { type: 'choices', choices: ['none', 'up', 'down', 'both', 'arrow'] };

const shared563: Descriptor = { type: 'required', value: shared562 };

const shared564: Record<string, Descriptor> = {
	color: shared65,
	'dash-length': shared66,
	'default-x': shared66,
	'default-y': shared66,
	'end-length': shared66,
	id: shared140,
	'line-end': shared563,
	'line-type': shared339,
	number: shared229,
	'relative-x': shared66,
	'relative-y': shared66,
	'space-length': shared66,
	type: shared346,
};

const shared565: Descriptor = {
	type: 'choices',
	choices: ['start', 'stop', 'sostenuto', 'change', 'continue', 'discontinue', 'resume'],
};

const shared566: Descriptor = { type: 'required', value: shared565 };

const shared567: Record<string, Descriptor> = {
	abbreviated: shared78,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	line: shared78,
	number: shared229,
	'relative-x': shared66,
	'relative-y': shared66,
	sign: shared78,
	type: shared566,
	valign: shared80,
};

const shared568: Descriptor = {
	type: 'required',
	get value() {
		return constructors.BeatUnit;
	},
};

const shared569: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.BeatUnitDot;
	},
};

const shared570: Descriptor = { type: 'label', label: 'beat-unit-dots', value: shared569 };

const shared571: Record<string, Descriptor> = { number: shared333 };

const shared572: Record<string, Descriptor> = { type: shared197 };

const shared573: Record<string, Descriptor> = { bracket: shared78, 'show-number': shared356, type: shared197 };

const shared574: Descriptor = {
	type: 'required',
	get value() {
		return constructors.MetronomeType;
	},
};

const shared575: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.MetronomeDot;
	},
};

const shared576: Descriptor = { type: 'label', label: 'metronome-dots', value: shared575 };

const shared577: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.MetronomeBeam;
	},
};

const shared578: Descriptor = { type: 'label', label: 'metronome-beams', value: shared577 };

const shared579: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MetronomeTied;
	},
};

const shared580: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MetronomeTuplet;
	},
};

const shared581: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	justify: shared77,
	parentheses: shared78,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	valign: shared80,
};

const shared582: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.BeatUnitTied;
	},
};

const shared583: Descriptor = {
	type: 'choices',
	choices: withElements([null, [shared568, shared569, shared582]], { 0: () => constructors.PerMinute }),
};

const shared584: Descriptor = {
	type: 'label',
	label: 'beat-spec',
	value: [shared568, shared569, shared582, shared583],
};

const shared585: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MetronomeArrows;
	},
};

const shared586: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.MetronomeNote;
	},
};

const shared587: Descriptor = {
	type: 'required',
	get value() {
		return constructors.MetronomeRelation;
	},
};

const shared588: Descriptor = { type: 'optional', value: [shared587, shared586] };

const shared589: Descriptor = { type: 'label', label: 'metronome-spec', value: [shared585, shared586, shared588] };

const shared590: Descriptor = { type: 'choices', choices: [shared584, shared589] };

const shared591: Descriptor = { type: 'label', label: 'metronome', value: shared590 };

const shared592: Descriptor = { type: 'choices', choices: ['up', 'down', 'stop', 'continue'] };

const shared593: Descriptor = { type: 'required', value: shared592 };

const shared594: Record<string, Descriptor> = {
	color: shared65,
	'dash-length': shared66,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	id: shared140,
	number: shared229,
	'relative-x': shared66,
	'relative-y': shared66,
	size: shared89,
	'space-length': shared66,
	type: shared593,
};

const shared595: Descriptor = {
	type: 'required',
	get value() {
		return constructors.PedalStep;
	},
};

const shared596: Descriptor = {
	type: 'required',
	get value() {
		return constructors.PedalAlter;
	},
};

const shared597: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	'relative-x': shared66,
	'relative-y': shared66,
	valign: shared80,
};

const shared598: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.PedalTuning;
	},
};

const shared599: Descriptor = { type: 'label', label: 'pedal-tunings', value: shared598 };

const shared600: Descriptor = { type: 'choices', choices: ['on', 'off'] };

const shared601: Descriptor = { type: 'required', value: shared600 };

const shared602: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	'relative-x': shared66,
	'relative-y': shared66,
	type: shared601,
	valign: shared80,
};

const shared603: Record<string, Descriptor> = { string: shared89 };

const shared604: Descriptor = {
	type: 'required',
	get value() {
		return constructors.TuningStep;
	},
};

const shared605: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.TuningAlter;
	},
};

const shared606: Descriptor = {
	type: 'required',
	get value() {
		return constructors.TuningOctave;
	},
};

const shared607: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.Accord;
	},
};

const shared608: Descriptor = { type: 'label', label: 'accords', value: shared607 };

const shared609: Record<string, Descriptor> = {
	'default-x': shared66,
	'default-y': shared66,
	halign: shared77,
	height: shared66,
	id: shared140,
	'relative-x': shared66,
	'relative-y': shared66,
	source: shared2,
	type: shared2,
	valign: shared80,
	width: shared66,
};

const shared610: Descriptor = { type: 'choices', choices: ['none', 'Hauptstimme', 'Nebenstimme', 'plain'] };

const shared611: Descriptor = { type: 'required', value: shared610 };

const shared612: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	'relative-x': shared66,
	'relative-y': shared66,
	symbol: shared611,
	type: shared197,
	valign: shared80,
};

const shared613: Descriptor = { type: 'regex', pattern: /pict/, zero: 'pict' };

const shared614: Descriptor = { type: 'optional', value: shared613 };

const shared615: Record<string, Descriptor> = { smufl: shared614 };

const shared616: Descriptor = { type: 'choices', choices: ['glass harmonica', 'glass harp', 'wind chimes'] };

const shared617: Descriptor = { type: 'required', value: shared616 };

const shared618: Descriptor = { type: 'label', label: 'glass-value', value: shared617 };

const shared619: Descriptor = {
	type: 'choices',
	choices: [
		'agogo',
		'almglocken',
		'bell',
		'bell plate',
		'bell tree',
		'brake drum',
		'cencerro',
		'chain rattle',
		'Chinese cymbal',
		'cowbell',
		'crash cymbals',
		'crotale',
		'cymbal tongs',
		'domed gong',
		'finger cymbals',
		'flexatone',
		'gong',
		'hi-hat',
		'high-hat cymbals',
		'handbell',
		'jaw harp',
		'jingle bells',
		'musical saw',
		'shell bells',
		'sistrum',
		'sizzle cymbal',
		'sleigh bells',
		'suspended cymbal',
		'tam tam',
		'tam tam with beater',
		'triangle',
		'Vietnamese hat',
	],
};

const shared620: Descriptor = { type: 'required', value: shared619 };

const shared621: Descriptor = { type: 'label', label: 'metal-value', value: shared620 };

const shared622: Descriptor = {
	type: 'choices',
	choices: [
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
	],
};

const shared623: Descriptor = { type: 'required', value: shared622 };

const shared624: Descriptor = { type: 'label', label: 'wood-value', value: shared623 };

const shared625: Descriptor = {
	type: 'choices',
	choices: [
		'celesta',
		'chimes',
		'glockenspiel',
		'lithophone',
		'mallet',
		'marimba',
		'steel drums',
		'tubaphone',
		'tubular chimes',
		'vibraphone',
		'xylophone',
	],
};

const shared626: Descriptor = { type: 'required', value: shared625 };

const shared627: Descriptor = { type: 'label', label: 'pitched-value', value: shared626 };

const shared628: Descriptor = {
	type: 'choices',
	choices: [
		'bass drum',
		'bass drum on side',
		'bongos',
		'Chinese tomtom',
		'conga drum',
		'cuica',
		'goblet drum',
		'Indo-American tomtom',
		'Japanese tomtom',
		'military drum',
		'snare drum',
		'snare drum snares off',
		'tabla',
		'tambourine',
		'tenor drum',
		'timbales',
		'tomtom',
	],
};

const shared629: Descriptor = { type: 'required', value: shared628 };

const shared630: Descriptor = { type: 'label', label: 'membrane-value', value: shared629 };

const shared631: Descriptor = {
	type: 'choices',
	choices: [
		'anvil',
		'auto horn',
		'bird whistle',
		'cannon',
		'duck call',
		'gun shot',
		'klaxon horn',
		'lions roar',
		'lotus flute',
		'megaphone',
		'police whistle',
		'siren',
		'slide whistle',
		'thunder sheet',
		'wind machine',
		'wind whistle',
	],
};

const shared632: Descriptor = { type: 'required', value: shared631 };

const shared633: Descriptor = { type: 'label', label: 'effect-value', value: shared632 };

const shared634: Descriptor = {
	type: 'choices',
	choices: ['down', 'up', 'left', 'right', 'northwest', 'northeast', 'southeast', 'southwest'],
};

const shared635: Descriptor = { type: 'optional', value: shared634 };

const shared636: Record<string, Descriptor> = { tip: shared635 };

const shared637: Descriptor = {
	type: 'choices',
	choices: [
		'bow',
		'chime hammer',
		'coin',
		'drum stick',
		'finger',
		'fingernail',
		'fist',
		'guiro scraper',
		'hammer',
		'hand',
		'jazz stick',
		'knitting needle',
		'metal hammer',
		'slide brush on gong',
		'snare stick',
		'spoon mallet',
		'superball',
		'triangle beater',
		'triangle beater plain',
		'wire brush',
	],
};

const shared638: Descriptor = { type: 'required', value: shared637 };

const shared639: Descriptor = { type: 'label', label: 'beater-value', value: shared638 };

const shared640: Descriptor = {
	type: 'choices',
	choices: [
		'bass drum',
		'double bass drum',
		'glockenspiel',
		'gum',
		'hammer',
		'superball',
		'timpani',
		'wound',
		'xylophone',
		'yarn',
	],
};

const shared641: Descriptor = { type: 'required', value: shared640 };

const shared642: Descriptor = { type: 'label', label: 'stick-type', value: shared641 };

const shared643: Descriptor = { type: 'choices', choices: ['x', 'soft', 'medium', 'hard', 'shaded'] };

const shared644: Descriptor = { type: 'required', value: shared643 };

const shared645: Descriptor = { type: 'label', label: 'stick-material', value: shared644 };

const shared646: Record<string, Descriptor> = { 'dashed-circle': shared78, parentheses: shared78, tip: shared635 };

const shared647: Descriptor = {
	type: 'required',
	get value() {
		return constructors.StickType;
	},
};

const shared648: Descriptor = {
	type: 'required',
	get value() {
		return constructors.StickMaterial;
	},
};

const shared649: Descriptor = { type: 'choices', choices: ['center', 'rim', 'cymbal bell', 'cymbal edge'] };

const shared650: Descriptor = { type: 'required', value: shared649 };

const shared651: Descriptor = { type: 'label', label: 'stick-location', value: shared650 };

const shared652: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	enclosure: shared147,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	'relative-x': shared66,
	'relative-y': shared66,
	valign: shared80,
};

const shared653: Descriptor = {
	type: 'choices',
	choices: withElements([null, null, null, null, null, null, null, null, null, null, null], {
		0: () => constructors.Glass,
		1: () => constructors.Metal,
		2: () => constructors.Wood,
		3: () => constructors.Pitched,
		4: () => constructors.Membrane,
		5: () => constructors.Effect,
		6: () => constructors.Timpani,
		7: () => constructors.Beater,
		8: () => constructors.Stick,
		9: () => constructors.StickLocation,
		10: () => constructors.OtherPercussion,
	}),
};

const shared654: Descriptor = { type: 'label', label: 'value', value: shared653 };

const shared655: Descriptor = { type: 'int', min: 1, max: 3 };

const shared656: Descriptor = { type: 'required', value: shared655 };

const shared657: Descriptor = { type: 'label', label: 'value', value: shared656 };

const shared658: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.AccordionHigh;
	},
};

const shared659: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.AccordionMiddle;
	},
};

const shared660: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.AccordionLow;
	},
};

const shared661: Descriptor = { type: 'choices', choices: ['down', 'up', 'up-down'] };

const shared662: Descriptor = { type: 'required', value: shared661 };

const shared663: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	'relative-x': shared66,
	'relative-y': shared66,
	type: shared662,
	valign: shared80,
};

const shared664: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	smufl: shared6,
	valign: shared80,
};

const shared665: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.Rehearsal;
	},
};

const shared666: Descriptor = { type: 'label', label: 'rehearsals', value: shared665 };

const shared667: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.Segno;
	},
};

const shared668: Descriptor = { type: 'label', label: 'segnos', value: shared667 };

const shared669: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.Coda;
	},
};

const shared670: Descriptor = { type: 'label', label: 'codas', value: shared669 };

const shared671: Descriptor = {
	type: 'choices',
	choices: withElements([null, null], { 0: () => constructors.Words, 1: () => constructors.Symbol }),
};

const shared672: Descriptor = { type: 'oneOrMore', value: shared671 };

const shared673: Descriptor = { type: 'label', label: 'tokens', value: shared672 };

const shared674: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.Dynamics;
	},
};

const shared675: Descriptor = { type: 'label', label: 'dynamics-list', value: shared674 };

const shared676: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.Percussion;
	},
};

const shared677: Descriptor = { type: 'label', label: 'percussions', value: shared676 };

const shared678: Descriptor = {
	type: 'choices',
	choices: withElements(
		[
			shared666,
			shared668,
			shared670,
			shared673,
			null,
			shared675,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			shared677,
			null,
			null,
			null,
		],
		{
			4: () => constructors.Wedge,
			6: () => constructors.Dashes,
			7: () => constructors.Bracket,
			8: () => constructors.Pedal,
			9: () => constructors.Metronome,
			10: () => constructors.OctaveShift,
			11: () => constructors.HarpPedals,
			12: () => constructors.Damp,
			13: () => constructors.DampAll,
			14: () => constructors.Eyeglasses,
			15: () => constructors.StringMute,
			16: () => constructors.Scordatura,
			17: () => constructors.Image,
			18: () => constructors.PrincipalVoice,
			20: () => constructors.AccordionRegistration,
			21: () => constructors.StaffDivide,
			22: () => constructors.OtherDirection,
		},
	),
};

const shared679: Descriptor = { type: 'label', label: 'direction-type', value: shared678 };

const shared680: Record<string, Descriptor> = { sound: shared78 };

const shared681: Descriptor = { type: 'label', label: 'swing-ratio', value: shared328 };

const shared682: Descriptor = { type: 'choices', choices: ['eighth', '16th'] };

const shared683: Descriptor = { type: 'required', value: shared682 };

const shared684: Descriptor = { type: 'label', label: 'eighth', value: shared683 };

const shared685: Descriptor = {
	type: 'required',
	get value() {
		return constructors.First;
	},
};

const shared686: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Second;
	},
};

const shared687: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.SwingType;
	},
};

const shared688: Descriptor = { type: 'label', label: 'alternate-swing', value: [shared685, shared686, shared687] };

const shared689: Descriptor = {
	type: 'choices',
	choices: withElements([null, shared688], { 0: () => constructors.Straight }),
};

const shared690: Descriptor = { type: 'label', label: 'value', value: shared689 };

const shared691: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.SwingStyle;
	},
};

const shared692: Descriptor = { type: 'choices', choices: ['no', 'yes', 0, 1] };

const shared693: Descriptor = { type: 'optional', value: shared692 };

const shared694: Record<string, Descriptor> = {
	coda: shared6,
	dacapo: shared78,
	dalsegno: shared6,
	'damper-pedal': shared693,
	divisions: shared66,
	dynamics: shared518,
	elevation: shared154,
	fine: shared6,
	'forward-repeat': shared78,
	id: shared140,
	pan: shared154,
	pizzicato: shared78,
	segno: shared6,
	'soft-pedal': shared693,
	'sostenuto-pedal': shared693,
	tempo: shared518,
	'time-only': shared296,
	tocoda: shared6,
};

const shared695: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.InstrumentChange;
	},
};

const shared696: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MidiDevice;
	},
};

const shared697: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MidiInstrument;
	},
};

const shared698: Descriptor = { type: 'zeroOrMore', value: [shared695, shared696, shared697, shared550] };

const shared699: Descriptor = { type: 'label', label: 'playbacks', value: shared698 };

const shared700: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Swing;
	},
};

const shared701: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Offset;
	},
};

const shared702: Descriptor = { type: 'optional', value: shared308 };

const shared703: Descriptor = {
	type: 'choices',
	choices: ['none', 'tempo', 'mostly-tempo', 'mostly-event', 'event', 'always-event'],
};

const shared704: Descriptor = { type: 'required', value: shared703 };

const shared705: Record<string, Descriptor> = {
	latency: shared702,
	player: shared140,
	'time-only': shared296,
	type: shared704,
};

const shared706: Descriptor = {
	type: 'choices',
	choices: withElements([null, null], { 0: () => constructors.Sync, 1: () => constructors.OtherListening }),
};

const shared707: Descriptor = { type: 'oneOrMore', value: shared706 };

const shared708: Descriptor = { type: 'label', label: 'listening', value: shared707 };

const shared709: Descriptor = { type: 'choices', choices: ['none', 'only-top', 'also-top'] };

const shared710: Descriptor = { type: 'optional', value: shared709 };

const shared711: Record<string, Descriptor> = {
	directive: shared78,
	id: shared140,
	placement: shared305,
	system: shared710,
};

const shared712: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.DirectionType;
	},
};

const shared713: Descriptor = { type: 'label', label: 'direction-types', value: shared712 };

const shared714: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Sound;
	},
};

const shared715: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Listening;
	},
};

const shared716: Descriptor = { type: 'choices', choices: ['left', 'right', 'beforeBarline'] };

const shared717: Descriptor = { type: 'optional', value: shared716 };

const shared718: Record<string, Descriptor> = { location: shared717 };

const shared719: Descriptor = { type: 'int', min: -Infinity, max: Infinity };

const shared720: Descriptor = { type: 'required', value: shared719 };

const shared721: Descriptor = { type: 'label', label: 'fifths', value: shared720 };

const shared722: Descriptor = { type: 'optional', value: shared719 };

const shared723: Descriptor = { type: 'label', label: 'value', value: shared722 };

const shared724: Descriptor = {
	type: 'choices',
	choices: [
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
		shared1,
	],
};

const shared725: Descriptor = { type: 'required', value: shared724 };

const shared726: Descriptor = { type: 'label', label: 'mode', value: shared725 };

const shared727: Record<string, Descriptor> = { smufl: shared174 };

const shared728: Record<string, Descriptor> = { cancel: shared78, number: shared328 };

const shared729: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	id: shared140,
	number: shared89,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
};

const shared730: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Cancel;
	},
};

const shared731: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Fifths;
	},
};

const shared732: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Mode;
	},
};

const shared733: Descriptor = { type: 'label', label: 'tranditional-key', value: [shared730, shared731, shared732] };

const shared734: Descriptor = {
	type: 'required',
	get value() {
		return constructors.KeyStep;
	},
};

const shared735: Descriptor = {
	type: 'required',
	get value() {
		return constructors.KeyAlter;
	},
};

const shared736: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.KeyAccidental;
	},
};

const shared737: Descriptor = { type: 'zeroOrMore', value: [shared734, shared735, shared736] };

const shared738: Descriptor = { type: 'label', label: 'alternate-key', value: shared737 };

const shared739: Descriptor = { type: 'choices', choices: [shared733, shared738] };

const shared740: Descriptor = { type: 'label', label: 'value', value: shared739 };

const shared741: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.KeyOctave;
	},
};

const shared742: Descriptor = { type: 'label', label: 'key-octaves', value: shared741 };

const shared743: Descriptor = {
	type: 'choices',
	choices: ['space', 'parentheses', 'bracket', 'equals', 'slash', 'hyphen'],
};

const shared744: Descriptor = { type: 'required', value: shared743 };

const shared745: Descriptor = { type: 'label', label: 'time-relation', value: shared744 };

const shared746: Descriptor = { type: 'choices', choices: ['none', 'horizontal', 'diagonal', 'vertical', 'adjacent'] };

const shared747: Descriptor = { type: 'optional', value: shared746 };

const shared748: Descriptor = {
	type: 'choices',
	choices: ['normal', 'common', 'cut', 'single-number', 'note', 'dotted-note'],
};

const shared749: Descriptor = { type: 'optional', value: shared748 };

const shared750: Record<string, Descriptor> = { separator: shared747, symbol: shared749 };

const shared751: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.TimeRelation;
	},
};

const shared752: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Beats;
	},
};

const shared753: Descriptor = {
	type: 'required',
	get value() {
		return constructors.BeatType;
	},
};

const shared754: Descriptor = { type: 'oneOrMore', value: [shared752, shared753] };

const shared755: Descriptor = { type: 'label', label: 'beats', value: shared754 };

const shared756: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	number: shared89,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	separator: shared747,
	symbol: shared749,
	valign: shared80,
};

const shared757: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Interchangeable;
	},
};

const shared758: Descriptor = { type: 'label', label: 'time-signature', value: [shared754, shared757] };

const shared759: Descriptor = {
	type: 'choices',
	choices: withElements([shared758, null], { 1: () => constructors.SenzaMisura }),
};

const shared760: Descriptor = { type: 'label', label: 'value', value: shared759 };

const shared761: Record<string, Descriptor> = {
	'bottom-staff': shared89,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'relative-x': shared66,
	'relative-y': shared66,
	'top-staff': shared89,
};

const shared762: Descriptor = { type: 'choices', choices: ['G', 'F', 'C', 'percussion', 'TAB', 'jianpu', 'none'] };

const shared763: Descriptor = { type: 'required', value: shared762 };

const shared764: Descriptor = { type: 'label', label: 'clef-sign', value: shared763 };

const shared765: Descriptor = { type: 'label', label: 'staff-line-position', value: shared720 };

const shared766: Descriptor = { type: 'label', label: 'clef-octave-change', value: shared720 };

const shared767: Record<string, Descriptor> = {
	additional: shared78,
	'after-barline': shared78,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	id: shared140,
	number: shared89,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	size: shared192,
};

const shared768: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Sign;
	},
};

const shared769: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Line;
	},
};

const shared770: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.ClefOctaveChange;
	},
};

const shared771: Descriptor = { type: 'choices', choices: ['regular', 'ossia', 'editorial', 'cue', 'alternate'] };

const shared772: Descriptor = { type: 'required', value: shared771 };

const shared773: Descriptor = { type: 'label', label: 'staff-type', value: shared772 };

const shared774: Record<string, Descriptor> = {
	color: shared65,
	line: shared328,
	'line-type': shared339,
	'print-object': shared78,
	width: shared66,
};

const shared775: Record<string, Descriptor> = { line: shared328 };

const shared776: Record<string, Descriptor> = { scaling: shared518 };

const shared777: Descriptor = { type: 'label', label: 'value', value: shared100 };

const shared778: Descriptor = { type: 'choices', choices: ['letters', 'numbers'] };

const shared779: Descriptor = { type: 'optional', value: shared778 };

const shared780: Record<string, Descriptor> = {
	number: shared89,
	'print-object': shared78,
	'print-spacing': shared78,
	'show-frets': shared779,
};

const shared781: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.StaffType;
	},
};

const shared782: Descriptor = {
	type: 'required',
	get value() {
		return constructors.StaffLines;
	},
};

const shared783: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.LineDetail;
	},
};

const shared784: Descriptor = { type: 'optional', value: [shared782, shared783] };

const shared785: Descriptor = { type: 'label', label: 'lines', value: shared784 };

const shared786: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.StaffTuning;
	},
};

const shared787: Descriptor = { type: 'label', label: 'staff-tunings', value: shared786 };

const shared788: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Capo;
	},
};

const shared789: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.StaffSize;
	},
};

const shared790: Descriptor = { type: 'label', label: 'diatonic', value: shared720 };

const shared791: Descriptor = { type: 'label', label: 'value', value: shared720 };

const shared792: Record<string, Descriptor> = { above: shared78 };

const shared793: Record<string, Descriptor> = { id: shared140, number: shared89 };

const shared794: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Diatonic;
	},
};

const shared795: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Chromatic;
	},
};

const shared796: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.OctaveChange;
	},
};

const shared797: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Double;
	},
};

const shared798: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.PartClef;
	},
};

const shared799: Descriptor = {
	type: 'required',
	get value() {
		return constructors.PartTranspose;
	},
};

const shared800: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'relative-x': shared66,
	'relative-y': shared66,
	'xml:lang': shared6,
};

const shared801: Record<string, Descriptor> = { 'use-symbols': shared78 };

const shared802: Descriptor = { type: 'label', label: 'multiple-rest', value: shared328 };

const shared803: Record<string, Descriptor> = { slashes: shared89, type: shared197 };

const shared804: Descriptor = { type: 'label', label: 'value', value: shared216 };

const shared805: Record<string, Descriptor> = { slashes: shared89, type: shared197, 'use-dots': shared78 };

const shared806: Descriptor = {
	type: 'required',
	get value() {
		return constructors.SlashType;
	},
};

const shared807: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.SlashDot;
	},
};

const shared808: Descriptor = { type: 'optional', value: [shared806, shared807] };

const shared809: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.ExceptVoice;
	},
};

const shared810: Descriptor = { type: 'optional', value: [shared808, shared809] };

const shared811: Descriptor = { type: 'label', label: 'beat-repeat', value: shared810 };

const shared812: Record<string, Descriptor> = { type: shared197, 'use-dots': shared78, 'use-stems': shared78 };

const shared813: Descriptor = { type: 'label', label: 'value', value: shared810 };

const shared814: Record<string, Descriptor> = {
	color: shared65,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	id: shared140,
	number: shared89,
};

const shared815: Descriptor = {
	type: 'choices',
	choices: withElements([null, null, null, null], {
		0: () => constructors.MultipleRest,
		1: () => constructors.MeasureRepeat,
		2: () => constructors.BeatRepeat,
		3: () => constructors.Slash,
	}),
};

const shared816: Descriptor = { type: 'label', label: 'value', value: shared815 };

const shared817: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Divisions;
	},
};

const shared818: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Key;
	},
};

const shared819: Descriptor = { type: 'label', label: 'keys', value: shared818 };

const shared820: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Time;
	},
};

const shared821: Descriptor = { type: 'label', label: 'times', value: shared820 };

const shared822: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Staves;
	},
};

const shared823: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.PartSymbol;
	},
};

const shared824: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Instruments;
	},
};

const shared825: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Clef;
	},
};

const shared826: Descriptor = { type: 'label', label: 'clefs', value: shared825 };

const shared827: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.StaffDetails;
	},
};

const shared828: Descriptor = { type: 'label', label: 'staff-details', value: shared827 };

const shared829: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Transpose;
	},
};

const shared830: Descriptor = { type: 'label', label: 'transposes', value: shared829 };

const shared831: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.ForPart;
	},
};

const shared832: Descriptor = { type: 'label', label: 'for-parts', value: shared831 };

const shared833: Descriptor = { type: 'choices', choices: [shared830, shared832] };

const shared834: Descriptor = { type: 'label', label: 'transpositions', value: shared833 };

const shared835: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Directive;
	},
};

const shared836: Descriptor = { type: 'label', label: 'directives', value: shared835 };

const shared837: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.MeasureStyle;
	},
};

const shared838: Descriptor = { type: 'label', label: 'measure-styles', value: shared837 };

const shared839: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'relative-x': shared66,
	'relative-y': shared66,
	text: shared6,
};

const shared840: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	location: shared413,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
};

const shared841: Descriptor = {
	type: 'required',
	get value() {
		return constructors.RootStep;
	},
};

const shared842: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.RootAlter;
	},
};

const shared843: Descriptor = { type: 'int', min: 1, max: 7 };

const shared844: Descriptor = { type: 'required', value: shared843 };

const shared845: Descriptor = { type: 'label', label: 'numeral-value', value: shared844 };

const shared846: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	location: shared413,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	text: shared6,
};

const shared847: Descriptor = {
	type: 'choices',
	choices: ['major', 'minor', 'natural minor', 'melodic minor', 'harmonic minor'],
};

const shared848: Descriptor = { type: 'required', value: shared847 };

const shared849: Descriptor = { type: 'label', label: 'numeral-mode', value: shared848 };

const shared850: Descriptor = {
	type: 'required',
	get value() {
		return constructors.NumeralFifths;
	},
};

const shared851: Descriptor = {
	type: 'required',
	get value() {
		return constructors.NumeralMode;
	},
};

const shared852: Descriptor = {
	type: 'required',
	get value() {
		return constructors.NumeralRoot;
	},
};

const shared853: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.NumeralAlter;
	},
};

const shared854: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.NumeralKey;
	},
};

const shared855: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'relative-x': shared66,
	'relative-y': shared66,
};

const shared856: Record<string, Descriptor> = {
	'bracket-degrees': shared78,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	'parentheses-degrees': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	'stack-degrees': shared78,
	text: shared6,
	'use-symbols': shared78,
	valign: shared80,
};

const shared857: Descriptor = {
	type: 'choices',
	choices: [
		'none',
		'major',
		'minor',
		'augmented',
		'diminished',
		'dominant',
		'major-seventh',
		'minor-seventh',
		'diminished-seventh',
		'augmented-seventh',
		'half-diminished',
		'major-minor',
		'major-sixth',
		'minor-sixth',
		'dominant-ninth',
		'major-ninth',
		'minor-ninth',
		'dominant-11th',
		'major-11th',
		'minor-11th',
		'dominant-13th',
		'major-13th',
		'minor-13th',
		'suspended-second',
		'suspended-fourth',
		'Neapolitan',
		'Italian',
		'French',
		'German',
		'pedal',
		'power',
		'Tristan',
		'other',
	],
};

const shared858: Descriptor = { type: 'required', value: shared857 };

const shared859: Descriptor = { type: 'label', label: 'kind-value', value: shared858 };

const shared860: Descriptor = { type: 'label', label: 'inversion', value: shared309 };

const shared861: Descriptor = { type: 'choices', choices: ['horizontal', 'vertical', 'diagonal'] };

const shared862: Descriptor = { type: 'optional', value: shared861 };

const shared863: Record<string, Descriptor> = { arrangement: shared862 };

const shared864: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.BassSeparator;
	},
};

const shared865: Descriptor = {
	type: 'required',
	get value() {
		return constructors.BassStep;
	},
};

const shared866: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.BassAlter;
	},
};

const shared867: Descriptor = {
	type: 'choices',
	choices: ['major', 'minor', 'augmented', 'diminished', 'half-diminished'],
};

const shared868: Descriptor = { type: 'optional', value: shared867 };

const shared869: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'relative-x': shared66,
	'relative-y': shared66,
	symbol: shared868,
	text: shared6,
};

const shared870: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	'plus-minus': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
};

const shared871: Descriptor = { type: 'choices', choices: ['add', 'alter', 'subtract'] };

const shared872: Descriptor = { type: 'required', value: shared871 };

const shared873: Descriptor = { type: 'label', label: 'degree-type-value', value: shared872 };

const shared874: Descriptor = {
	type: 'required',
	get value() {
		return constructors.DegreeValue;
	},
};

const shared875: Descriptor = {
	type: 'required',
	get value() {
		return constructors.DegreeAlter;
	},
};

const shared876: Descriptor = {
	type: 'required',
	get value() {
		return constructors.DegreeType;
	},
};

const shared877: Descriptor = { type: 'label', label: 'lines-size', value: shared328 };

const shared878: Descriptor = { type: 'label', label: 'space-size', value: shared328 };

const shared879: Record<string, Descriptor> = { location: shared413, text: shared6 };

const shared880: Descriptor = { type: 'label', label: 'fret', value: shared328 };

const shared881: Record<string, Descriptor> = { color: shared65, type: shared197 };

const shared882: Descriptor = {
	type: 'required',
	get value() {
		return constructors.String;
	},
};

const shared883: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Fret;
	},
};

const shared884: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Fingering;
	},
};

const shared885: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Barre;
	},
};

const shared886: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	height: shared66,
	id: shared140,
	'relative-x': shared66,
	'relative-y': shared66,
	unplayed: shared6,
	valign: shared142,
	width: shared66,
};

const shared887: Descriptor = {
	type: 'required',
	get value() {
		return constructors.FrameStrings;
	},
};

const shared888: Descriptor = {
	type: 'required',
	get value() {
		return constructors.FrameFrets;
	},
};

const shared889: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.FirstFret;
	},
};

const shared890: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.FrameNote;
	},
};

const shared891: Descriptor = { type: 'label', label: 'frame-notes', value: shared890 };

const shared892: Descriptor = { type: 'choices', choices: ['alternate', 'explicit', 'implied'] };

const shared893: Descriptor = { type: 'optional', value: shared892 };

const shared894: Record<string, Descriptor> = {
	arrangement: shared862,
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	id: shared140,
	placement: shared305,
	'print-frame': shared78,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	system: shared710,
	type: shared893,
};

const shared895: Descriptor = {
	type: 'choices',
	choices: withElements([null, null, null], {
		0: () => constructors.Root,
		1: () => constructors.Numeral,
		2: () => constructors.Function,
	}),
};

const shared896: Descriptor = {
	type: 'required',
	get value() {
		return constructors.Kind;
	},
};

const shared897: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Inversion;
	},
};

const shared898: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Bass;
	},
};

const shared899: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Degree;
	},
};

const shared900: Descriptor = { type: 'oneOrMore', value: [shared895, shared896, shared897, shared898, shared899] };

const shared901: Descriptor = { type: 'label', label: 'values', value: shared900 };

const shared902: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Frame;
	},
};

const shared903: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Prefix;
	},
};

const shared904: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.FigureNumber;
	},
};

const shared905: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Suffix;
	},
};

const shared906: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	id: shared140,
	parentheses: shared78,
	placement: shared305,
	'print-dot': shared78,
	'print-lyric': shared78,
	'print-object': shared78,
	'print-spacing': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	valign: shared80,
};

const shared907: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.Figure;
	},
};

const shared908: Descriptor = { type: 'label', label: 'figures', value: shared907 };

const shared909: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Duration;
	},
};

const shared910: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MeasureDistance;
	},
};

const shared911: Descriptor = {
	type: 'choices',
	choices: ['none', 'only-top', 'only-bottom', 'also-top', 'also-bottom'],
};

const shared912: Descriptor = { type: 'optional', value: shared911 };

const shared913: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	halign: shared77,
	'multiple-rest-always': shared78,
	'multiple-rest-range': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	staff: shared89,
	system: shared912,
	valign: shared80,
};

const shared914: Descriptor = { type: 'choices', choices: ['none', 'measure', 'system'] };

const shared915: Descriptor = { type: 'required', value: shared914 };

const shared916: Descriptor = { type: 'label', label: 'measure-number-value', value: shared915 };

const shared917: Record<string, Descriptor> = {
	'blank-page': shared89,
	id: shared140,
	'new-page': shared78,
	'new-system': shared78,
	'page-number': shared6,
	'staff-spacing': shared66,
};

const shared918: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MeasureLayout;
	},
};

const shared919: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MeasureNumbering;
	},
};

const shared920: Descriptor = {
	type: 'choices',
	choices: [
		'none',
		'regular',
		'dotted',
		'dashed',
		'heavy',
		'light-light',
		'light-heavy',
		'heavy-light',
		'heavy-heavy',
		'tick',
		'short',
	],
};

const shared921: Descriptor = { type: 'required', value: shared920 };

const shared922: Descriptor = { type: 'label', label: 'bar-style', value: shared921 };

const shared923: Descriptor = { type: 'regex', pattern: /([ ]*)|([1-9][0-9]*(, ?[1-9][0-9]*)*)/, zero: '' };

const shared924: Descriptor = { type: 'required', value: shared923 };

const shared925: Descriptor = { type: 'choices', choices: ['start', 'stop', 'discontinue'] };

const shared926: Descriptor = { type: 'required', value: shared925 };

const shared927: Record<string, Descriptor> = {
	color: shared65,
	'default-x': shared66,
	'default-y': shared66,
	'end-length': shared66,
	'font-family': shared68,
	'font-size': shared71,
	'font-style': shared73,
	'font-weight': shared75,
	number: shared924,
	'print-object': shared78,
	'relative-x': shared66,
	'relative-y': shared66,
	system: shared710,
	'text-x': shared66,
	'text-y': shared66,
	type: shared926,
};

const shared928: Descriptor = { type: 'choices', choices: ['backward', 'forward'] };

const shared929: Descriptor = { type: 'required', value: shared928 };

const shared930: Descriptor = {
	type: 'choices',
	choices: ['none', 'straight', 'curved', 'double-straight', 'double-curved'],
};

const shared931: Descriptor = { type: 'optional', value: shared930 };

const shared932: Record<string, Descriptor> = {
	'after-jump': shared78,
	direction: shared929,
	times: shared702,
	winged: shared931,
};

const shared933: Descriptor = { type: 'label', label: 'coda-token', value: shared6 };

const shared934: Descriptor = { type: 'choices', choices: ['right', 'left', 'middle'] };

const shared935: Descriptor = { type: 'optional', value: shared934 };

const shared936: Descriptor = { type: 'label', label: 'segno-token', value: shared6 };

const shared937: Record<string, Descriptor> = {
	coda: shared933,
	divisions: shared66,
	id: shared140,
	location: shared935,
	segno: shared936,
};

const shared938: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.BarStyle;
	},
};

const shared939: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.WavyLine;
	},
};

const shared940: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Segno;
	},
};

const shared941: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Coda;
	},
};

const shared942: Descriptor = {
	type: 'choices',
	choices: [
		[],
		withElements([null], { 0: () => constructors.Fermata }),
		withElements([null, null], { 0: () => constructors.Fermata, 1: () => constructors.Fermata }),
	],
};

const shared943: Descriptor = { type: 'label', label: 'fermatas', value: shared942 };

const shared944: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Ending;
	},
};

const shared945: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Repeat;
	},
};

const shared946: Record<string, Descriptor> = { id: shared140, 'member-of': shared6, number: shared6, type: shared476 };

const shared947: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Feature;
	},
};

const shared948: Descriptor = { type: 'label', label: 'features', value: shared947 };

const shared949: Descriptor = { type: 'choices', choices: ['yes', shared1] };

const shared950: Descriptor = { type: 'constant', value: '' };

const shared951: Descriptor = { type: 'not', include: shared949, exclude: shared950 };

const shared952: Descriptor = { type: 'optional', value: shared951 };

const shared953: Record<string, Descriptor> = {
	id: shared140,
	implicit: shared78,
	'non-controller': shared78,
	'non-controlling': shared78,
	number: shared2,
	text: shared952,
	width: shared66,
};

const shared954: Descriptor = {
	type: 'choices',
	choices: withElements([null, null, null, null, null, null, null, null, null, null, null, null, null, null], {
		0: () => constructors.Note,
		1: () => constructors.Backup,
		2: () => constructors.Forward,
		3: () => constructors.Direction,
		4: () => constructors.Attributes,
		5: () => constructors.Harmony,
		6: () => constructors.FiguredBass,
		7: () => constructors.Print,
		8: () => constructors.Sound,
		9: () => constructors.Listening,
		10: () => constructors.Barline,
		11: () => constructors.Grouping,
		12: () => constructors.Link,
		13: () => constructors.Bookmark,
	}),
};

const shared955: Descriptor = { type: 'zeroOrMore', value: shared954 };

const shared956: Descriptor = { type: 'label', label: 'values', value: shared955 };

const shared957: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.MeasurePartwise;
	},
};

const shared958: Descriptor = { type: 'label', label: 'measures', value: shared957 };

const shared959: Descriptor = { type: 'constant', value: '4.0' };

const shared960: Record<string, Descriptor> = { version: shared959 };

const shared961: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Work;
	},
};

const shared962: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MovementNumber;
	},
};

const shared963: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.MovementTitle;
	},
};

const shared964: Descriptor = {
	type: 'optional',
	get value() {
		return constructors.Defaults;
	},
};

const shared965: Descriptor = {
	type: 'zeroOrMore',
	get value() {
		return constructors.Credit;
	},
};

const shared966: Descriptor = { type: 'label', label: 'credits', value: shared965 };

const shared967: Descriptor = {
	type: 'required',
	get value() {
		return constructors.PartList;
	},
};

const shared968: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.PartPartwise;
	},
};

const shared969: Descriptor = { type: 'label', label: 'parts', value: shared968 };

const shared970: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.PartTimewise;
	},
};

const shared971: Descriptor = { type: 'label', label: 'parts', value: shared970 };

const shared972: Descriptor = {
	type: 'oneOrMore',
	get value() {
		return constructors.MeasureTimewise;
	},
};

const shared973: Descriptor = { type: 'label', label: 'measures', value: shared972 };

export const schema: {
	WorkNumber: XMLElementSchema<'work-number'>;
	WorkTitle: XMLElementSchema<'work-title'>;
	Opus: XMLElementSchema<'opus'>;
	Work: XMLElementSchema<'work'>;
	MovementNumber: XMLElementSchema<'movement-number'>;
	MovementTitle: XMLElementSchema<'movement-title'>;
	Creator: XMLElementSchema<'creator'>;
	Rights: XMLElementSchema<'rights'>;
	EncodingDate: XMLElementSchema<'encoding-date'>;
	Encoder: XMLElementSchema<'encoder'>;
	Software: XMLElementSchema<'software'>;
	EncodingDescription: XMLElementSchema<'encoding-description'>;
	Supports: XMLElementSchema<'supports'>;
	Encoding: XMLElementSchema<'encoding'>;
	Source: XMLElementSchema<'source'>;
	Relation: XMLElementSchema<'relation'>;
	MiscellaneousField: XMLElementSchema<'miscellaneous-field'>;
	Miscellaneous: XMLElementSchema<'miscellaneous'>;
	Identification: XMLElementSchema<'identification'>;
	Millimeters: XMLElementSchema<'millimeters'>;
	Tenths: XMLElementSchema<'tenths'>;
	Scaling: XMLElementSchema<'scaling'>;
	ConcertScore: XMLElementSchema<'concert-score'>;
	PageHeight: XMLElementSchema<'page-height'>;
	PageWidth: XMLElementSchema<'page-width'>;
	LeftMargin: XMLElementSchema<'left-margin'>;
	RightMargin: XMLElementSchema<'right-margin'>;
	TopMargin: XMLElementSchema<'top-margin'>;
	BottomMargin: XMLElementSchema<'bottom-margin'>;
	PageMargins: XMLElementSchema<'page-margins'>;
	PageLayout: XMLElementSchema<'page-layout'>;
	SystemMargins: XMLElementSchema<'system-margins'>;
	SystemDistance: XMLElementSchema<'system-distance'>;
	TopSystemDistance: XMLElementSchema<'top-system-distance'>;
	LeftDivider: XMLElementSchema<'left-divider'>;
	RightDivider: XMLElementSchema<'right-divider'>;
	SystemDividers: XMLElementSchema<'system-dividers'>;
	SystemLayout: XMLElementSchema<'system-layout'>;
	StaffDistance: XMLElementSchema<'staff-distance'>;
	StaffLayout: XMLElementSchema<'staff-layout'>;
	LineWidth: XMLElementSchema<'line-width'>;
	NoteSize: XMLElementSchema<'note-size'>;
	Distance: XMLElementSchema<'distance'>;
	Glyph: XMLElementSchema<'glyph'>;
	OtherAppearance: XMLElementSchema<'other-appearance'>;
	Appearance: XMLElementSchema<'appearance'>;
	MusicFont: XMLElementSchema<'music-font'>;
	WordFont: XMLElementSchema<'word-font'>;
	LyricFont: XMLElementSchema<'lyric-font'>;
	LyricLanguage: XMLElementSchema<'lyric-language'>;
	Defaults: XMLElementSchema<'defaults'>;
	CreditType: XMLElementSchema<'credit-type'>;
	Link: XMLElementSchema<'link'>;
	Bookmark: XMLElementSchema<'bookmark'>;
	CreditImage: XMLElementSchema<'credit-image'>;
	CreditWords: XMLElementSchema<'credit-words'>;
	CreditSymbol: XMLElementSchema<'credit-symbol'>;
	Credit: XMLElementSchema<'credit'>;
	GroupName: XMLElementSchema<'group-name'>;
	DisplayText: XMLElementSchema<'display-text'>;
	AccidentalText: XMLElementSchema<'accidental-text'>;
	GroupNameDisplay: XMLElementSchema<'group-name-display'>;
	GroupAbbreviation: XMLElementSchema<'group-abbreviation'>;
	GroupAbbreviationDisplay: XMLElementSchema<'group-abbreviation-display'>;
	GroupSymbol: XMLElementSchema<'group-symbol'>;
	GroupBarline: XMLElementSchema<'group-barline'>;
	GroupTime: XMLElementSchema<'group-time'>;
	Footnote: XMLElementSchema<'footnote'>;
	Level: XMLElementSchema<'level'>;
	PartGroup: XMLElementSchema<'part-group'>;
	InstrumentLink: XMLElementSchema<'instrument-link'>;
	GroupLink: XMLElementSchema<'group-link'>;
	PartLink: XMLElementSchema<'part-link'>;
	PartName: XMLElementSchema<'part-name'>;
	PartNameDisplay: XMLElementSchema<'part-name-display'>;
	PartAbbreviation: XMLElementSchema<'part-abbreviation'>;
	PartAbbreviationDisplay: XMLElementSchema<'part-abbreviation-display'>;
	Group: XMLElementSchema<'group'>;
	InstrumentName: XMLElementSchema<'instrument-name'>;
	InstrumentAbbreviation: XMLElementSchema<'instrument-abbreviation'>;
	InstrumentSound: XMLElementSchema<'instrument-sound'>;
	Solo: XMLElementSchema<'solo'>;
	Ensemble: XMLElementSchema<'ensemble'>;
	VirtualLibrary: XMLElementSchema<'virtual-library'>;
	VirtualName: XMLElementSchema<'virtual-name'>;
	VirtualInstrument: XMLElementSchema<'virtual-instrument'>;
	ScoreInstrument: XMLElementSchema<'score-instrument'>;
	PlayerName: XMLElementSchema<'player-name'>;
	Player: XMLElementSchema<'player'>;
	MidiDevice: XMLElementSchema<'midi-device'>;
	MidiChannel: XMLElementSchema<'midi-channel'>;
	MidiName: XMLElementSchema<'midi-name'>;
	MidiBank: XMLElementSchema<'midi-bank'>;
	MidiProgram: XMLElementSchema<'midi-program'>;
	MidiUnpitched: XMLElementSchema<'midi-unpitched'>;
	Volume: XMLElementSchema<'volume'>;
	Pan: XMLElementSchema<'pan'>;
	Elevation: XMLElementSchema<'elevation'>;
	MidiInstrument: XMLElementSchema<'midi-instrument'>;
	ScorePart: XMLElementSchema<'score-part'>;
	PartList: XMLElementSchema<'part-list'>;
	Chord: XMLElementSchema<'chord'>;
	Step: XMLElementSchema<'step'>;
	Alter: XMLElementSchema<'alter'>;
	Octave: XMLElementSchema<'octave'>;
	Pitch: XMLElementSchema<'pitch'>;
	DisplayStep: XMLElementSchema<'display-step'>;
	DisplayOctave: XMLElementSchema<'display-octave'>;
	Unpitched: XMLElementSchema<'unpitched'>;
	Rest: XMLElementSchema<'rest'>;
	Duration: XMLElementSchema<'duration'>;
	Tie: XMLElementSchema<'tie'>;
	Cue: XMLElementSchema<'cue'>;
	Grace: XMLElementSchema<'grace'>;
	Instrument: XMLElementSchema<'instrument'>;
	Voice: XMLElementSchema<'voice'>;
	Type: XMLElementSchema<'type'>;
	Dot: XMLElementSchema<'dot'>;
	Accidental: XMLElementSchema<'accidental'>;
	ActualNotes: XMLElementSchema<'actual-notes'>;
	NormalNotes: XMLElementSchema<'normal-notes'>;
	NormalType: XMLElementSchema<'normal-type'>;
	NormalDot: XMLElementSchema<'normal-dot'>;
	TimeModification: XMLElementSchema<'time-modification'>;
	Stem: XMLElementSchema<'stem'>;
	Notehead: XMLElementSchema<'notehead'>;
	NoteheadText: XMLElementSchema<'notehead-text'>;
	Staff: XMLElementSchema<'staff'>;
	Beam: XMLElementSchema<'beam'>;
	Tied: XMLElementSchema<'tied'>;
	Slur: XMLElementSchema<'slur'>;
	TupletNumber: XMLElementSchema<'tuplet-number'>;
	TupletType: XMLElementSchema<'tuplet-type'>;
	TupletDot: XMLElementSchema<'tuplet-dot'>;
	TupletActual: XMLElementSchema<'tuplet-actual'>;
	TupletNormal: XMLElementSchema<'tuplet-normal'>;
	Tuplet: XMLElementSchema<'tuplet'>;
	Glissando: XMLElementSchema<'glissando'>;
	Slide: XMLElementSchema<'slide'>;
	TrillMark: XMLElementSchema<'trill-mark'>;
	Turn: XMLElementSchema<'turn'>;
	DelayedTurn: XMLElementSchema<'delayed-turn'>;
	InvertedTurn: XMLElementSchema<'inverted-turn'>;
	DelayedInvertedTurn: XMLElementSchema<'delayed-inverted-turn'>;
	VerticalTurn: XMLElementSchema<'vertical-turn'>;
	InvertedVerticalTurn: XMLElementSchema<'inverted-vertical-turn'>;
	Shake: XMLElementSchema<'shake'>;
	WavyLine: XMLElementSchema<'wavy-line'>;
	Mordent: XMLElementSchema<'mordent'>;
	InvertedMordent: XMLElementSchema<'inverted-mordent'>;
	Schleifer: XMLElementSchema<'schleifer'>;
	Tremolo: XMLElementSchema<'tremolo'>;
	Haydn: XMLElementSchema<'haydn'>;
	OtherOrnament: XMLElementSchema<'other-ornament'>;
	AccidentalMark: XMLElementSchema<'accidental-mark'>;
	Ornaments: XMLElementSchema<'ornaments'>;
	UpBow: XMLElementSchema<'up-bow'>;
	DownBow: XMLElementSchema<'down-bow'>;
	Natural: XMLElementSchema<'natural'>;
	Artificial: XMLElementSchema<'artificial'>;
	BasePitch: XMLElementSchema<'base-pitch'>;
	TouchingPitch: XMLElementSchema<'touching-pitch'>;
	SoundingPitch: XMLElementSchema<'sounding-pitch'>;
	Harmonic: XMLElementSchema<'harmonic'>;
	OpenString: XMLElementSchema<'open-string'>;
	ThumbPosition: XMLElementSchema<'thumb-position'>;
	Fingering: XMLElementSchema<'fingering'>;
	Pluck: XMLElementSchema<'pluck'>;
	DoubleTongue: XMLElementSchema<'double-tongue'>;
	TripleTongue: XMLElementSchema<'triple-tongue'>;
	Stopped: XMLElementSchema<'stopped'>;
	SnapPizzicato: XMLElementSchema<'snap-pizzicato'>;
	Fret: XMLElementSchema<'fret'>;
	String: XMLElementSchema<'string'>;
	HammerOn: XMLElementSchema<'hammer-on'>;
	PullOff: XMLElementSchema<'pull-off'>;
	BendAlter: XMLElementSchema<'bend-alter'>;
	PreBend: XMLElementSchema<'pre-bend'>;
	Release: XMLElementSchema<'release'>;
	WithBar: XMLElementSchema<'with-bar'>;
	Bend: XMLElementSchema<'bend'>;
	Tap: XMLElementSchema<'tap'>;
	Heel: XMLElementSchema<'heel'>;
	Toe: XMLElementSchema<'toe'>;
	Fingernails: XMLElementSchema<'fingernails'>;
	HoleType: XMLElementSchema<'hole-type'>;
	HoleClosed: XMLElementSchema<'hole-closed'>;
	HoleShape: XMLElementSchema<'hole-shape'>;
	Hole: XMLElementSchema<'hole'>;
	ArrowDirection: XMLElementSchema<'arrow-direction'>;
	ArrowStyle: XMLElementSchema<'arrow-style'>;
	Arrowhead: XMLElementSchema<'arrowhead'>;
	CircularArrow: XMLElementSchema<'circular-arrow'>;
	Arrow: XMLElementSchema<'arrow'>;
	Handbell: XMLElementSchema<'handbell'>;
	BrassBend: XMLElementSchema<'brass-bend'>;
	Flip: XMLElementSchema<'flip'>;
	Smear: XMLElementSchema<'smear'>;
	Open: XMLElementSchema<'open'>;
	HalfMuted: XMLElementSchema<'half-muted'>;
	HarmonClosed: XMLElementSchema<'harmon-closed'>;
	HarmonMute: XMLElementSchema<'harmon-mute'>;
	Golpe: XMLElementSchema<'golpe'>;
	OtherTechnical: XMLElementSchema<'other-technical'>;
	Technical: XMLElementSchema<'technical'>;
	Accent: XMLElementSchema<'accent'>;
	StrongAccent: XMLElementSchema<'strong-accent'>;
	Staccato: XMLElementSchema<'staccato'>;
	Tenuto: XMLElementSchema<'tenuto'>;
	DetachedLegato: XMLElementSchema<'detached-legato'>;
	Staccatissimo: XMLElementSchema<'staccatissimo'>;
	Spiccato: XMLElementSchema<'spiccato'>;
	Scoop: XMLElementSchema<'scoop'>;
	Plop: XMLElementSchema<'plop'>;
	Doit: XMLElementSchema<'doit'>;
	Falloff: XMLElementSchema<'falloff'>;
	BreathMark: XMLElementSchema<'breath-mark'>;
	Caesura: XMLElementSchema<'caesura'>;
	Stress: XMLElementSchema<'stress'>;
	Unstress: XMLElementSchema<'unstress'>;
	SoftAccent: XMLElementSchema<'soft-accent'>;
	OtherArticulation: XMLElementSchema<'other-articulation'>;
	Articulations: XMLElementSchema<'articulations'>;
	P: XMLElementSchema<'p'>;
	Pp: XMLElementSchema<'pp'>;
	Ppp: XMLElementSchema<'ppp'>;
	Pppp: XMLElementSchema<'pppp'>;
	Ppppp: XMLElementSchema<'ppppp'>;
	Pppppp: XMLElementSchema<'pppppp'>;
	F: XMLElementSchema<'f'>;
	Ff: XMLElementSchema<'ff'>;
	Fff: XMLElementSchema<'fff'>;
	Ffff: XMLElementSchema<'ffff'>;
	Fffff: XMLElementSchema<'fffff'>;
	Ffffff: XMLElementSchema<'ffffff'>;
	Mp: XMLElementSchema<'mp'>;
	Mf: XMLElementSchema<'mf'>;
	Sf: XMLElementSchema<'sf'>;
	Sfp: XMLElementSchema<'sfp'>;
	Sfpp: XMLElementSchema<'sfpp'>;
	Fp: XMLElementSchema<'fp'>;
	Rf: XMLElementSchema<'rf'>;
	Rfz: XMLElementSchema<'rfz'>;
	Sfz: XMLElementSchema<'sfz'>;
	Sffz: XMLElementSchema<'sffz'>;
	Fz: XMLElementSchema<'fz'>;
	N: XMLElementSchema<'n'>;
	Pf: XMLElementSchema<'pf'>;
	Sfzp: XMLElementSchema<'sfzp'>;
	OtherDynamics: XMLElementSchema<'other-dynamics'>;
	Dynamics: XMLElementSchema<'dynamics'>;
	Fermata: XMLElementSchema<'fermata'>;
	Arpeggiate: XMLElementSchema<'arpeggiate'>;
	NonArpeggiate: XMLElementSchema<'non-arpeggiate'>;
	OtherNotation: XMLElementSchema<'other-notation'>;
	Notations: XMLElementSchema<'notations'>;
	Syllabic: XMLElementSchema<'syllabic'>;
	Text: XMLElementSchema<'text'>;
	Elision: XMLElementSchema<'elision'>;
	Extend: XMLElementSchema<'extend'>;
	Laughing: XMLElementSchema<'laughing'>;
	Humming: XMLElementSchema<'humming'>;
	EndLine: XMLElementSchema<'end-line'>;
	EndParagraph: XMLElementSchema<'end-paragraph'>;
	Lyric: XMLElementSchema<'lyric'>;
	Ipa: XMLElementSchema<'ipa'>;
	Mute: XMLElementSchema<'mute'>;
	SemiPitched: XMLElementSchema<'semi-pitched'>;
	OtherPlay: XMLElementSchema<'other-play'>;
	Play: XMLElementSchema<'play'>;
	Assess: XMLElementSchema<'assess'>;
	Wait: XMLElementSchema<'wait'>;
	OtherListen: XMLElementSchema<'other-listen'>;
	Listen: XMLElementSchema<'listen'>;
	Note: XMLElementSchema<'note'>;
	Backup: XMLElementSchema<'backup'>;
	Forward: XMLElementSchema<'forward'>;
	Rehearsal: XMLElementSchema<'rehearsal'>;
	Segno: XMLElementSchema<'segno'>;
	Coda: XMLElementSchema<'coda'>;
	Words: XMLElementSchema<'words'>;
	Symbol: XMLElementSchema<'symbol'>;
	Wedge: XMLElementSchema<'wedge'>;
	Dashes: XMLElementSchema<'dashes'>;
	Bracket: XMLElementSchema<'bracket'>;
	Pedal: XMLElementSchema<'pedal'>;
	BeatUnit: XMLElementSchema<'beat-unit'>;
	BeatUnitDot: XMLElementSchema<'beat-unit-dot'>;
	BeatUnitTied: XMLElementSchema<'beat-unit-tied'>;
	PerMinute: XMLElementSchema<'per-minute'>;
	MetronomeArrows: XMLElementSchema<'metronome-arrows'>;
	MetronomeType: XMLElementSchema<'metronome-type'>;
	MetronomeDot: XMLElementSchema<'metronome-dot'>;
	MetronomeBeam: XMLElementSchema<'metronome-beam'>;
	MetronomeTied: XMLElementSchema<'metronome-tied'>;
	MetronomeTuplet: XMLElementSchema<'metronome-tuplet'>;
	MetronomeNote: XMLElementSchema<'metronome-note'>;
	MetronomeRelation: XMLElementSchema<'metronome-relation'>;
	Metronome: XMLElementSchema<'metronome'>;
	OctaveShift: XMLElementSchema<'octave-shift'>;
	PedalStep: XMLElementSchema<'pedal-step'>;
	PedalAlter: XMLElementSchema<'pedal-alter'>;
	PedalTuning: XMLElementSchema<'pedal-tuning'>;
	HarpPedals: XMLElementSchema<'harp-pedals'>;
	Damp: XMLElementSchema<'damp'>;
	DampAll: XMLElementSchema<'damp-all'>;
	Eyeglasses: XMLElementSchema<'eyeglasses'>;
	StringMute: XMLElementSchema<'string-mute'>;
	TuningStep: XMLElementSchema<'tuning-step'>;
	TuningAlter: XMLElementSchema<'tuning-alter'>;
	TuningOctave: XMLElementSchema<'tuning-octave'>;
	Accord: XMLElementSchema<'accord'>;
	Scordatura: XMLElementSchema<'scordatura'>;
	Image: XMLElementSchema<'image'>;
	PrincipalVoice: XMLElementSchema<'principal-voice'>;
	Glass: XMLElementSchema<'glass'>;
	Metal: XMLElementSchema<'metal'>;
	Wood: XMLElementSchema<'wood'>;
	Pitched: XMLElementSchema<'pitched'>;
	Membrane: XMLElementSchema<'membrane'>;
	Effect: XMLElementSchema<'effect'>;
	Timpani: XMLElementSchema<'timpani'>;
	Beater: XMLElementSchema<'beater'>;
	StickType: XMLElementSchema<'stick-type'>;
	StickMaterial: XMLElementSchema<'stick-material'>;
	Stick: XMLElementSchema<'stick'>;
	StickLocation: XMLElementSchema<'stick-location'>;
	OtherPercussion: XMLElementSchema<'other-percussion'>;
	Percussion: XMLElementSchema<'percussion'>;
	AccordionHigh: XMLElementSchema<'accordion-high'>;
	AccordionMiddle: XMLElementSchema<'accordion-middle'>;
	AccordionLow: XMLElementSchema<'accordion-low'>;
	AccordionRegistration: XMLElementSchema<'accordion-registration'>;
	StaffDivide: XMLElementSchema<'staff-divide'>;
	OtherDirection: XMLElementSchema<'other-direction'>;
	DirectionType: XMLElementSchema<'direction-type'>;
	Offset: XMLElementSchema<'offset'>;
	InstrumentChange: XMLElementSchema<'instrument-change'>;
	Straight: XMLElementSchema<'straight'>;
	First: XMLElementSchema<'first'>;
	Second: XMLElementSchema<'second'>;
	SwingType: XMLElementSchema<'swing-type'>;
	SwingStyle: XMLElementSchema<'swing-style'>;
	Swing: XMLElementSchema<'swing'>;
	Sound: XMLElementSchema<'sound'>;
	Sync: XMLElementSchema<'sync'>;
	OtherListening: XMLElementSchema<'other-listening'>;
	Listening: XMLElementSchema<'listening'>;
	Direction: XMLElementSchema<'direction'>;
	Divisions: XMLElementSchema<'divisions'>;
	Cancel: XMLElementSchema<'cancel'>;
	Fifths: XMLElementSchema<'fifths'>;
	Mode: XMLElementSchema<'mode'>;
	KeyStep: XMLElementSchema<'key-step'>;
	KeyAlter: XMLElementSchema<'key-alter'>;
	KeyAccidental: XMLElementSchema<'key-accidental'>;
	KeyOctave: XMLElementSchema<'key-octave'>;
	Key: XMLElementSchema<'key'>;
	Beats: XMLElementSchema<'beats'>;
	BeatType: XMLElementSchema<'beat-type'>;
	TimeRelation: XMLElementSchema<'time-relation'>;
	Interchangeable: XMLElementSchema<'interchangeable'>;
	SenzaMisura: XMLElementSchema<'senza-misura'>;
	Time: XMLElementSchema<'time'>;
	Staves: XMLElementSchema<'staves'>;
	PartSymbol: XMLElementSchema<'part-symbol'>;
	Instruments: XMLElementSchema<'instruments'>;
	Sign: XMLElementSchema<'sign'>;
	Line: XMLElementSchema<'line'>;
	ClefOctaveChange: XMLElementSchema<'clef-octave-change'>;
	Clef: XMLElementSchema<'clef'>;
	StaffType: XMLElementSchema<'staff-type'>;
	StaffLines: XMLElementSchema<'staff-lines'>;
	LineDetail: XMLElementSchema<'line-detail'>;
	StaffTuning: XMLElementSchema<'staff-tuning'>;
	Capo: XMLElementSchema<'capo'>;
	StaffSize: XMLElementSchema<'staff-size'>;
	StaffDetails: XMLElementSchema<'staff-details'>;
	Diatonic: XMLElementSchema<'diatonic'>;
	Chromatic: XMLElementSchema<'chromatic'>;
	OctaveChange: XMLElementSchema<'octave-change'>;
	Double: XMLElementSchema<'double'>;
	Transpose: XMLElementSchema<'transpose'>;
	PartClef: XMLElementSchema<'part-clef'>;
	PartTranspose: XMLElementSchema<'part-transpose'>;
	ForPart: XMLElementSchema<'for-part'>;
	Directive: XMLElementSchema<'directive'>;
	MultipleRest: XMLElementSchema<'multiple-rest'>;
	MeasureRepeat: XMLElementSchema<'measure-repeat'>;
	SlashType: XMLElementSchema<'slash-type'>;
	SlashDot: XMLElementSchema<'slash-dot'>;
	ExceptVoice: XMLElementSchema<'except-voice'>;
	BeatRepeat: XMLElementSchema<'beat-repeat'>;
	Slash: XMLElementSchema<'slash'>;
	MeasureStyle: XMLElementSchema<'measure-style'>;
	Attributes: XMLElementSchema<'attributes'>;
	RootStep: XMLElementSchema<'root-step'>;
	RootAlter: XMLElementSchema<'root-alter'>;
	Root: XMLElementSchema<'root'>;
	NumeralRoot: XMLElementSchema<'numeral-root'>;
	NumeralAlter: XMLElementSchema<'numeral-alter'>;
	NumeralFifths: XMLElementSchema<'numeral-fifths'>;
	NumeralMode: XMLElementSchema<'numeral-mode'>;
	NumeralKey: XMLElementSchema<'numeral-key'>;
	Numeral: XMLElementSchema<'numeral'>;
	Function: XMLElementSchema<'function'>;
	Kind: XMLElementSchema<'kind'>;
	Inversion: XMLElementSchema<'inversion'>;
	BassSeparator: XMLElementSchema<'bass-separator'>;
	BassStep: XMLElementSchema<'bass-step'>;
	BassAlter: XMLElementSchema<'bass-alter'>;
	Bass: XMLElementSchema<'bass'>;
	DegreeValue: XMLElementSchema<'degree-value'>;
	DegreeAlter: XMLElementSchema<'degree-alter'>;
	DegreeType: XMLElementSchema<'degree-type'>;
	Degree: XMLElementSchema<'degree'>;
	FrameStrings: XMLElementSchema<'frame-strings'>;
	FrameFrets: XMLElementSchema<'frame-frets'>;
	FirstFret: XMLElementSchema<'first-fret'>;
	Barre: XMLElementSchema<'barre'>;
	FrameNote: XMLElementSchema<'frame-note'>;
	Frame: XMLElementSchema<'frame'>;
	Harmony: XMLElementSchema<'harmony'>;
	Prefix: XMLElementSchema<'prefix'>;
	FigureNumber: XMLElementSchema<'figure-number'>;
	Suffix: XMLElementSchema<'suffix'>;
	Figure: XMLElementSchema<'figure'>;
	FiguredBass: XMLElementSchema<'figured-bass'>;
	MeasureDistance: XMLElementSchema<'measure-distance'>;
	MeasureLayout: XMLElementSchema<'measure-layout'>;
	MeasureNumbering: XMLElementSchema<'measure-numbering'>;
	Print: XMLElementSchema<'print'>;
	BarStyle: XMLElementSchema<'bar-style'>;
	Ending: XMLElementSchema<'ending'>;
	Repeat: XMLElementSchema<'repeat'>;
	Barline: XMLElementSchema<'barline'>;
	Feature: XMLElementSchema<'feature'>;
	Grouping: XMLElementSchema<'grouping'>;
	MeasurePartwise: XMLElementSchema<'measure'>;
	PartPartwise: XMLElementSchema<'part'>;
	ScorePartwise: XMLElementSchema<'score-partwise'>;
	PartTimewise: XMLElementSchema<'part'>;
	MeasureTimewise: XMLElementSchema<'measure'>;
	ScoreTimewise: XMLElementSchema<'score-timewise'>;
} = {
	WorkNumber: { name: 'work-number', attributes: shared0, contents: [shared3] },
	WorkTitle: { name: 'work-title', attributes: shared0, contents: [shared3] },
	Opus: { name: 'opus', attributes: shared11, contents: [] },
	Work: { name: 'work', attributes: shared0, contents: [shared12, shared13, shared14] },
	MovementNumber: { name: 'movement-number', attributes: shared0, contents: [shared3] },
	MovementTitle: { name: 'movement-title', attributes: shared0, contents: [shared3] },
	Creator: { name: 'creator', attributes: shared15, contents: [shared3] },
	Rights: { name: 'rights', attributes: shared15, contents: [shared3] },
	EncodingDate: { name: 'encoding-date', attributes: shared0, contents: [shared18] },
	Encoder: { name: 'encoder', attributes: shared15, contents: [shared3] },
	Software: { name: 'software', attributes: shared0, contents: [shared3] },
	EncodingDescription: { name: 'encoding-description', attributes: shared0, contents: [shared3] },
	Supports: { name: 'supports', attributes: shared21, contents: [] },
	Encoding: { name: 'encoding', attributes: shared0, contents: [shared28] },
	Source: { name: 'source', attributes: shared0, contents: [shared29] },
	Relation: { name: 'relation', attributes: shared15, contents: [shared3] },
	MiscellaneousField: { name: 'miscellaneous-field', attributes: shared30, contents: [shared3] },
	Miscellaneous: { name: 'miscellaneous', attributes: shared0, contents: [shared32] },
	Identification: {
		name: 'identification',
		attributes: shared0,
		contents: [shared34, shared36, shared37, shared38, shared40, shared41],
	},
	Millimeters: { name: 'millimeters', attributes: shared0, contents: [shared44] },
	Tenths: { name: 'tenths', attributes: shared0, contents: [shared45] },
	Scaling: { name: 'scaling', attributes: shared0, contents: [shared46, shared47] },
	ConcertScore: { name: 'concert-score', attributes: shared0, contents: [] },
	PageHeight: { name: 'page-height', attributes: shared0, contents: [shared48] },
	PageWidth: { name: 'page-width', attributes: shared0, contents: [shared48] },
	LeftMargin: { name: 'left-margin', attributes: shared0, contents: [shared49] },
	RightMargin: { name: 'right-margin', attributes: shared0, contents: [shared48] },
	TopMargin: { name: 'top-margin', attributes: shared0, contents: [shared50] },
	BottomMargin: { name: 'bottom-margin', attributes: shared0, contents: [shared51] },
	PageMargins: { name: 'page-margins', attributes: shared54, contents: [shared55, shared56, shared57, shared58] },
	PageLayout: { name: 'page-layout', attributes: shared0, contents: [shared59, shared60, shared62] },
	SystemMargins: { name: 'system-margins', attributes: shared0, contents: [shared55, shared56] },
	SystemDistance: { name: 'system-distance', attributes: shared0, contents: [shared63] },
	TopSystemDistance: { name: 'top-system-distance', attributes: shared0, contents: [shared48] },
	LeftDivider: { name: 'left-divider', attributes: shared81, contents: [] },
	RightDivider: { name: 'right-divider', attributes: shared81, contents: [] },
	SystemDividers: { name: 'system-dividers', attributes: shared0, contents: [shared82, shared83] },
	SystemLayout: { name: 'system-layout', attributes: shared0, contents: [shared84, shared85, shared86, shared87] },
	StaffDistance: { name: 'staff-distance', attributes: shared0, contents: [shared48] },
	StaffLayout: { name: 'staff-layout', attributes: shared90, contents: [shared91] },
	LineWidth: { name: 'line-width', attributes: shared94, contents: [shared95] },
	NoteSize: { name: 'note-size', attributes: shared98, contents: [shared101] },
	Distance: { name: 'distance', attributes: shared104, contents: [shared105] },
	Glyph: { name: 'glyph', attributes: shared108, contents: [shared3] },
	OtherAppearance: { name: 'other-appearance', attributes: shared109, contents: [shared3] },
	Appearance: {
		name: 'appearance',
		attributes: shared0,
		contents: [shared111, shared113, shared115, shared117, shared119],
	},
	MusicFont: { name: 'music-font', attributes: shared120, contents: [] },
	WordFont: { name: 'word-font', attributes: shared120, contents: [] },
	LyricFont: { name: 'lyric-font', attributes: shared121, contents: [] },
	LyricLanguage: { name: 'lyric-language', attributes: shared122, contents: [] },
	Defaults: {
		name: 'defaults',
		attributes: shared0,
		contents: [
			shared123,
			shared124,
			shared125,
			shared126,
			shared128,
			shared129,
			shared130,
			shared131,
			shared133,
			shared135,
		],
	},
	CreditType: { name: 'credit-type', attributes: shared0, contents: [shared3] },
	Link: { name: 'link', attributes: shared136, contents: [] },
	Bookmark: { name: 'bookmark', attributes: shared139, contents: [] },
	CreditImage: { name: 'credit-image', attributes: shared143, contents: [] },
	CreditWords: { name: 'credit-words', attributes: shared157, contents: [shared3] },
	CreditSymbol: { name: 'credit-symbol', attributes: shared158, contents: [shared3] },
	Credit: { name: 'credit', attributes: shared159, contents: [shared161, shared163, shared165, shared170] },
	GroupName: { name: 'group-name', attributes: shared171, contents: [shared3] },
	DisplayText: { name: 'display-text', attributes: shared172, contents: [shared29] },
	AccidentalText: { name: 'accidental-text', attributes: shared175, contents: [shared178] },
	GroupNameDisplay: { name: 'group-name-display', attributes: shared179, contents: [shared182] },
	GroupAbbreviation: { name: 'group-abbreviation', attributes: shared171, contents: [shared3] },
	GroupAbbreviationDisplay: { name: 'group-abbreviation-display', attributes: shared179, contents: [shared182] },
	GroupSymbol: { name: 'group-symbol', attributes: shared183, contents: [shared186] },
	GroupBarline: { name: 'group-barline', attributes: shared187, contents: [shared190] },
	GroupTime: { name: 'group-time', attributes: shared0, contents: [] },
	Footnote: { name: 'footnote', attributes: shared172, contents: [shared3] },
	Level: { name: 'level', attributes: shared195, contents: [shared3] },
	PartGroup: {
		name: 'part-group',
		attributes: shared198,
		contents: [shared199, shared200, shared201, shared202, shared203, shared204, shared205, shared206, shared207],
	},
	InstrumentLink: { name: 'instrument-link', attributes: shared208, contents: [] },
	GroupLink: { name: 'group-link', attributes: shared0, contents: [shared3] },
	PartLink: { name: 'part-link', attributes: shared11, contents: [shared210, shared212] },
	PartName: { name: 'part-name', attributes: shared213, contents: [shared3] },
	PartNameDisplay: { name: 'part-name-display', attributes: shared179, contents: [shared182] },
	PartAbbreviation: { name: 'part-abbreviation', attributes: shared213, contents: [shared3] },
	PartAbbreviationDisplay: { name: 'part-abbreviation-display', attributes: shared179, contents: [shared182] },
	Group: { name: 'group', attributes: shared0, contents: [shared3] },
	InstrumentName: { name: 'instrument-name', attributes: shared0, contents: [shared3] },
	InstrumentAbbreviation: { name: 'instrument-abbreviation', attributes: shared0, contents: [shared3] },
	InstrumentSound: { name: 'instrument-sound', attributes: shared0, contents: [shared3] },
	Solo: { name: 'solo', attributes: shared0, contents: [] },
	Ensemble: { name: 'ensemble', attributes: shared0, contents: [shared217] },
	VirtualLibrary: { name: 'virtual-library', attributes: shared0, contents: [shared3] },
	VirtualName: { name: 'virtual-name', attributes: shared0, contents: [shared3] },
	VirtualInstrument: { name: 'virtual-instrument', attributes: shared0, contents: [shared218, shared219] },
	ScoreInstrument: {
		name: 'score-instrument',
		attributes: shared208,
		contents: [shared220, shared221, shared222, shared225, shared226],
	},
	PlayerName: { name: 'player-name', attributes: shared0, contents: [shared3] },
	Player: { name: 'player', attributes: shared208, contents: [shared227] },
	MidiDevice: { name: 'midi-device', attributes: shared231, contents: [shared3] },
	MidiChannel: { name: 'midi-channel', attributes: shared0, contents: [shared233] },
	MidiName: { name: 'midi-name', attributes: shared0, contents: [shared3] },
	MidiBank: { name: 'midi-bank', attributes: shared0, contents: [shared236] },
	MidiProgram: { name: 'midi-program', attributes: shared0, contents: [shared239] },
	MidiUnpitched: { name: 'midi-unpitched', attributes: shared0, contents: [shared239] },
	Volume: { name: 'volume', attributes: shared0, contents: [shared242] },
	Pan: { name: 'pan', attributes: shared0, contents: [shared244] },
	Elevation: { name: 'elevation', attributes: shared0, contents: [shared245] },
	MidiInstrument: {
		name: 'midi-instrument',
		attributes: shared208,
		contents: [shared246, shared247, shared248, shared249, shared250, shared251, shared252, shared253],
	},
	ScorePart: {
		name: 'score-part',
		attributes: shared208,
		contents: [
			shared254,
			shared256,
			shared257,
			shared258,
			shared259,
			shared260,
			shared262,
			shared264,
			shared266,
			shared269,
		],
	},
	PartList: { name: 'part-list', attributes: shared0, contents: [shared271, shared272, shared276] },
	Chord: { name: 'chord', attributes: shared0, contents: [] },
	Step: { name: 'step', attributes: shared0, contents: [shared279] },
	Alter: { name: 'alter', attributes: shared0, contents: [shared280] },
	Octave: { name: 'octave', attributes: shared0, contents: [shared283] },
	Pitch: { name: 'pitch', attributes: shared0, contents: [shared284, shared285, shared286] },
	DisplayStep: { name: 'display-step', attributes: shared0, contents: [shared279] },
	DisplayOctave: { name: 'display-octave', attributes: shared0, contents: [shared283] },
	Unpitched: { name: 'unpitched', attributes: shared0, contents: [shared287, shared288] },
	Rest: { name: 'rest', attributes: shared289, contents: [shared291] },
	Duration: { name: 'duration', attributes: shared0, contents: [shared294] },
	Tie: { name: 'tie', attributes: shared297, contents: [] },
	Cue: { name: 'cue', attributes: shared0, contents: [] },
	Grace: { name: 'grace', attributes: shared299, contents: [] },
	Instrument: { name: 'instrument', attributes: shared208, contents: [] },
	Voice: { name: 'voice', attributes: shared0, contents: [shared3] },
	Type: { name: 'type', attributes: shared300, contents: [shared303] },
	Dot: { name: 'dot', attributes: shared306, contents: [] },
	Accidental: { name: 'accidental', attributes: shared307, contents: [shared178] },
	ActualNotes: { name: 'actual-notes', attributes: shared0, contents: [shared310] },
	NormalNotes: { name: 'normal-notes', attributes: shared0, contents: [shared310] },
	NormalType: { name: 'normal-type', attributes: shared0, contents: [shared303] },
	NormalDot: { name: 'normal-dot', attributes: shared0, contents: [] },
	TimeModification: { name: 'time-modification', attributes: shared0, contents: [shared311, shared312, shared316] },
	Stem: { name: 'stem', attributes: shared183, contents: [shared319] },
	Notehead: { name: 'notehead', attributes: shared320, contents: [shared323] },
	NoteheadText: { name: 'notehead-text', attributes: shared0, contents: [shared327] },
	Staff: { name: 'staff', attributes: shared0, contents: [shared329] },
	Beam: { name: 'beam', attributes: shared334, contents: [shared337] },
	Tied: { name: 'tied', attributes: shared344, contents: [] },
	Slur: { name: 'slur', attributes: shared347, contents: [] },
	TupletNumber: { name: 'tuplet-number', attributes: shared348, contents: [shared310] },
	TupletType: { name: 'tuplet-type', attributes: shared348, contents: [shared303] },
	TupletDot: { name: 'tuplet-dot', attributes: shared348, contents: [] },
	TupletActual: { name: 'tuplet-actual', attributes: shared0, contents: [shared349, shared350, shared352] },
	TupletNormal: { name: 'tuplet-normal', attributes: shared0, contents: [shared349, shared350, shared352] },
	Tuplet: { name: 'tuplet', attributes: shared358, contents: [shared359, shared360] },
	Glissando: { name: 'glissando', attributes: shared361, contents: [shared3] },
	Slide: { name: 'slide', attributes: shared364, contents: [shared3] },
	TrillMark: { name: 'trill-mark', attributes: shared371, contents: [] },
	Turn: { name: 'turn', attributes: shared372, contents: [] },
	DelayedTurn: { name: 'delayed-turn', attributes: shared372, contents: [] },
	InvertedTurn: { name: 'inverted-turn', attributes: shared372, contents: [] },
	DelayedInvertedTurn: { name: 'delayed-inverted-turn', attributes: shared372, contents: [] },
	VerticalTurn: { name: 'vertical-turn', attributes: shared373, contents: [] },
	InvertedVerticalTurn: { name: 'inverted-vertical-turn', attributes: shared373, contents: [] },
	Shake: { name: 'shake', attributes: shared373, contents: [] },
	WavyLine: { name: 'wavy-line', attributes: shared376, contents: [] },
	Mordent: { name: 'mordent', attributes: shared377, contents: [] },
	InvertedMordent: { name: 'inverted-mordent', attributes: shared377, contents: [] },
	Schleifer: { name: 'schleifer', attributes: shared306, contents: [] },
	Tremolo: { name: 'tremolo', attributes: shared380, contents: [shared383] },
	Haydn: { name: 'haydn', attributes: shared373, contents: [] },
	OtherOrnament: { name: 'other-ornament', attributes: shared384, contents: [shared3] },
	AccidentalMark: { name: 'accidental-mark', attributes: shared385, contents: [shared178] },
	Ornaments: { name: 'ornaments', attributes: shared386, contents: [shared389, shared391] },
	UpBow: { name: 'up-bow', attributes: shared306, contents: [] },
	DownBow: { name: 'down-bow', attributes: shared306, contents: [] },
	Natural: { name: 'natural', attributes: shared0, contents: [] },
	Artificial: { name: 'artificial', attributes: shared0, contents: [] },
	BasePitch: { name: 'base-pitch', attributes: shared0, contents: [] },
	TouchingPitch: { name: 'touching-pitch', attributes: shared0, contents: [] },
	SoundingPitch: { name: 'sounding-pitch', attributes: shared0, contents: [] },
	Harmonic: { name: 'harmonic', attributes: shared392, contents: [shared395, shared398] },
	OpenString: { name: 'open-string', attributes: shared306, contents: [] },
	ThumbPosition: { name: 'thumb-position', attributes: shared306, contents: [] },
	Fingering: { name: 'fingering', attributes: shared399, contents: [shared3] },
	Pluck: { name: 'pluck', attributes: shared306, contents: [shared3] },
	DoubleTongue: { name: 'double-tongue', attributes: shared306, contents: [] },
	TripleTongue: { name: 'triple-tongue', attributes: shared306, contents: [] },
	Stopped: { name: 'stopped', attributes: shared384, contents: [] },
	SnapPizzicato: { name: 'snap-pizzicato', attributes: shared306, contents: [] },
	Fret: { name: 'fret', attributes: shared348, contents: [shared310] },
	String: { name: 'string', attributes: shared306, contents: [shared400] },
	HammerOn: { name: 'hammer-on', attributes: shared401, contents: [shared3] },
	PullOff: { name: 'pull-off', attributes: shared401, contents: [shared3] },
	BendAlter: { name: 'bend-alter', attributes: shared0, contents: [shared280] },
	PreBend: { name: 'pre-bend', attributes: shared0, contents: [] },
	Release: { name: 'release', attributes: shared402, contents: [] },
	WithBar: { name: 'with-bar', attributes: shared403, contents: [shared3] },
	Bend: { name: 'bend', attributes: shared406, contents: [shared407, shared410, shared411] },
	Tap: { name: 'tap', attributes: shared414, contents: [shared29] },
	Heel: { name: 'heel', attributes: shared415, contents: [] },
	Toe: { name: 'toe', attributes: shared415, contents: [] },
	Fingernails: { name: 'fingernails', attributes: shared306, contents: [] },
	HoleType: { name: 'hole-type', attributes: shared0, contents: [shared3] },
	HoleClosed: { name: 'hole-closed', attributes: shared418, contents: [shared421] },
	HoleShape: { name: 'hole-shape', attributes: shared0, contents: [shared3] },
	Hole: { name: 'hole', attributes: shared306, contents: [shared422, shared423, shared424] },
	ArrowDirection: { name: 'arrow-direction', attributes: shared0, contents: [shared427] },
	ArrowStyle: { name: 'arrow-style', attributes: shared0, contents: [shared430] },
	Arrowhead: { name: 'arrowhead', attributes: shared0, contents: [] },
	CircularArrow: { name: 'circular-arrow', attributes: shared0, contents: [shared433] },
	Arrow: { name: 'arrow', attributes: shared384, contents: [shared434, shared435, shared436, shared437] },
	Handbell: { name: 'handbell', attributes: shared306, contents: [shared440] },
	BrassBend: { name: 'brass-bend', attributes: shared306, contents: [] },
	Flip: { name: 'flip', attributes: shared306, contents: [] },
	Smear: { name: 'smear', attributes: shared306, contents: [] },
	Open: { name: 'open', attributes: shared384, contents: [] },
	HalfMuted: { name: 'half-muted', attributes: shared384, contents: [] },
	HarmonClosed: { name: 'harmon-closed', attributes: shared418, contents: [shared441] },
	HarmonMute: { name: 'harmon-mute', attributes: shared384, contents: [shared442] },
	Golpe: { name: 'golpe', attributes: shared306, contents: [] },
	OtherTechnical: { name: 'other-technical', attributes: shared384, contents: [shared29] },
	Technical: { name: 'technical', attributes: shared386, contents: [shared445] },
	Accent: { name: 'accent', attributes: shared306, contents: [] },
	StrongAccent: { name: 'strong-accent', attributes: shared448, contents: [] },
	Staccato: { name: 'staccato', attributes: shared306, contents: [] },
	Tenuto: { name: 'tenuto', attributes: shared306, contents: [] },
	DetachedLegato: { name: 'detached-legato', attributes: shared306, contents: [] },
	Staccatissimo: { name: 'staccatissimo', attributes: shared306, contents: [] },
	Spiccato: { name: 'spiccato', attributes: shared306, contents: [] },
	Scoop: { name: 'scoop', attributes: shared451, contents: [] },
	Plop: { name: 'plop', attributes: shared451, contents: [] },
	Doit: { name: 'doit', attributes: shared451, contents: [] },
	Falloff: { name: 'falloff', attributes: shared451, contents: [] },
	BreathMark: { name: 'breath-mark', attributes: shared306, contents: [shared454] },
	Caesura: { name: 'caesura', attributes: shared306, contents: [shared457] },
	Stress: { name: 'stress', attributes: shared306, contents: [] },
	Unstress: { name: 'unstress', attributes: shared306, contents: [] },
	SoftAccent: { name: 'soft-accent', attributes: shared306, contents: [] },
	OtherArticulation: { name: 'other-articulation', attributes: shared384, contents: [shared3] },
	Articulations: { name: 'articulations', attributes: shared386, contents: [shared460] },
	P: { name: 'p', attributes: shared0, contents: [] },
	Pp: { name: 'pp', attributes: shared0, contents: [] },
	Ppp: { name: 'ppp', attributes: shared0, contents: [] },
	Pppp: { name: 'pppp', attributes: shared0, contents: [] },
	Ppppp: { name: 'ppppp', attributes: shared0, contents: [] },
	Pppppp: { name: 'pppppp', attributes: shared0, contents: [] },
	F: { name: 'f', attributes: shared0, contents: [] },
	Ff: { name: 'ff', attributes: shared0, contents: [] },
	Fff: { name: 'fff', attributes: shared0, contents: [] },
	Ffff: { name: 'ffff', attributes: shared0, contents: [] },
	Fffff: { name: 'fffff', attributes: shared0, contents: [] },
	Ffffff: { name: 'ffffff', attributes: shared0, contents: [] },
	Mp: { name: 'mp', attributes: shared0, contents: [] },
	Mf: { name: 'mf', attributes: shared0, contents: [] },
	Sf: { name: 'sf', attributes: shared0, contents: [] },
	Sfp: { name: 'sfp', attributes: shared0, contents: [] },
	Sfpp: { name: 'sfpp', attributes: shared0, contents: [] },
	Fp: { name: 'fp', attributes: shared0, contents: [] },
	Rf: { name: 'rf', attributes: shared0, contents: [] },
	Rfz: { name: 'rfz', attributes: shared0, contents: [] },
	Sfz: { name: 'sfz', attributes: shared0, contents: [] },
	Sffz: { name: 'sffz', attributes: shared0, contents: [] },
	Fz: { name: 'fz', attributes: shared0, contents: [] },
	N: { name: 'n', attributes: shared0, contents: [] },
	Pf: { name: 'pf', attributes: shared0, contents: [] },
	Sfzp: { name: 'sfzp', attributes: shared0, contents: [] },
	OtherDynamics: { name: 'other-dynamics', attributes: shared461, contents: [shared3] },
	Dynamics: { name: 'dynamics', attributes: shared462, contents: [shared465] },
	Fermata: { name: 'fermata', attributes: shared468, contents: [shared471] },
	Arpeggiate: { name: 'arpeggiate', attributes: shared472, contents: [] },
	NonArpeggiate: { name: 'non-arpeggiate', attributes: shared475, contents: [] },
	OtherNotation: { name: 'other-notation', attributes: shared477, contents: [shared3] },
	Notations: { name: 'notations', attributes: shared478, contents: [shared206, shared207, shared481] },
	Syllabic: { name: 'syllabic', attributes: shared0, contents: [shared484] },
	Text: { name: 'text', attributes: shared485, contents: [shared3] },
	Elision: { name: 'elision', attributes: shared488, contents: [shared3] },
	Extend: { name: 'extend', attributes: shared490, contents: [] },
	Laughing: { name: 'laughing', attributes: shared0, contents: [] },
	Humming: { name: 'humming', attributes: shared0, contents: [] },
	EndLine: { name: 'end-line', attributes: shared0, contents: [] },
	EndParagraph: { name: 'end-paragraph', attributes: shared0, contents: [] },
	Lyric: { name: 'lyric', attributes: shared491, contents: [shared500, shared501, shared502, shared206, shared207] },
	Ipa: { name: 'ipa', attributes: shared0, contents: [shared3] },
	Mute: { name: 'mute', attributes: shared0, contents: [shared505] },
	SemiPitched: { name: 'semi-pitched', attributes: shared0, contents: [shared508] },
	OtherPlay: { name: 'other-play', attributes: shared109, contents: [shared3] },
	Play: { name: 'play', attributes: shared386, contents: [shared511] },
	Assess: { name: 'assess', attributes: shared512, contents: [] },
	Wait: { name: 'wait', attributes: shared513, contents: [] },
	OtherListen: { name: 'other-listen', attributes: shared514, contents: [shared3] },
	Listen: { name: 'listen', attributes: shared0, contents: [shared517] },
	Note: {
		name: 'note',
		attributes: shared519,
		contents: [
			shared531,
			shared533,
			shared206,
			shared207,
			shared534,
			shared535,
			shared537,
			shared538,
			shared539,
			shared540,
			shared541,
			shared542,
			shared543,
			shared545,
			shared547,
			shared549,
			shared550,
			shared551,
		],
	},
	Backup: { name: 'backup', attributes: shared0, contents: [shared522, shared206, shared207] },
	Forward: { name: 'forward', attributes: shared0, contents: [shared522, shared206, shared207, shared534, shared543] },
	Rehearsal: { name: 'rehearsal', attributes: shared157, contents: [shared3] },
	Segno: { name: 'segno', attributes: shared554, contents: [] },
	Coda: { name: 'coda', attributes: shared557, contents: [] },
	Words: { name: 'words', attributes: shared157, contents: [shared3] },
	Symbol: { name: 'symbol', attributes: shared158, contents: [shared3] },
	Wedge: { name: 'wedge', attributes: shared560, contents: [] },
	Dashes: { name: 'dashes', attributes: shared561, contents: [] },
	Bracket: { name: 'bracket', attributes: shared564, contents: [] },
	Pedal: { name: 'pedal', attributes: shared567, contents: [] },
	BeatUnit: { name: 'beat-unit', attributes: shared0, contents: [shared303] },
	BeatUnitDot: { name: 'beat-unit-dot', attributes: shared0, contents: [] },
	BeatUnitTied: { name: 'beat-unit-tied', attributes: shared0, contents: [shared568, shared570] },
	PerMinute: { name: 'per-minute', attributes: shared120, contents: [shared3] },
	MetronomeArrows: { name: 'metronome-arrows', attributes: shared0, contents: [] },
	MetronomeType: { name: 'metronome-type', attributes: shared0, contents: [shared303] },
	MetronomeDot: { name: 'metronome-dot', attributes: shared0, contents: [] },
	MetronomeBeam: { name: 'metronome-beam', attributes: shared571, contents: [shared337] },
	MetronomeTied: { name: 'metronome-tied', attributes: shared572, contents: [] },
	MetronomeTuplet: { name: 'metronome-tuplet', attributes: shared573, contents: [shared311, shared312, shared316] },
	MetronomeNote: {
		name: 'metronome-note',
		attributes: shared0,
		contents: [shared574, shared576, shared578, shared579, shared580],
	},
	MetronomeRelation: { name: 'metronome-relation', attributes: shared0, contents: [shared29] },
	Metronome: { name: 'metronome', attributes: shared581, contents: [shared591] },
	OctaveShift: { name: 'octave-shift', attributes: shared594, contents: [] },
	PedalStep: { name: 'pedal-step', attributes: shared0, contents: [shared279] },
	PedalAlter: { name: 'pedal-alter', attributes: shared0, contents: [shared280] },
	PedalTuning: { name: 'pedal-tuning', attributes: shared0, contents: [shared595, shared596] },
	HarpPedals: { name: 'harp-pedals', attributes: shared597, contents: [shared599] },
	Damp: { name: 'damp', attributes: shared597, contents: [] },
	DampAll: { name: 'damp-all', attributes: shared597, contents: [] },
	Eyeglasses: { name: 'eyeglasses', attributes: shared597, contents: [] },
	StringMute: { name: 'string-mute', attributes: shared602, contents: [] },
	TuningStep: { name: 'tuning-step', attributes: shared0, contents: [shared279] },
	TuningAlter: { name: 'tuning-alter', attributes: shared0, contents: [shared280] },
	TuningOctave: { name: 'tuning-octave', attributes: shared0, contents: [shared283] },
	Accord: { name: 'accord', attributes: shared603, contents: [shared604, shared605, shared606] },
	Scordatura: { name: 'scordatura', attributes: shared386, contents: [shared608] },
	Image: { name: 'image', attributes: shared609, contents: [] },
	PrincipalVoice: { name: 'principal-voice', attributes: shared612, contents: [shared3] },
	Glass: { name: 'glass', attributes: shared615, contents: [shared618] },
	Metal: { name: 'metal', attributes: shared615, contents: [shared621] },
	Wood: { name: 'wood', attributes: shared615, contents: [shared624] },
	Pitched: { name: 'pitched', attributes: shared615, contents: [shared627] },
	Membrane: { name: 'membrane', attributes: shared615, contents: [shared630] },
	Effect: { name: 'effect', attributes: shared615, contents: [shared633] },
	Timpani: { name: 'timpani', attributes: shared615, contents: [] },
	Beater: { name: 'beater', attributes: shared636, contents: [shared639] },
	StickType: { name: 'stick-type', attributes: shared0, contents: [shared642] },
	StickMaterial: { name: 'stick-material', attributes: shared0, contents: [shared645] },
	Stick: { name: 'stick', attributes: shared646, contents: [shared647, shared648] },
	StickLocation: { name: 'stick-location', attributes: shared0, contents: [shared651] },
	OtherPercussion: { name: 'other-percussion', attributes: shared461, contents: [shared3] },
	Percussion: { name: 'percussion', attributes: shared652, contents: [shared654] },
	AccordionHigh: { name: 'accordion-high', attributes: shared0, contents: [] },
	AccordionMiddle: { name: 'accordion-middle', attributes: shared0, contents: [shared657] },
	AccordionLow: { name: 'accordion-low', attributes: shared0, contents: [] },
	AccordionRegistration: {
		name: 'accordion-registration',
		attributes: shared597,
		contents: [shared658, shared659, shared660],
	},
	StaffDivide: { name: 'staff-divide', attributes: shared663, contents: [] },
	OtherDirection: { name: 'other-direction', attributes: shared664, contents: [shared3] },
	DirectionType: { name: 'direction-type', attributes: shared386, contents: [shared679] },
	Offset: { name: 'offset', attributes: shared680, contents: [shared48] },
	InstrumentChange: { name: 'instrument-change', attributes: shared208, contents: [shared222, shared225, shared226] },
	Straight: { name: 'straight', attributes: shared0, contents: [] },
	First: { name: 'first', attributes: shared0, contents: [shared681] },
	Second: { name: 'second', attributes: shared0, contents: [shared329] },
	SwingType: { name: 'swing-type', attributes: shared0, contents: [shared684] },
	SwingStyle: { name: 'swing-style', attributes: shared0, contents: [shared3] },
	Swing: { name: 'swing', attributes: shared0, contents: [shared690, shared691] },
	Sound: { name: 'sound', attributes: shared694, contents: [shared699, shared700, shared701] },
	Sync: { name: 'sync', attributes: shared705, contents: [] },
	OtherListening: { name: 'other-listening', attributes: shared514, contents: [shared3] },
	Listening: { name: 'listening', attributes: shared0, contents: [shared708, shared701] },
	Direction: {
		name: 'direction',
		attributes: shared711,
		contents: [shared713, shared701, shared206, shared207, shared534, shared543, shared714, shared715],
	},
	Divisions: { name: 'divisions', attributes: shared0, contents: [shared294] },
	Cancel: { name: 'cancel', attributes: shared718, contents: [shared721] },
	Fifths: { name: 'fifths', attributes: shared0, contents: [shared723] },
	Mode: { name: 'mode', attributes: shared0, contents: [shared726] },
	KeyStep: { name: 'key-step', attributes: shared0, contents: [shared279] },
	KeyAlter: { name: 'key-alter', attributes: shared0, contents: [shared280] },
	KeyAccidental: { name: 'key-accidental', attributes: shared727, contents: [shared178] },
	KeyOctave: { name: 'key-octave', attributes: shared728, contents: [shared283] },
	Key: { name: 'key', attributes: shared729, contents: [shared740, shared742] },
	Beats: { name: 'beats', attributes: shared0, contents: [shared3] },
	BeatType: { name: 'beat-type', attributes: shared0, contents: [shared3] },
	TimeRelation: { name: 'time-relation', attributes: shared0, contents: [shared745] },
	Interchangeable: { name: 'interchangeable', attributes: shared750, contents: [shared751, shared755] },
	SenzaMisura: { name: 'senza-misura', attributes: shared0, contents: [shared3] },
	Time: { name: 'time', attributes: shared756, contents: [shared760] },
	Staves: { name: 'staves', attributes: shared0, contents: [shared310] },
	PartSymbol: { name: 'part-symbol', attributes: shared761, contents: [shared186] },
	Instruments: { name: 'instruments', attributes: shared0, contents: [shared310] },
	Sign: { name: 'sign', attributes: shared0, contents: [shared764] },
	Line: { name: 'line', attributes: shared0, contents: [shared765] },
	ClefOctaveChange: { name: 'clef-octave-change', attributes: shared0, contents: [shared766] },
	Clef: { name: 'clef', attributes: shared767, contents: [shared768, shared769, shared770] },
	StaffType: { name: 'staff-type', attributes: shared0, contents: [shared773] },
	StaffLines: { name: 'staff-lines', attributes: shared0, contents: [shared310] },
	LineDetail: { name: 'line-detail', attributes: shared774, contents: [] },
	StaffTuning: { name: 'staff-tuning', attributes: shared775, contents: [shared604, shared605, shared606] },
	Capo: { name: 'capo', attributes: shared0, contents: [shared310] },
	StaffSize: { name: 'staff-size', attributes: shared776, contents: [shared777] },
	StaffDetails: {
		name: 'staff-details',
		attributes: shared780,
		contents: [shared781, shared785, shared787, shared788, shared789],
	},
	Diatonic: { name: 'diatonic', attributes: shared0, contents: [shared790] },
	Chromatic: { name: 'chromatic', attributes: shared0, contents: [shared280] },
	OctaveChange: { name: 'octave-change', attributes: shared0, contents: [shared791] },
	Double: { name: 'double', attributes: shared792, contents: [] },
	Transpose: { name: 'transpose', attributes: shared793, contents: [shared794, shared795, shared796, shared797] },
	PartClef: { name: 'part-clef', attributes: shared0, contents: [shared768, shared769, shared770] },
	PartTranspose: {
		name: 'part-transpose',
		attributes: shared0,
		contents: [shared794, shared795, shared796, shared797],
	},
	ForPart: { name: 'for-part', attributes: shared793, contents: [shared798, shared799] },
	Directive: { name: 'directive', attributes: shared800, contents: [shared3] },
	MultipleRest: { name: 'multiple-rest', attributes: shared801, contents: [shared802] },
	MeasureRepeat: { name: 'measure-repeat', attributes: shared803, contents: [shared804] },
	SlashType: { name: 'slash-type', attributes: shared0, contents: [shared303] },
	SlashDot: { name: 'slash-dot', attributes: shared0, contents: [] },
	ExceptVoice: { name: 'except-voice', attributes: shared0, contents: [shared3] },
	BeatRepeat: { name: 'beat-repeat', attributes: shared805, contents: [shared811] },
	Slash: { name: 'slash', attributes: shared812, contents: [shared813] },
	MeasureStyle: { name: 'measure-style', attributes: shared814, contents: [shared816] },
	Attributes: {
		name: 'attributes',
		attributes: shared0,
		contents: [
			shared206,
			shared207,
			shared817,
			shared819,
			shared821,
			shared822,
			shared823,
			shared824,
			shared826,
			shared828,
			shared834,
			shared836,
			shared838,
		],
	},
	RootStep: { name: 'root-step', attributes: shared839, contents: [shared279] },
	RootAlter: { name: 'root-alter', attributes: shared840, contents: [shared280] },
	Root: { name: 'root', attributes: shared0, contents: [shared841, shared842] },
	NumeralRoot: { name: 'numeral-root', attributes: shared839, contents: [shared845] },
	NumeralAlter: { name: 'numeral-alter', attributes: shared846, contents: [shared280] },
	NumeralFifths: { name: 'numeral-fifths', attributes: shared0, contents: [shared791] },
	NumeralMode: { name: 'numeral-mode', attributes: shared0, contents: [shared849] },
	NumeralKey: { name: 'numeral-key', attributes: shared179, contents: [shared850, shared851] },
	Numeral: { name: 'numeral', attributes: shared0, contents: [shared852, shared853, shared854] },
	Function: { name: 'function', attributes: shared855, contents: [shared3] },
	Kind: { name: 'kind', attributes: shared856, contents: [shared859] },
	Inversion: { name: 'inversion', attributes: shared839, contents: [shared860] },
	BassSeparator: { name: 'bass-separator', attributes: shared855, contents: [shared3] },
	BassStep: { name: 'bass-step', attributes: shared839, contents: [shared279] },
	BassAlter: { name: 'bass-alter', attributes: shared840, contents: [shared280] },
	Bass: { name: 'bass', attributes: shared863, contents: [shared864, shared865, shared866] },
	DegreeValue: { name: 'degree-value', attributes: shared869, contents: [shared329] },
	DegreeAlter: { name: 'degree-alter', attributes: shared870, contents: [shared280] },
	DegreeType: { name: 'degree-type', attributes: shared839, contents: [shared873] },
	Degree: { name: 'degree', attributes: shared179, contents: [shared874, shared875, shared876] },
	FrameStrings: { name: 'frame-strings', attributes: shared0, contents: [shared877] },
	FrameFrets: { name: 'frame-frets', attributes: shared0, contents: [shared878] },
	FirstFret: { name: 'first-fret', attributes: shared879, contents: [shared880] },
	Barre: { name: 'barre', attributes: shared881, contents: [] },
	FrameNote: { name: 'frame-note', attributes: shared0, contents: [shared882, shared883, shared884, shared885] },
	Frame: { name: 'frame', attributes: shared886, contents: [shared887, shared888, shared889, shared891] },
	Harmony: {
		name: 'harmony',
		attributes: shared894,
		contents: [shared901, shared902, shared701, shared206, shared207, shared543],
	},
	Prefix: { name: 'prefix', attributes: shared855, contents: [shared3] },
	FigureNumber: { name: 'figure-number', attributes: shared855, contents: [shared3] },
	Suffix: { name: 'suffix', attributes: shared855, contents: [shared3] },
	Figure: {
		name: 'figure',
		attributes: shared0,
		contents: [shared903, shared904, shared905, shared497, shared206, shared207],
	},
	FiguredBass: { name: 'figured-bass', attributes: shared906, contents: [shared908, shared909, shared206, shared207] },
	MeasureDistance: { name: 'measure-distance', attributes: shared0, contents: [shared48] },
	MeasureLayout: { name: 'measure-layout', attributes: shared0, contents: [shared910] },
	MeasureNumbering: { name: 'measure-numbering', attributes: shared913, contents: [shared916] },
	Print: {
		name: 'print',
		attributes: shared917,
		contents: [shared125, shared126, shared128, shared918, shared919, shared258, shared260],
	},
	BarStyle: { name: 'bar-style', attributes: shared187, contents: [shared922] },
	Ending: { name: 'ending', attributes: shared927, contents: [shared3] },
	Repeat: { name: 'repeat', attributes: shared932, contents: [] },
	Barline: {
		name: 'barline',
		attributes: shared937,
		contents: [shared938, shared206, shared207, shared939, shared940, shared941, shared943, shared944, shared945],
	},
	Feature: { name: 'feature', attributes: shared15, contents: [shared3] },
	Grouping: { name: 'grouping', attributes: shared946, contents: [shared948] },
	MeasurePartwise: { name: 'measure', attributes: shared953, contents: [shared956] },
	PartPartwise: { name: 'part', attributes: shared208, contents: [shared958] },
	ScorePartwise: {
		name: 'score-partwise',
		attributes: shared960,
		contents: [shared961, shared962, shared963, shared254, shared964, shared966, shared967, shared969],
	},
	PartTimewise: { name: 'part', attributes: shared208, contents: [shared956] },
	MeasureTimewise: { name: 'measure', attributes: shared953, contents: [shared971] },
	ScoreTimewise: {
		name: 'score-timewise',
		attributes: shared960,
		contents: [shared961, shared962, shared963, shared254, shared964, shared966, shared967, shared973],
	},
};
