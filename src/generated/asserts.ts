import * as operations from '../lib/operations';
import * as elements from './elements';

export const isAccent = (value: any): value is elements.Accent => {
  return operations.validate(value, elements.Accent);
};

export const isAccidental = (value: any): value is elements.Accidental => {
  return operations.validate(value, elements.Accidental);
};

export const isAccidentalMark = (value: any): value is elements.AccidentalMark => {
  return operations.validate(value, elements.AccidentalMark);
};

export const isAccidentalText = (value: any): value is elements.AccidentalText => {
  return operations.validate(value, elements.AccidentalText);
};

export const isAccord = (value: any): value is elements.Accord => {
  return operations.validate(value, elements.Accord);
};

export const isAccordionHigh = (value: any): value is elements.AccordionHigh => {
  return operations.validate(value, elements.AccordionHigh);
};

export const isAccordionLow = (value: any): value is elements.AccordionLow => {
  return operations.validate(value, elements.AccordionLow);
};

export const isAccordionMiddle = (value: any): value is elements.AccordionMiddle => {
  return operations.validate(value, elements.AccordionMiddle);
};

export const isAccordionRegistration = (value: any): value is elements.AccordionRegistration => {
  return operations.validate(value, elements.AccordionRegistration);
};

export const isActualNotes = (value: any): value is elements.ActualNotes => {
  return operations.validate(value, elements.ActualNotes);
};

export const isAlter = (value: any): value is elements.Alter => {
  return operations.validate(value, elements.Alter);
};

export const isAlternateKey = (value: any): value is elements.AlternateKey => {
  return operations.validate(value, elements.Key.schema.contents[0]['value']['choices'][1]);
};

export const isAlternateSwing = (value: any): value is elements.AlternateSwing => {
  return operations.validate(value, elements.Swing.schema.contents[0]['value']['choices'][1]);
};

export const isAppearance = (value: any): value is elements.Appearance => {
  return operations.validate(value, elements.Appearance);
};

export const isArpeggiate = (value: any): value is elements.Arpeggiate => {
  return operations.validate(value, elements.Arpeggiate);
};

export const isArrow = (value: any): value is elements.Arrow => {
  return operations.validate(value, elements.Arrow);
};

export const isArrowDirection = (value: any): value is elements.ArrowDirection => {
  return operations.validate(value, elements.ArrowDirection);
};

export const isArrowStyle = (value: any): value is elements.ArrowStyle => {
  return operations.validate(value, elements.ArrowStyle);
};

export const isArrowhead = (value: any): value is elements.Arrowhead => {
  return operations.validate(value, elements.Arrowhead);
};

export const isArticulations = (value: any): value is elements.Articulations => {
  return operations.validate(value, elements.Articulations);
};

export const isArtificial = (value: any): value is elements.Artificial => {
  return operations.validate(value, elements.Artificial);
};

export const isAssess = (value: any): value is elements.Assess => {
  return operations.validate(value, elements.Assess);
};

export const isAttributes = (value: any): value is elements.Attributes => {
  return operations.validate(value, elements.Attributes);
};

export const isBackup = (value: any): value is elements.Backup => {
  return operations.validate(value, elements.Backup);
};

export const isBarStyle = (value: any): value is elements.BarStyle => {
  return operations.validate(value, elements.BarStyle);
};

export const isBarline = (value: any): value is elements.Barline => {
  return operations.validate(value, elements.Barline);
};

export const isBarre = (value: any): value is elements.Barre => {
  return operations.validate(value, elements.Barre);
};

export const isBasePitch = (value: any): value is elements.BasePitch => {
  return operations.validate(value, elements.BasePitch);
};

export const isBass = (value: any): value is elements.Bass => {
  return operations.validate(value, elements.Bass);
};

export const isBassAlter = (value: any): value is elements.BassAlter => {
  return operations.validate(value, elements.BassAlter);
};

export const isBassSeparator = (value: any): value is elements.BassSeparator => {
  return operations.validate(value, elements.BassSeparator);
};

export const isBassStep = (value: any): value is elements.BassStep => {
  return operations.validate(value, elements.BassStep);
};

export const isBeam = (value: any): value is elements.Beam => {
  return operations.validate(value, elements.Beam);
};

export const isBeatRepeat = (value: any): value is elements.BeatRepeat => {
  return operations.validate(value, elements.BeatRepeat);
};

export const isBeatSpec = (value: any): value is elements.BeatSpec => {
  return operations.validate(value, elements.Metronome.schema.contents[0]['value']['choices'][0]);
};

export const isBeatType = (value: any): value is elements.BeatType => {
  return operations.validate(value, elements.BeatType);
};

export const isBeatUnit = (value: any): value is elements.BeatUnit => {
  return operations.validate(value, elements.BeatUnit);
};

export const isBeatUnitDot = (value: any): value is elements.BeatUnitDot => {
  return operations.validate(value, elements.BeatUnitDot);
};

export const isBeatUnitTied = (value: any): value is elements.BeatUnitTied => {
  return operations.validate(value, elements.BeatUnitTied);
};

export const isBeater = (value: any): value is elements.Beater => {
  return operations.validate(value, elements.Beater);
};

export const isBeats = (value: any): value is elements.Beats => {
  return operations.validate(value, elements.Beats);
};

export const isBend = (value: any): value is elements.Bend => {
  return operations.validate(value, elements.Bend);
};

export const isBendAlter = (value: any): value is elements.BendAlter => {
  return operations.validate(value, elements.BendAlter);
};

export const isBookmark = (value: any): value is elements.Bookmark => {
  return operations.validate(value, elements.Bookmark);
};

export const isBottomMargin = (value: any): value is elements.BottomMargin => {
  return operations.validate(value, elements.BottomMargin);
};

export const isBracket = (value: any): value is elements.Bracket => {
  return operations.validate(value, elements.Bracket);
};

export const isBrassBend = (value: any): value is elements.BrassBend => {
  return operations.validate(value, elements.BrassBend);
};

export const isBreathMark = (value: any): value is elements.BreathMark => {
  return operations.validate(value, elements.BreathMark);
};

export const isCaesura = (value: any): value is elements.Caesura => {
  return operations.validate(value, elements.Caesura);
};

export const isCancel = (value: any): value is elements.Cancel => {
  return operations.validate(value, elements.Cancel);
};

export const isCapo = (value: any): value is elements.Capo => {
  return operations.validate(value, elements.Capo);
};

export const isChord = (value: any): value is elements.Chord => {
  return operations.validate(value, elements.Chord);
};

export const isChromatic = (value: any): value is elements.Chromatic => {
  return operations.validate(value, elements.Chromatic);
};

export const isCircularArrow = (value: any): value is elements.CircularArrow => {
  return operations.validate(value, elements.CircularArrow);
};

export const isClef = (value: any): value is elements.Clef => {
  return operations.validate(value, elements.Clef);
};

export const isClefOctaveChange = (value: any): value is elements.ClefOctaveChange => {
  return operations.validate(value, elements.ClefOctaveChange);
};

export const isCoda = (value: any): value is elements.Coda => {
  return operations.validate(value, elements.Coda);
};

export const isCodas = (value: any): value is elements.Codas => {
  return operations.validate(value, elements.DirectionType.schema.contents[0]['value']['choices'][2]);
};

export const isConcertScore = (value: any): value is elements.ConcertScore => {
  return operations.validate(value, elements.ConcertScore);
};

export const isCreator = (value: any): value is elements.Creator => {
  return operations.validate(value, elements.Creator);
};

export const isCredit = (value: any): value is elements.Credit => {
  return operations.validate(value, elements.Credit);
};

export const isCreditImage = (value: any): value is elements.CreditImage => {
  return operations.validate(value, elements.CreditImage);
};

export const isCreditSymbol = (value: any): value is elements.CreditSymbol => {
  return operations.validate(value, elements.CreditSymbol);
};

export const isCreditToken = (value: any): value is elements.CreditToken => {
  return operations.validate(value, elements.Credit.schema.contents[3]['value']['choices'][1]);
};

export const isCreditType = (value: any): value is elements.CreditType => {
  return operations.validate(value, elements.CreditType);
};

export const isCreditWords = (value: any): value is elements.CreditWords => {
  return operations.validate(value, elements.CreditWords);
};

export const isCue = (value: any): value is elements.Cue => {
  return operations.validate(value, elements.Cue);
};

export const isCuedGraceNote = (value: any): value is elements.CuedGraceNote => {
  return operations.validate(value, elements.Note.schema.contents[0]['value']['choices'][3]);
};

export const isCuedNote = (value: any): value is elements.CuedNote => {
  return operations.validate(value, elements.Note.schema.contents[0]['value']['choices'][1]);
};

export const isDamp = (value: any): value is elements.Damp => {
  return operations.validate(value, elements.Damp);
};

export const isDampAll = (value: any): value is elements.DampAll => {
  return operations.validate(value, elements.DampAll);
};

export const isDashes = (value: any): value is elements.Dashes => {
  return operations.validate(value, elements.Dashes);
};

export const isDefaults = (value: any): value is elements.Defaults => {
  return operations.validate(value, elements.Defaults);
};

export const isDegree = (value: any): value is elements.Degree => {
  return operations.validate(value, elements.Degree);
};

export const isDegreeAlter = (value: any): value is elements.DegreeAlter => {
  return operations.validate(value, elements.DegreeAlter);
};

export const isDegreeType = (value: any): value is elements.DegreeType => {
  return operations.validate(value, elements.DegreeType);
};

export const isDegreeValue = (value: any): value is elements.DegreeValue => {
  return operations.validate(value, elements.DegreeValue);
};

export const isDelayedInvertedTurn = (value: any): value is elements.DelayedInvertedTurn => {
  return operations.validate(value, elements.DelayedInvertedTurn);
};

export const isDelayedTurn = (value: any): value is elements.DelayedTurn => {
  return operations.validate(value, elements.DelayedTurn);
};

export const isDetachedLegato = (value: any): value is elements.DetachedLegato => {
  return operations.validate(value, elements.DetachedLegato);
};

export const isDiatonic = (value: any): value is elements.Diatonic => {
  return operations.validate(value, elements.Diatonic);
};

export const isDirection = (value: any): value is elements.Direction => {
  return operations.validate(value, elements.Direction);
};

export const isDirectionType = (value: any): value is elements.DirectionType => {
  return operations.validate(value, elements.DirectionType);
};

export const isDirective = (value: any): value is elements.Directive => {
  return operations.validate(value, elements.Directive);
};

export const isDisplayOctave = (value: any): value is elements.DisplayOctave => {
  return operations.validate(value, elements.DisplayOctave);
};

export const isDisplayStep = (value: any): value is elements.DisplayStep => {
  return operations.validate(value, elements.DisplayStep);
};

export const isDisplayText = (value: any): value is elements.DisplayText => {
  return operations.validate(value, elements.DisplayText);
};

export const isDistance = (value: any): value is elements.Distance => {
  return operations.validate(value, elements.Distance);
};

export const isDivisions = (value: any): value is elements.Divisions => {
  return operations.validate(value, elements.Divisions);
};

export const isDoit = (value: any): value is elements.Doit => {
  return operations.validate(value, elements.Doit);
};

export const isDot = (value: any): value is elements.Dot => {
  return operations.validate(value, elements.Dot);
};

export const isDouble = (value: any): value is elements.Double => {
  return operations.validate(value, elements.Double);
};

export const isDoubleTongue = (value: any): value is elements.DoubleTongue => {
  return operations.validate(value, elements.DoubleTongue);
};

export const isDownBow = (value: any): value is elements.DownBow => {
  return operations.validate(value, elements.DownBow);
};

export const isDuration = (value: any): value is elements.Duration => {
  return operations.validate(value, elements.Duration);
};

export const isDynamics = (value: any): value is elements.Dynamics => {
  return operations.validate(value, elements.Dynamics);
};

export const isDynamicsList = (value: any): value is elements.DynamicsList => {
  return operations.validate(value, elements.DirectionType.schema.contents[0]['value']['choices'][5]);
};

export const isEffect = (value: any): value is elements.Effect => {
  return operations.validate(value, elements.Effect);
};

export const isElevation = (value: any): value is elements.Elevation => {
  return operations.validate(value, elements.Elevation);
};

export const isElision = (value: any): value is elements.Elision => {
  return operations.validate(value, elements.Elision);
};

export const isEncoder = (value: any): value is elements.Encoder => {
  return operations.validate(value, elements.Encoder);
};

export const isEncoding = (value: any): value is elements.Encoding => {
  return operations.validate(value, elements.Encoding);
};

export const isEncodingDate = (value: any): value is elements.EncodingDate => {
  return operations.validate(value, elements.EncodingDate);
};

export const isEncodingDescription = (value: any): value is elements.EncodingDescription => {
  return operations.validate(value, elements.EncodingDescription);
};

export const isEndLine = (value: any): value is elements.EndLine => {
  return operations.validate(value, elements.EndLine);
};

export const isEndParagraph = (value: any): value is elements.EndParagraph => {
  return operations.validate(value, elements.EndParagraph);
};

export const isEnding = (value: any): value is elements.Ending => {
  return operations.validate(value, elements.Ending);
};

export const isEnsemble = (value: any): value is elements.Ensemble => {
  return operations.validate(value, elements.Ensemble);
};

export const isExceptVoice = (value: any): value is elements.ExceptVoice => {
  return operations.validate(value, elements.ExceptVoice);
};

export const isExtend = (value: any): value is elements.Extend => {
  return operations.validate(value, elements.Extend);
};

export const isEyeglasses = (value: any): value is elements.Eyeglasses => {
  return operations.validate(value, elements.Eyeglasses);
};

export const isF = (value: any): value is elements.F => {
  return operations.validate(value, elements.F);
};

export const isFalloff = (value: any): value is elements.Falloff => {
  return operations.validate(value, elements.Falloff);
};

export const isFeature = (value: any): value is elements.Feature => {
  return operations.validate(value, elements.Feature);
};

export const isFermata = (value: any): value is elements.Fermata => {
  return operations.validate(value, elements.Fermata);
};

export const isFf = (value: any): value is elements.Ff => {
  return operations.validate(value, elements.Ff);
};

export const isFff = (value: any): value is elements.Fff => {
  return operations.validate(value, elements.Fff);
};

export const isFfff = (value: any): value is elements.Ffff => {
  return operations.validate(value, elements.Ffff);
};

export const isFffff = (value: any): value is elements.Fffff => {
  return operations.validate(value, elements.Fffff);
};

export const isFfffff = (value: any): value is elements.Ffffff => {
  return operations.validate(value, elements.Ffffff);
};

export const isFifths = (value: any): value is elements.Fifths => {
  return operations.validate(value, elements.Fifths);
};

export const isFigure = (value: any): value is elements.Figure => {
  return operations.validate(value, elements.Figure);
};

export const isFigureNumber = (value: any): value is elements.FigureNumber => {
  return operations.validate(value, elements.FigureNumber);
};

export const isFiguredBass = (value: any): value is elements.FiguredBass => {
  return operations.validate(value, elements.FiguredBass);
};

export const isFingering = (value: any): value is elements.Fingering => {
  return operations.validate(value, elements.Fingering);
};

export const isFingernails = (value: any): value is elements.Fingernails => {
  return operations.validate(value, elements.Fingernails);
};

export const isFirst = (value: any): value is elements.First => {
  return operations.validate(value, elements.First);
};

export const isFirstFret = (value: any): value is elements.FirstFret => {
  return operations.validate(value, elements.FirstFret);
};

export const isFlip = (value: any): value is elements.Flip => {
  return operations.validate(value, elements.Flip);
};

export const isFootnote = (value: any): value is elements.Footnote => {
  return operations.validate(value, elements.Footnote);
};

export const isForPart = (value: any): value is elements.ForPart => {
  return operations.validate(value, elements.ForPart);
};

export const isForParts = (value: any): value is elements.ForParts => {
  return operations.validate(value, elements.Attributes.schema.contents[10]['value']['choices'][1]);
};

export const isForward = (value: any): value is elements.Forward => {
  return operations.validate(value, elements.Forward);
};

export const isFp = (value: any): value is elements.Fp => {
  return operations.validate(value, elements.Fp);
};

export const isFrame = (value: any): value is elements.Frame => {
  return operations.validate(value, elements.Frame);
};

export const isFrameFrets = (value: any): value is elements.FrameFrets => {
  return operations.validate(value, elements.FrameFrets);
};

export const isFrameNote = (value: any): value is elements.FrameNote => {
  return operations.validate(value, elements.FrameNote);
};

export const isFrameStrings = (value: any): value is elements.FrameStrings => {
  return operations.validate(value, elements.FrameStrings);
};

export const isFret = (value: any): value is elements.Fret => {
  return operations.validate(value, elements.Fret);
};

export const isFunction = (value: any): value is elements.Function => {
  return operations.validate(value, elements.Function);
};

export const isFz = (value: any): value is elements.Fz => {
  return operations.validate(value, elements.Fz);
};

export const isGlass = (value: any): value is elements.Glass => {
  return operations.validate(value, elements.Glass);
};

export const isGlissando = (value: any): value is elements.Glissando => {
  return operations.validate(value, elements.Glissando);
};

export const isGlyph = (value: any): value is elements.Glyph => {
  return operations.validate(value, elements.Glyph);
};

export const isGolpe = (value: any): value is elements.Golpe => {
  return operations.validate(value, elements.Golpe);
};

export const isGrace = (value: any): value is elements.Grace => {
  return operations.validate(value, elements.Grace);
};

export const isGroup = (value: any): value is elements.Group => {
  return operations.validate(value, elements.Group);
};

export const isGroupAbbreviation = (value: any): value is elements.GroupAbbreviation => {
  return operations.validate(value, elements.GroupAbbreviation);
};

export const isGroupAbbreviationDisplay = (value: any): value is elements.GroupAbbreviationDisplay => {
  return operations.validate(value, elements.GroupAbbreviationDisplay);
};

export const isGroupBarline = (value: any): value is elements.GroupBarline => {
  return operations.validate(value, elements.GroupBarline);
};

export const isGroupLink = (value: any): value is elements.GroupLink => {
  return operations.validate(value, elements.GroupLink);
};

export const isGroupName = (value: any): value is elements.GroupName => {
  return operations.validate(value, elements.GroupName);
};

export const isGroupNameDisplay = (value: any): value is elements.GroupNameDisplay => {
  return operations.validate(value, elements.GroupNameDisplay);
};

export const isGroupSymbol = (value: any): value is elements.GroupSymbol => {
  return operations.validate(value, elements.GroupSymbol);
};

export const isGroupTime = (value: any): value is elements.GroupTime => {
  return operations.validate(value, elements.GroupTime);
};

export const isGrouping = (value: any): value is elements.Grouping => {
  return operations.validate(value, elements.Grouping);
};

export const isHalfMuted = (value: any): value is elements.HalfMuted => {
  return operations.validate(value, elements.HalfMuted);
};

export const isHammerOn = (value: any): value is elements.HammerOn => {
  return operations.validate(value, elements.HammerOn);
};

export const isHandbell = (value: any): value is elements.Handbell => {
  return operations.validate(value, elements.Handbell);
};

export const isHarmonClosed = (value: any): value is elements.HarmonClosed => {
  return operations.validate(value, elements.HarmonClosed);
};

export const isHarmonMute = (value: any): value is elements.HarmonMute => {
  return operations.validate(value, elements.HarmonMute);
};

export const isHarmonic = (value: any): value is elements.Harmonic => {
  return operations.validate(value, elements.Harmonic);
};

export const isHarmony = (value: any): value is elements.Harmony => {
  return operations.validate(value, elements.Harmony);
};

export const isHarpPedals = (value: any): value is elements.HarpPedals => {
  return operations.validate(value, elements.HarpPedals);
};

export const isHaydn = (value: any): value is elements.Haydn => {
  return operations.validate(value, elements.Haydn);
};

export const isHeel = (value: any): value is elements.Heel => {
  return operations.validate(value, elements.Heel);
};

export const isHole = (value: any): value is elements.Hole => {
  return operations.validate(value, elements.Hole);
};

export const isHoleClosed = (value: any): value is elements.HoleClosed => {
  return operations.validate(value, elements.HoleClosed);
};

export const isHoleShape = (value: any): value is elements.HoleShape => {
  return operations.validate(value, elements.HoleShape);
};

export const isHoleType = (value: any): value is elements.HoleType => {
  return operations.validate(value, elements.HoleType);
};

export const isHumming = (value: any): value is elements.Humming => {
  return operations.validate(value, elements.Humming);
};

export const isIdentification = (value: any): value is elements.Identification => {
  return operations.validate(value, elements.Identification);
};

export const isImage = (value: any): value is elements.Image => {
  return operations.validate(value, elements.Image);
};

export const isInstrument = (value: any): value is elements.Instrument => {
  return operations.validate(value, elements.Instrument);
};

export const isInstrumentAbbreviation = (value: any): value is elements.InstrumentAbbreviation => {
  return operations.validate(value, elements.InstrumentAbbreviation);
};

export const isInstrumentChange = (value: any): value is elements.InstrumentChange => {
  return operations.validate(value, elements.InstrumentChange);
};

export const isInstrumentLink = (value: any): value is elements.InstrumentLink => {
  return operations.validate(value, elements.InstrumentLink);
};

export const isInstrumentName = (value: any): value is elements.InstrumentName => {
  return operations.validate(value, elements.InstrumentName);
};

export const isInstrumentSound = (value: any): value is elements.InstrumentSound => {
  return operations.validate(value, elements.InstrumentSound);
};

export const isInstruments = (value: any): value is elements.Instruments => {
  return operations.validate(value, elements.Instruments);
};

export const isIntelligible = (value: any): value is elements.Intelligible => {
  return operations.validate(value, elements.Lyric.schema.contents[0]['value']['choices'][0]);
};

export const isInterchangeable = (value: any): value is elements.Interchangeable => {
  return operations.validate(value, elements.Interchangeable);
};

export const isInversion = (value: any): value is elements.Inversion => {
  return operations.validate(value, elements.Inversion);
};

export const isInvertedMordent = (value: any): value is elements.InvertedMordent => {
  return operations.validate(value, elements.InvertedMordent);
};

export const isInvertedTurn = (value: any): value is elements.InvertedTurn => {
  return operations.validate(value, elements.InvertedTurn);
};

export const isInvertedVerticalTurn = (value: any): value is elements.InvertedVerticalTurn => {
  return operations.validate(value, elements.InvertedVerticalTurn);
};

export const isIpa = (value: any): value is elements.Ipa => {
  return operations.validate(value, elements.Ipa);
};

export const isKey = (value: any): value is elements.Key => {
  return operations.validate(value, elements.Key);
};

export const isKeyAccidental = (value: any): value is elements.KeyAccidental => {
  return operations.validate(value, elements.KeyAccidental);
};

export const isKeyAlter = (value: any): value is elements.KeyAlter => {
  return operations.validate(value, elements.KeyAlter);
};

export const isKeyOctave = (value: any): value is elements.KeyOctave => {
  return operations.validate(value, elements.KeyOctave);
};

export const isKeyStep = (value: any): value is elements.KeyStep => {
  return operations.validate(value, elements.KeyStep);
};

export const isKind = (value: any): value is elements.Kind => {
  return operations.validate(value, elements.Kind);
};

export const isLaughing = (value: any): value is elements.Laughing => {
  return operations.validate(value, elements.Laughing);
};

export const isLeftMargin = (value: any): value is elements.LeftMargin => {
  return operations.validate(value, elements.LeftMargin);
};

export const isLevel = (value: any): value is elements.Level => {
  return operations.validate(value, elements.Level);
};

export const isLine = (value: any): value is elements.Line => {
  return operations.validate(value, elements.Line);
};

export const isLineDetail = (value: any): value is elements.LineDetail => {
  return operations.validate(value, elements.LineDetail);
};

export const isLineWidth = (value: any): value is elements.LineWidth => {
  return operations.validate(value, elements.LineWidth);
};

export const isLink = (value: any): value is elements.Link => {
  return operations.validate(value, elements.Link);
};

export const isListen = (value: any): value is elements.Listen => {
  return operations.validate(value, elements.Listen);
};

export const isListening = (value: any): value is elements.Listening => {
  return operations.validate(value, elements.Listening);
};

export const isLyric = (value: any): value is elements.Lyric => {
  return operations.validate(value, elements.Lyric);
};

export const isLyricFont = (value: any): value is elements.LyricFont => {
  return operations.validate(value, elements.LyricFont);
};

export const isLyricLanguage = (value: any): value is elements.LyricLanguage => {
  return operations.validate(value, elements.LyricLanguage);
};

export const isMeasureDistance = (value: any): value is elements.MeasureDistance => {
  return operations.validate(value, elements.MeasureDistance);
};

export const isMeasureLayout = (value: any): value is elements.MeasureLayout => {
  return operations.validate(value, elements.MeasureLayout);
};

export const isMeasureNumbering = (value: any): value is elements.MeasureNumbering => {
  return operations.validate(value, elements.MeasureNumbering);
};

export const isMeasurePartwise = (value: any): value is elements.MeasurePartwise => {
  return operations.validate(value, elements.MeasurePartwise);
};

export const isMeasureRepeat = (value: any): value is elements.MeasureRepeat => {
  return operations.validate(value, elements.MeasureRepeat);
};

export const isMeasureStyle = (value: any): value is elements.MeasureStyle => {
  return operations.validate(value, elements.MeasureStyle);
};

export const isMeasureTimewise = (value: any): value is elements.MeasureTimewise => {
  return operations.validate(value, elements.MeasureTimewise);
};

export const isMembrane = (value: any): value is elements.Membrane => {
  return operations.validate(value, elements.Membrane);
};

export const isMetal = (value: any): value is elements.Metal => {
  return operations.validate(value, elements.Metal);
};

export const isMetronome = (value: any): value is elements.Metronome => {
  return operations.validate(value, elements.Metronome);
};

export const isMetronomeArrows = (value: any): value is elements.MetronomeArrows => {
  return operations.validate(value, elements.MetronomeArrows);
};

export const isMetronomeBeam = (value: any): value is elements.MetronomeBeam => {
  return operations.validate(value, elements.MetronomeBeam);
};

export const isMetronomeDot = (value: any): value is elements.MetronomeDot => {
  return operations.validate(value, elements.MetronomeDot);
};

export const isMetronomeNote = (value: any): value is elements.MetronomeNote => {
  return operations.validate(value, elements.MetronomeNote);
};

export const isMetronomeRelation = (value: any): value is elements.MetronomeRelation => {
  return operations.validate(value, elements.MetronomeRelation);
};

export const isMetronomeSpec = (value: any): value is elements.MetronomeSpec => {
  return operations.validate(value, elements.Metronome.schema.contents[0]['value']['choices'][1]);
};

export const isMetronomeTied = (value: any): value is elements.MetronomeTied => {
  return operations.validate(value, elements.MetronomeTied);
};

export const isMetronomeTuplet = (value: any): value is elements.MetronomeTuplet => {
  return operations.validate(value, elements.MetronomeTuplet);
};

export const isMetronomeType = (value: any): value is elements.MetronomeType => {
  return operations.validate(value, elements.MetronomeType);
};

export const isMf = (value: any): value is elements.Mf => {
  return operations.validate(value, elements.Mf);
};

export const isMidiBank = (value: any): value is elements.MidiBank => {
  return operations.validate(value, elements.MidiBank);
};

export const isMidiChannel = (value: any): value is elements.MidiChannel => {
  return operations.validate(value, elements.MidiChannel);
};

export const isMidiDevice = (value: any): value is elements.MidiDevice => {
  return operations.validate(value, elements.MidiDevice);
};

export const isMidiInstrument = (value: any): value is elements.MidiInstrument => {
  return operations.validate(value, elements.MidiInstrument);
};

export const isMidiName = (value: any): value is elements.MidiName => {
  return operations.validate(value, elements.MidiName);
};

export const isMidiProgram = (value: any): value is elements.MidiProgram => {
  return operations.validate(value, elements.MidiProgram);
};

export const isMidiUnpitched = (value: any): value is elements.MidiUnpitched => {
  return operations.validate(value, elements.MidiUnpitched);
};

export const isMillimeters = (value: any): value is elements.Millimeters => {
  return operations.validate(value, elements.Millimeters);
};

export const isMiscellaneous = (value: any): value is elements.Miscellaneous => {
  return operations.validate(value, elements.Miscellaneous);
};

export const isMiscellaneousField = (value: any): value is elements.MiscellaneousField => {
  return operations.validate(value, elements.MiscellaneousField);
};

export const isMode = (value: any): value is elements.Mode => {
  return operations.validate(value, elements.Mode);
};

export const isMordent = (value: any): value is elements.Mordent => {
  return operations.validate(value, elements.Mordent);
};

export const isMovementNumber = (value: any): value is elements.MovementNumber => {
  return operations.validate(value, elements.MovementNumber);
};

export const isMovementTitle = (value: any): value is elements.MovementTitle => {
  return operations.validate(value, elements.MovementTitle);
};

export const isMp = (value: any): value is elements.Mp => {
  return operations.validate(value, elements.Mp);
};

export const isMultipleRest = (value: any): value is elements.MultipleRest => {
  return operations.validate(value, elements.MultipleRest);
};

export const isMusicFont = (value: any): value is elements.MusicFont => {
  return operations.validate(value, elements.MusicFont);
};

export const isMute = (value: any): value is elements.Mute => {
  return operations.validate(value, elements.Mute);
};

export const isN = (value: any): value is elements.N => {
  return operations.validate(value, elements.N);
};

export const isNatural = (value: any): value is elements.Natural => {
  return operations.validate(value, elements.Natural);
};

export const isNonArpeggiate = (value: any): value is elements.NonArpeggiate => {
  return operations.validate(value, elements.NonArpeggiate);
};

export const isNormalDot = (value: any): value is elements.NormalDot => {
  return operations.validate(value, elements.NormalDot);
};

export const isNormalNotes = (value: any): value is elements.NormalNotes => {
  return operations.validate(value, elements.NormalNotes);
};

export const isNormalType = (value: any): value is elements.NormalType => {
  return operations.validate(value, elements.NormalType);
};

export const isNotations = (value: any): value is elements.Notations => {
  return operations.validate(value, elements.Notations);
};

export const isNote = (value: any): value is elements.Note => {
  return operations.validate(value, elements.Note);
};

export const isNoteSize = (value: any): value is elements.NoteSize => {
  return operations.validate(value, elements.NoteSize);
};

export const isNotehead = (value: any): value is elements.Notehead => {
  return operations.validate(value, elements.Notehead);
};

export const isNoteheadText = (value: any): value is elements.NoteheadText => {
  return operations.validate(value, elements.NoteheadText);
};

export const isNumeral = (value: any): value is elements.Numeral => {
  return operations.validate(value, elements.Numeral);
};

export const isNumeralAlter = (value: any): value is elements.NumeralAlter => {
  return operations.validate(value, elements.NumeralAlter);
};

export const isNumeralFifths = (value: any): value is elements.NumeralFifths => {
  return operations.validate(value, elements.NumeralFifths);
};

export const isNumeralKey = (value: any): value is elements.NumeralKey => {
  return operations.validate(value, elements.NumeralKey);
};

export const isNumeralMode = (value: any): value is elements.NumeralMode => {
  return operations.validate(value, elements.NumeralMode);
};

export const isNumeralRoot = (value: any): value is elements.NumeralRoot => {
  return operations.validate(value, elements.NumeralRoot);
};

export const isOctave = (value: any): value is elements.Octave => {
  return operations.validate(value, elements.Octave);
};

export const isOctaveChange = (value: any): value is elements.OctaveChange => {
  return operations.validate(value, elements.OctaveChange);
};

export const isOctaveShift = (value: any): value is elements.OctaveShift => {
  return operations.validate(value, elements.OctaveShift);
};

export const isOffset = (value: any): value is elements.Offset => {
  return operations.validate(value, elements.Offset);
};

export const isOpen = (value: any): value is elements.Open => {
  return operations.validate(value, elements.Open);
};

export const isOpenString = (value: any): value is elements.OpenString => {
  return operations.validate(value, elements.OpenString);
};

export const isOpus = (value: any): value is elements.Opus => {
  return operations.validate(value, elements.Opus);
};

export const isOrnaments = (value: any): value is elements.Ornaments => {
  return operations.validate(value, elements.Ornaments);
};

export const isOtherAppearance = (value: any): value is elements.OtherAppearance => {
  return operations.validate(value, elements.OtherAppearance);
};

export const isOtherArticulation = (value: any): value is elements.OtherArticulation => {
  return operations.validate(value, elements.OtherArticulation);
};

export const isOtherDirection = (value: any): value is elements.OtherDirection => {
  return operations.validate(value, elements.OtherDirection);
};

export const isOtherDynamics = (value: any): value is elements.OtherDynamics => {
  return operations.validate(value, elements.OtherDynamics);
};

export const isOtherListen = (value: any): value is elements.OtherListen => {
  return operations.validate(value, elements.OtherListen);
};

export const isOtherListening = (value: any): value is elements.OtherListening => {
  return operations.validate(value, elements.OtherListening);
};

export const isOtherNotation = (value: any): value is elements.OtherNotation => {
  return operations.validate(value, elements.OtherNotation);
};

export const isOtherOrnament = (value: any): value is elements.OtherOrnament => {
  return operations.validate(value, elements.OtherOrnament);
};

export const isOtherPercussion = (value: any): value is elements.OtherPercussion => {
  return operations.validate(value, elements.OtherPercussion);
};

export const isOtherPlay = (value: any): value is elements.OtherPlay => {
  return operations.validate(value, elements.OtherPlay);
};

export const isOtherTechnical = (value: any): value is elements.OtherTechnical => {
  return operations.validate(value, elements.OtherTechnical);
};

export const isP = (value: any): value is elements.P => {
  return operations.validate(value, elements.P);
};

export const isPageHeight = (value: any): value is elements.PageHeight => {
  return operations.validate(value, elements.PageHeight);
};

export const isPageLayout = (value: any): value is elements.PageLayout => {
  return operations.validate(value, elements.PageLayout);
};

export const isPageMargins = (value: any): value is elements.PageMargins => {
  return operations.validate(value, elements.PageMargins);
};

export const isPageWidth = (value: any): value is elements.PageWidth => {
  return operations.validate(value, elements.PageWidth);
};

export const isPan = (value: any): value is elements.Pan => {
  return operations.validate(value, elements.Pan);
};

export const isPartAbbreviation = (value: any): value is elements.PartAbbreviation => {
  return operations.validate(value, elements.PartAbbreviation);
};

export const isPartAbbreviationDisplay = (value: any): value is elements.PartAbbreviationDisplay => {
  return operations.validate(value, elements.PartAbbreviationDisplay);
};

export const isPartClef = (value: any): value is elements.PartClef => {
  return operations.validate(value, elements.PartClef);
};

export const isPartGroup = (value: any): value is elements.PartGroup => {
  return operations.validate(value, elements.PartGroup);
};

export const isPartLink = (value: any): value is elements.PartLink => {
  return operations.validate(value, elements.PartLink);
};

export const isPartList = (value: any): value is elements.PartList => {
  return operations.validate(value, elements.PartList);
};

export const isPartName = (value: any): value is elements.PartName => {
  return operations.validate(value, elements.PartName);
};

export const isPartNameDisplay = (value: any): value is elements.PartNameDisplay => {
  return operations.validate(value, elements.PartNameDisplay);
};

export const isPartPartwise = (value: any): value is elements.PartPartwise => {
  return operations.validate(value, elements.PartPartwise);
};

export const isPartSymbol = (value: any): value is elements.PartSymbol => {
  return operations.validate(value, elements.PartSymbol);
};

export const isPartTimewise = (value: any): value is elements.PartTimewise => {
  return operations.validate(value, elements.PartTimewise);
};

export const isPartTranspose = (value: any): value is elements.PartTranspose => {
  return operations.validate(value, elements.PartTranspose);
};

export const isPedal = (value: any): value is elements.Pedal => {
  return operations.validate(value, elements.Pedal);
};

export const isPedalAlter = (value: any): value is elements.PedalAlter => {
  return operations.validate(value, elements.PedalAlter);
};

export const isPedalStep = (value: any): value is elements.PedalStep => {
  return operations.validate(value, elements.PedalStep);
};

export const isPedalTuning = (value: any): value is elements.PedalTuning => {
  return operations.validate(value, elements.PedalTuning);
};

export const isPerMinute = (value: any): value is elements.PerMinute => {
  return operations.validate(value, elements.PerMinute);
};

export const isPercussion = (value: any): value is elements.Percussion => {
  return operations.validate(value, elements.Percussion);
};

export const isPercussions = (value: any): value is elements.Percussions => {
  return operations.validate(value, elements.DirectionType.schema.contents[0]['value']['choices'][19]);
};

export const isPf = (value: any): value is elements.Pf => {
  return operations.validate(value, elements.Pf);
};

export const isPitch = (value: any): value is elements.Pitch => {
  return operations.validate(value, elements.Pitch);
};

export const isPitched = (value: any): value is elements.Pitched => {
  return operations.validate(value, elements.Pitched);
};

export const isPlay = (value: any): value is elements.Play => {
  return operations.validate(value, elements.Play);
};

export const isPlayer = (value: any): value is elements.Player => {
  return operations.validate(value, elements.Player);
};

export const isPlop = (value: any): value is elements.Plop => {
  return operations.validate(value, elements.Plop);
};

export const isPluck = (value: any): value is elements.Pluck => {
  return operations.validate(value, elements.Pluck);
};

export const isPp = (value: any): value is elements.Pp => {
  return operations.validate(value, elements.Pp);
};

export const isPpp = (value: any): value is elements.Ppp => {
  return operations.validate(value, elements.Ppp);
};

export const isPppp = (value: any): value is elements.Pppp => {
  return operations.validate(value, elements.Pppp);
};

export const isPpppp = (value: any): value is elements.Ppppp => {
  return operations.validate(value, elements.Ppppp);
};

export const isPppppp = (value: any): value is elements.Pppppp => {
  return operations.validate(value, elements.Pppppp);
};

export const isPreBend = (value: any): value is elements.PreBend => {
  return operations.validate(value, elements.PreBend);
};

export const isPrefix = (value: any): value is elements.Prefix => {
  return operations.validate(value, elements.Prefix);
};

export const isPrincipalVoice = (value: any): value is elements.PrincipalVoice => {
  return operations.validate(value, elements.PrincipalVoice);
};

export const isPrint = (value: any): value is elements.Print => {
  return operations.validate(value, elements.Print);
};

export const isPullOff = (value: any): value is elements.PullOff => {
  return operations.validate(value, elements.PullOff);
};

export const isRehearsal = (value: any): value is elements.Rehearsal => {
  return operations.validate(value, elements.Rehearsal);
};

export const isRehearsals = (value: any): value is elements.Rehearsals => {
  return operations.validate(value, elements.DirectionType.schema.contents[0]['value']['choices'][0]);
};

export const isRelation = (value: any): value is elements.Relation => {
  return operations.validate(value, elements.Relation);
};

export const isRelease = (value: any): value is elements.Release => {
  return operations.validate(value, elements.Release);
};

export const isRepeat = (value: any): value is elements.Repeat => {
  return operations.validate(value, elements.Repeat);
};

export const isRest = (value: any): value is elements.Rest => {
  return operations.validate(value, elements.Rest);
};

export const isRf = (value: any): value is elements.Rf => {
  return operations.validate(value, elements.Rf);
};

export const isRfz = (value: any): value is elements.Rfz => {
  return operations.validate(value, elements.Rfz);
};

export const isRightMargin = (value: any): value is elements.RightMargin => {
  return operations.validate(value, elements.RightMargin);
};

export const isRights = (value: any): value is elements.Rights => {
  return operations.validate(value, elements.Rights);
};

export const isRoot = (value: any): value is elements.Root => {
  return operations.validate(value, elements.Root);
};

export const isRootAlter = (value: any): value is elements.RootAlter => {
  return operations.validate(value, elements.RootAlter);
};

export const isRootStep = (value: any): value is elements.RootStep => {
  return operations.validate(value, elements.RootStep);
};

export const isScaling = (value: any): value is elements.Scaling => {
  return operations.validate(value, elements.Scaling);
};

export const isSchleifer = (value: any): value is elements.Schleifer => {
  return operations.validate(value, elements.Schleifer);
};

export const isScoop = (value: any): value is elements.Scoop => {
  return operations.validate(value, elements.Scoop);
};

export const isScordatura = (value: any): value is elements.Scordatura => {
  return operations.validate(value, elements.Scordatura);
};

export const isScoreInstrument = (value: any): value is elements.ScoreInstrument => {
  return operations.validate(value, elements.ScoreInstrument);
};

export const isScorePart = (value: any): value is elements.ScorePart => {
  return operations.validate(value, elements.ScorePart);
};

export const isScorePartwise = (value: any): value is elements.ScorePartwise => {
  return operations.validate(value, elements.ScorePartwise);
};

export const isScoreTimewise = (value: any): value is elements.ScoreTimewise => {
  return operations.validate(value, elements.ScoreTimewise);
};

export const isSecond = (value: any): value is elements.Second => {
  return operations.validate(value, elements.Second);
};

export const isSegno = (value: any): value is elements.Segno => {
  return operations.validate(value, elements.Segno);
};

export const isSegnos = (value: any): value is elements.Segnos => {
  return operations.validate(value, elements.DirectionType.schema.contents[0]['value']['choices'][1]);
};

export const isSemiPitched = (value: any): value is elements.SemiPitched => {
  return operations.validate(value, elements.SemiPitched);
};

export const isSenzaMisura = (value: any): value is elements.SenzaMisura => {
  return operations.validate(value, elements.SenzaMisura);
};

export const isSf = (value: any): value is elements.Sf => {
  return operations.validate(value, elements.Sf);
};

export const isSffz = (value: any): value is elements.Sffz => {
  return operations.validate(value, elements.Sffz);
};

export const isSfp = (value: any): value is elements.Sfp => {
  return operations.validate(value, elements.Sfp);
};

export const isSfpp = (value: any): value is elements.Sfpp => {
  return operations.validate(value, elements.Sfpp);
};

export const isSfz = (value: any): value is elements.Sfz => {
  return operations.validate(value, elements.Sfz);
};

export const isSfzp = (value: any): value is elements.Sfzp => {
  return operations.validate(value, elements.Sfzp);
};

export const isShake = (value: any): value is elements.Shake => {
  return operations.validate(value, elements.Shake);
};

export const isSign = (value: any): value is elements.Sign => {
  return operations.validate(value, elements.Sign);
};

export const isSlash = (value: any): value is elements.Slash => {
  return operations.validate(value, elements.Slash);
};

export const isSlashDot = (value: any): value is elements.SlashDot => {
  return operations.validate(value, elements.SlashDot);
};

export const isSlashType = (value: any): value is elements.SlashType => {
  return operations.validate(value, elements.SlashType);
};

export const isSlide = (value: any): value is elements.Slide => {
  return operations.validate(value, elements.Slide);
};

export const isSlur = (value: any): value is elements.Slur => {
  return operations.validate(value, elements.Slur);
};

export const isSmear = (value: any): value is elements.Smear => {
  return operations.validate(value, elements.Smear);
};

export const isSnapPizzicato = (value: any): value is elements.SnapPizzicato => {
  return operations.validate(value, elements.SnapPizzicato);
};

export const isSoftAccess = (value: any): value is elements.SoftAccess => {
  return operations.validate(value, elements.SoftAccess);
};

export const isSoftware = (value: any): value is elements.Software => {
  return operations.validate(value, elements.Software);
};

export const isSolo = (value: any): value is elements.Solo => {
  return operations.validate(value, elements.Solo);
};

export const isSound = (value: any): value is elements.Sound => {
  return operations.validate(value, elements.Sound);
};

export const isSoundingPitch = (value: any): value is elements.SoundingPitch => {
  return operations.validate(value, elements.SoundingPitch);
};

export const isSource = (value: any): value is elements.Source => {
  return operations.validate(value, elements.Source);
};

export const isSpiccato = (value: any): value is elements.Spiccato => {
  return operations.validate(value, elements.Spiccato);
};

export const isStaccatissimo = (value: any): value is elements.Staccatissimo => {
  return operations.validate(value, elements.Staccatissimo);
};

export const isStaccato = (value: any): value is elements.Staccato => {
  return operations.validate(value, elements.Staccato);
};

export const isStaff = (value: any): value is elements.Staff => {
  return operations.validate(value, elements.Staff);
};

export const isStaffDetails = (value: any): value is elements.StaffDetails => {
  return operations.validate(value, elements.StaffDetails);
};

export const isStaffDistance = (value: any): value is elements.StaffDistance => {
  return operations.validate(value, elements.StaffDistance);
};

export const isStaffDivide = (value: any): value is elements.StaffDivide => {
  return operations.validate(value, elements.StaffDivide);
};

export const isStaffLayout = (value: any): value is elements.StaffLayout => {
  return operations.validate(value, elements.StaffLayout);
};

export const isStaffLines = (value: any): value is elements.StaffLines => {
  return operations.validate(value, elements.StaffLines);
};

export const isStaffSize = (value: any): value is elements.StaffSize => {
  return operations.validate(value, elements.StaffSize);
};

export const isStaffTuning = (value: any): value is elements.StaffTuning => {
  return operations.validate(value, elements.StaffTuning);
};

export const isStaffType = (value: any): value is elements.StaffType => {
  return operations.validate(value, elements.StaffType);
};

export const isStaves = (value: any): value is elements.Staves => {
  return operations.validate(value, elements.Staves);
};

export const isStem = (value: any): value is elements.Stem => {
  return operations.validate(value, elements.Stem);
};

export const isStep = (value: any): value is elements.Step => {
  return operations.validate(value, elements.Step);
};

export const isStick = (value: any): value is elements.Stick => {
  return operations.validate(value, elements.Stick);
};

export const isStickLocation = (value: any): value is elements.StickLocation => {
  return operations.validate(value, elements.StickLocation);
};

export const isStickMaterial = (value: any): value is elements.StickMaterial => {
  return operations.validate(value, elements.StickMaterial);
};

export const isStickType = (value: any): value is elements.StickType => {
  return operations.validate(value, elements.StickType);
};

export const isStopped = (value: any): value is elements.Stopped => {
  return operations.validate(value, elements.Stopped);
};

export const isStraight = (value: any): value is elements.Straight => {
  return operations.validate(value, elements.Straight);
};

export const isStress = (value: any): value is elements.Stress => {
  return operations.validate(value, elements.Stress);
};

export const isString = (value: any): value is elements.String => {
  return operations.validate(value, elements.String);
};

export const isStringMute = (value: any): value is elements.StringMute => {
  return operations.validate(value, elements.StringMute);
};

export const isStrongAccent = (value: any): value is elements.StrongAccent => {
  return operations.validate(value, elements.StrongAccent);
};

export const isSuffix = (value: any): value is elements.Suffix => {
  return operations.validate(value, elements.Suffix);
};

export const isSupports = (value: any): value is elements.Supports => {
  return operations.validate(value, elements.Supports);
};

export const isSwing = (value: any): value is elements.Swing => {
  return operations.validate(value, elements.Swing);
};

export const isSwingStyle = (value: any): value is elements.SwingStyle => {
  return operations.validate(value, elements.SwingStyle);
};

export const isSwingType = (value: any): value is elements.SwingType => {
  return operations.validate(value, elements.SwingType);
};

export const isSyllabic = (value: any): value is elements.Syllabic => {
  return operations.validate(value, elements.Syllabic);
};

export const isSymbol = (value: any): value is elements.Symbol => {
  return operations.validate(value, elements.Symbol);
};

export const isSync = (value: any): value is elements.Sync => {
  return operations.validate(value, elements.Sync);
};

export const isSystemDistance = (value: any): value is elements.SystemDistance => {
  return operations.validate(value, elements.SystemDistance);
};

export const isSystemLayout = (value: any): value is elements.SystemLayout => {
  return operations.validate(value, elements.SystemLayout);
};

export const isSystemMargins = (value: any): value is elements.SystemMargins => {
  return operations.validate(value, elements.SystemMargins);
};

export const isTap = (value: any): value is elements.Tap => {
  return operations.validate(value, elements.Tap);
};

export const isTechnical = (value: any): value is elements.Technical => {
  return operations.validate(value, elements.Technical);
};

export const isTenths = (value: any): value is elements.Tenths => {
  return operations.validate(value, elements.Tenths);
};

export const isTenuto = (value: any): value is elements.Tenuto => {
  return operations.validate(value, elements.Tenuto);
};

export const isText = (value: any): value is elements.Text => {
  return operations.validate(value, elements.Text);
};

export const isThumbPosition = (value: any): value is elements.ThumbPosition => {
  return operations.validate(value, elements.ThumbPosition);
};

export const isTie = (value: any): value is elements.Tie => {
  return operations.validate(value, elements.Tie);
};

export const isTied = (value: any): value is elements.Tied => {
  return operations.validate(value, elements.Tied);
};

export const isTiedGraceNote = (value: any): value is elements.TiedGraceNote => {
  return operations.validate(value, elements.Note.schema.contents[0]['value']['choices'][2]);
};

export const isTiedNote = (value: any): value is elements.TiedNote => {
  return operations.validate(value, elements.Note.schema.contents[0]['value']['choices'][0]);
};

export const isTime = (value: any): value is elements.Time => {
  return operations.validate(value, elements.Time);
};

export const isTimeModification = (value: any): value is elements.TimeModification => {
  return operations.validate(value, elements.TimeModification);
};

export const isTimeRelation = (value: any): value is elements.TimeRelation => {
  return operations.validate(value, elements.TimeRelation);
};

export const isTimeSignature = (value: any): value is elements.TimeSignature => {
  return operations.validate(value, elements.Time.schema.contents[0]['value']['choices'][0]);
};

export const isTimpani = (value: any): value is elements.Timpani => {
  return operations.validate(value, elements.Timpani);
};

export const isToe = (value: any): value is elements.Toe => {
  return operations.validate(value, elements.Toe);
};

export const isTokens = (value: any): value is elements.Tokens => {
  return operations.validate(value, elements.DirectionType.schema.contents[0]['value']['choices'][3]);
};

export const isTopMargin = (value: any): value is elements.TopMargin => {
  return operations.validate(value, elements.TopMargin);
};

export const isTopSystemDistance = (value: any): value is elements.TopSystemDistance => {
  return operations.validate(value, elements.TopSystemDistance);
};

export const isTouchingPitch = (value: any): value is elements.TouchingPitch => {
  return operations.validate(value, elements.TouchingPitch);
};

export const isTranditionalKey = (value: any): value is elements.TranditionalKey => {
  return operations.validate(value, elements.Key.schema.contents[0]['value']['choices'][0]);
};

export const isTranspose = (value: any): value is elements.Transpose => {
  return operations.validate(value, elements.Transpose);
};

export const isTransposes = (value: any): value is elements.Transposes => {
  return operations.validate(value, elements.Attributes.schema.contents[10]['value']['choices'][0]);
};

export const isTremolo = (value: any): value is elements.Tremolo => {
  return operations.validate(value, elements.Tremolo);
};

export const isTrillMark = (value: any): value is elements.TrillMark => {
  return operations.validate(value, elements.TrillMark);
};

export const isTripleTongue = (value: any): value is elements.TripleTongue => {
  return operations.validate(value, elements.TripleTongue);
};

export const isTuningAlter = (value: any): value is elements.TuningAlter => {
  return operations.validate(value, elements.TuningAlter);
};

export const isTuningOctave = (value: any): value is elements.TuningOctave => {
  return operations.validate(value, elements.TuningOctave);
};

export const isTuningStep = (value: any): value is elements.TuningStep => {
  return operations.validate(value, elements.TuningStep);
};

export const isTuplet = (value: any): value is elements.Tuplet => {
  return operations.validate(value, elements.Tuplet);
};

export const isTupletActual = (value: any): value is elements.TupletActual => {
  return operations.validate(value, elements.TupletActual);
};

export const isTupletDot = (value: any): value is elements.TupletDot => {
  return operations.validate(value, elements.TupletDot);
};

export const isTupletNormal = (value: any): value is elements.TupletNormal => {
  return operations.validate(value, elements.TupletNormal);
};

export const isTupletNumber = (value: any): value is elements.TupletNumber => {
  return operations.validate(value, elements.TupletNumber);
};

export const isTupletType = (value: any): value is elements.TupletType => {
  return operations.validate(value, elements.TupletType);
};

export const isTurn = (value: any): value is elements.Turn => {
  return operations.validate(value, elements.Turn);
};

export const isType = (value: any): value is elements.Type => {
  return operations.validate(value, elements.Type);
};

export const isUnpitched = (value: any): value is elements.Unpitched => {
  return operations.validate(value, elements.Unpitched);
};

export const isUnstress = (value: any): value is elements.Unstress => {
  return operations.validate(value, elements.Unstress);
};

export const isUpBow = (value: any): value is elements.UpBow => {
  return operations.validate(value, elements.UpBow);
};

export const isVerticalTurn = (value: any): value is elements.VerticalTurn => {
  return operations.validate(value, elements.VerticalTurn);
};

export const isVirtualInstrument = (value: any): value is elements.VirtualInstrument => {
  return operations.validate(value, elements.VirtualInstrument);
};

export const isVirtualLibrary = (value: any): value is elements.VirtualLibrary => {
  return operations.validate(value, elements.VirtualLibrary);
};

export const isVirtualName = (value: any): value is elements.VirtualName => {
  return operations.validate(value, elements.VirtualName);
};

export const isVoice = (value: any): value is elements.Voice => {
  return operations.validate(value, elements.Voice);
};

export const isVolume = (value: any): value is elements.Volume => {
  return operations.validate(value, elements.Volume);
};

export const isWait = (value: any): value is elements.Wait => {
  return operations.validate(value, elements.Wait);
};

export const isWavyLine = (value: any): value is elements.WavyLine => {
  return operations.validate(value, elements.WavyLine);
};

export const isWedge = (value: any): value is elements.Wedge => {
  return operations.validate(value, elements.Wedge);
};

export const isWithBar = (value: any): value is elements.WithBar => {
  return operations.validate(value, elements.WithBar);
};

export const isWood = (value: any): value is elements.Wood => {
  return operations.validate(value, elements.Wood);
};

export const isWordFont = (value: any): value is elements.WordFont => {
  return operations.validate(value, elements.WordFont);
};

export const isWords = (value: any): value is elements.Words => {
  return operations.validate(value, elements.Words);
};

export const isWork = (value: any): value is elements.Work => {
  return operations.validate(value, elements.Work);
};

export const isWorkNumber = (value: any): value is elements.WorkNumber => {
  return operations.validate(value, elements.WorkNumber);
};

export const isWorkTitle = (value: any): value is elements.WorkTitle => {
  return operations.validate(value, elements.WorkTitle);
};
