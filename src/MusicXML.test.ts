import * as examples from './examples';
import { EXAMPLES } from './examples';
import * as asserts from './generated/asserts';
import * as elements from './generated/elements';
import * as operations from './lib/operations';
import { MusicXML } from './MusicXML';

describe('MusicXML', () => {
  describe('README', () => {
    it('matches the parse and serialize documented README behavior', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1">
      <part-name></part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number=""/>
  </part>
</score-partwise>`;

      // parse
      const musicXml = MusicXML.parse(xml);

      // serialize
      expect(musicXml.serialize()).toBe(xml);
    });

    it('matches the create MusicXML partwise documented README behavior', () => {
      const musicXml = MusicXML.createPartwise();
      const root = musicXml.getRoot();
      expect(asserts.isScorePartwise(root)).toBeTrue();
    });

    it('matches the create MusicXML timewise documented README behavior', () => {
      const musicXml = MusicXML.createTimewise();
      const root = musicXml.getRoot();
      expect(asserts.isScoreTimewise(root)).toBeTrue();
    });

    it('matches the narrowing documented README behavior', () => {
      const note = new elements.Note();
      const noteVariation = note.getVariation();
      // In the README, we showed that the value must match one of the type predicates.
      expect(
        asserts.isTiedNote(noteVariation) ||
          asserts.isCuedNote(noteVariation) ||
          asserts.isTiedGraceNote(noteVariation) ||
          asserts.isCuedGraceNote(noteVariation)
      ).toBeTrue();
    });

    it('allows a measure element to be created and updated', () => {
      const measure = new elements.MeasurePartwise({ attributes: { number: '1', implicit: 'no' } });
      expect(measure.getNumber()).toBe('1');

      measure.setNumber('4');
      expect(measure.getNumber()).toBe('4');

      const note = new elements.Note();
      measure.setValues([...measure.getValues(), new elements.Note()]);
      const measureValues = measure.getValues();
      expect(measureValues).toHaveLength(1);
      expect(measureValues).toStrictEqual([note]);
    });

    it('allows setters to be chained', () => {
      const note = new elements.Note();
      note.setColor('#800080').setStaff(new elements.Staff()).getStaff()!.setValue(4);

      expect(note.getColor()).toBe('#800080');
      expect(note.getStaff()).not.toBeNull();
      expect(note.getStaff()!.getValue()).toBe(4);
    });

    it('creates a document with a single measure and a single note', () => {
      const musicXml = MusicXML.createPartwise();

      musicXml
        .getRoot()
        .setPartList(
          new elements.PartList({
            contents: [
              new Array<elements.PartGroup>(),
              new elements.ScorePart({
                attributes: { id: 'P1' },
                contents: [
                  null, // elements.Identification
                  new Array<elements.PartLink>(),
                  new elements.PartName({ contents: ['Part 1'] }),
                  null, // elements.PartNameDisplay
                  null, // elements.PartAbbreviation
                  null, // elements.PartAbbreviationDisplay
                  new Array<elements.Group>(),
                  new Array<elements.ScoreInstrument>(),
                  new Array<elements.Player>(),
                  new Array<elements.MidiDevice | elements.MidiInstrument>(),
                ],
              }),
              new Array<elements.PartGroup | elements.ScorePart>(),
            ],
          })
        )
        .setParts([
          new elements.PartPartwise({
            attributes: { id: 'P1' },
          }).setMeasures([
            new elements.MeasurePartwise({
              attributes: { number: '1' },
              contents: [
                [
                  new elements.Attributes({
                    attributes: { divisions: 1 },
                    contents: [
                      null, // elements.Footnote
                      null, // elements.Level
                      null, // elements.Divisions
                      new Array<elements.Key>(),
                      new Array<elements.Time>(
                        new elements.Time({
                          contents: [
                            [
                              [
                                [
                                  new elements.Beats({
                                    contents: ['4'],
                                  }),
                                  new elements.BeatType({
                                    contents: ['4'],
                                  }),
                                ],
                              ],
                              null,
                            ],
                          ],
                        })
                      ),
                      null, // elements.Staves
                      null, // elements.PartSymbol
                      null, // elements.Instruments
                      new Array<elements.Clef>(),
                      new Array<elements.StaffDetails>(),
                      new Array<elements.Transpose>(),
                      new Array<elements.Directive>(),
                      new Array<elements.MeasureStyle>(),
                    ],
                  }),
                  new elements.Note({
                    contents: [
                      [
                        null, // elements.TiedNote
                        new elements.Pitch({
                          contents: [
                            new elements.Step({
                              contents: ['C'],
                            }),
                            null, // elements.Alter
                            new elements.Octave({
                              contents: [4],
                            }),
                          ],
                        }),
                        new elements.Duration({
                          contents: [4],
                        }),
                        [], // elements.Tie,
                      ],
                      new Array<elements.Instrument>(),
                      null, // elements.Footnote
                      null, // elements.Level
                      null, // elements.Voice
                      null, // elements.Type
                      new Array<elements.Dot>(),
                      null, // elements.Accidental
                      null, // elements.TimeModification
                      null, // elements.Stem
                      null, // elements.Notehead
                      null, // elements.NoteheadText
                      null, // elements.Staff
                      [], // elements.Beam
                      new Array<elements.Notations>(),
                      new Array<elements.Lyric>(),
                      null, // elements.Play
                      null, // elements.Listen
                    ],
                  }),
                ],
              ],
            }),
          ]),
        ]);

      expect(musicXml.serialize()).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1">
      <part-name>Part 1</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
        </time>
      </attributes>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
      </note>
    </measure>
  </part>
</score-partwise>`);
    });
  });

  describe('parse', () => {
    it('preserves values of a valid MusicXML document', () => {
      const xmlStr = examples.loadExample(EXAMPLES.HELLO_WORLD);

      const musicXml = MusicXML.parse(xmlStr);
      expect(musicXml.getRoot()).toBeInstanceOf(elements.ScorePartwise);

      const scorePartwise = musicXml.getRoot();
      if (!asserts.isScorePartwise(scorePartwise)) {
        fail(`expected ScorePartwise, got: ${scorePartwise}`);
      }
      expect(scorePartwise.getVersion()).toBe('4.0');

      const partList = scorePartwise.getPartList();
      expect(partList).toBeInstanceOf(elements.PartList);

      const scorePart = partList.getScorePart();
      expect(scorePart).toBeInstanceOf(elements.ScorePart);
      expect(scorePart.getId()).toBe('P1');

      const partName = scorePart.getPartName();
      expect(partName).toBeInstanceOf(elements.PartName);
      expect(partName.getText()).toBe('Music');

      const parts = scorePartwise.getParts();
      expect(parts).toBeArray();
      expect(parts).toHaveLength(1);

      const part = parts[0];
      expect(part.getId()).toBe('P1');

      const measures = part.getMeasures();
      expect(measures).toBeArray();
      expect(measures).toHaveLength(1);

      const measure = measures[0];
      expect(measure).toBeInstanceOf(elements.MeasurePartwise);
      expect(measure.getNumber()).toBe('1');

      const measureValues = measure.getValues();
      expect(measureValues).toBeArray();
      expect(measureValues).toHaveLength(2);

      const attributes = measureValues[0];
      if (!asserts.isAttributes(attributes)) {
        fail(`expected Attributes, got: ${attributes}`);
      }

      const divisions = attributes.getDivisions();
      expect(divisions).toBeInstanceOf(elements.Divisions);
      expect(divisions!.getPositiveDivisions()).toBe(1);

      const keys = attributes.getKeys();
      expect(keys).toBeArray();
      expect(keys).toHaveLength(1);

      const key = keys[0];
      expect(key).toBeInstanceOf(elements.Key);

      const keyValue = key.getValue();
      if (!asserts.isTranditionalKey(keyValue)) {
        fail(`expected TraditionalKey, got: ${keyValue}`);
      }

      const fifths = keyValue[1];
      expect(fifths.getValue()).toBe(0);

      const times = attributes.getTimes();
      expect(times).toBeArray();
      expect(times).toHaveLength(1);

      const time = times[0];
      expect(time).toBeInstanceOf(elements.Time);

      const timeValue = time.getValue();
      if (!asserts.isTimeSignature(timeValue)) {
        fail(`expected TimeSignature, got: ${timeValue}`);
      }
      expect(timeValue).toBeArray();
      expect(timeValue).toHaveLength(2);

      const beats = timeValue[0][0][0];
      expect(beats).toBeInstanceOf(elements.Beats);
      expect(beats.getText()).toBe('4');

      const beatType = timeValue[0][0][1];
      expect(beatType).toBeInstanceOf(elements.BeatType);
      expect(beatType.getText()).toBe('4');

      const clefs = attributes.getClefs();
      expect(clefs).toBeArray();
      expect(clefs).toHaveLength(1);

      const clef = clefs[0];
      expect(clef).toBeInstanceOf(elements.Clef);

      const sign = clef.getSign();
      expect(sign).toBeInstanceOf(elements.Sign);
      expect(sign.getClefSign()).toBe('G');

      const line = clef.getLine();
      expect(line).toBeInstanceOf(elements.Line);
      expect(line!.getStaffLinePosition()).toBe(2);

      const note = measureValues[1];
      if (!asserts.isNote(note)) {
        fail(`expected Note, got: ${note}`);
      }

      const noteVariation = note.getVariation();
      expect(asserts.isTiedNote(noteVariation)).toBeTrue();
      expect(noteVariation).toBeArray();
      expect(noteVariation).toHaveLength(4);
      expect(noteVariation[0]).toBeNull();
      expect(noteVariation[1]).toBeInstanceOf(elements.Pitch);
      expect(noteVariation[2]).toBeInstanceOf(elements.Duration);
      expect(noteVariation[3]).toStrictEqual([]);

      const type = note.getType();
      expect(type).toBeInstanceOf(elements.Type);
      expect(type!.getNoteTypeValue()).toBe('whole');
    });

    it('replaces invalid values with zero values', () => {
      const xmlStr = examples.loadExample(EXAMPLES.PARTIALLY_INVALID);
      const musicXml = MusicXML.parse(xmlStr);

      const scorePartwise = musicXml.getRoot();
      if (!asserts.isScorePartwise(scorePartwise)) {
        fail(`expected ScorePartwise, got: ${scorePartwise}`);
      }

      const parts = scorePartwise.getParts();
      expect(parts).toHaveLength(1);

      const part = parts[0];
      const measures = part.getMeasures();
      expect(measures).toHaveLength(1);

      const measure = measures[0];
      const contents = measure.getValues();
      expect(contents).toHaveLength(2);

      const attributes = contents[0];
      if (!asserts.isAttributes(attributes)) {
        fail(`expected Attributes, got ${attributes}`);
      }

      const divisions = attributes.getDivisions();
      expect(divisions).not.toBeNull();
      expect(divisions!.getPositiveDivisions()).toBe(1);

      const note = contents[1];
      if (!asserts.isNote(note)) {
        fail(`expected Note, got ${note}`);
      }
      const noteVariation = note.getVariation();
      if (!asserts.isTiedNote(noteVariation)) {
        fail(`expected TiedNoteValue, got ${noteVariation}`);
      }

      const duration = noteVariation[2];
      expect(duration.getPositiveDivisions()).toBe(1);
    });

    it('throws an error when there are multiple score-partwise elements', () => {
      const xmlStr = examples.loadExample(EXAMPLES.INVALID_ROOT);
      expect(() => MusicXML.parse(xmlStr)).toThrowError();
    });
  });

  describe('createPartwise', () => {
    it('creates a MusicXML object with a ScorePartwise element as the root', () => {
      const musicXml = MusicXML.createPartwise();
      expect(musicXml.getRoot()).toBeInstanceOf(elements.ScorePartwise);
    });

    it('creates a valid MusicXML object', () => {
      const musicXml = MusicXML.createPartwise();
      const scorePartwise = musicXml.getRoot();
      expect(operations.validate(scorePartwise, elements.ScorePartwise)).toBeTrue();
    });

    it('creates a MusicXML object that serializes to a valid MusicXML document', async () => {
      const musicXml = MusicXML.createPartwise();
      await expect(musicXml.serialize()).toBeValidMusicXML();
    });
  });

  describe('createTimewise', () => {
    it('creates a MusicXML object with a ScoreTimewise element as the root', () => {
      const musicXml = MusicXML.createTimewise();
      expect(musicXml.getRoot()).toBeInstanceOf(elements.ScoreTimewise);
    });

    it('creates a valid MusicXML object', () => {
      const musicXml = MusicXML.createTimewise();
      const scoreTimewise = musicXml.getRoot();
      expect(operations.validate(scoreTimewise, elements.ScoreTimewise)).toBeTrue();
    });

    it('creates a MusicXML object that serializes to a valid MusicXML document', async () => {
      const musicXml = MusicXML.createTimewise();
      await expect(musicXml.serialize()).toBeValidMusicXML();
    });
  });

  describe('isScorePartwise', () => {
    it('asserts ScorePartwise elements', () => {
      expect(asserts.isScorePartwise(new elements.ScorePartwise())).toBeTrue();
    });

    it('refutes the ScorePartwise constructor', () => {
      expect(asserts.isScorePartwise(elements.ScorePartwise)).toBeFalse();
    });

    it('refutes non-ScorePartwise elements', () => {
      expect(asserts.isScorePartwise(new elements.ScoreTimewise())).toBeFalse();
    });
  });

  describe('isScoreTimewise', () => {
    it('asserts ScoreTimewise elements', () => {
      expect(asserts.isScoreTimewise(new elements.ScoreTimewise())).toBeTrue();
    });

    it('refutes the ScoreTimewise constructor', () => {
      expect(asserts.isScoreTimewise(elements.ScoreTimewise)).toBeFalse();
    });

    it('refutes non-ScoreTimewise elements', () => {
      expect(asserts.isScoreTimewise(new elements.ScorePartwise())).toBeFalse();
    });
  });

  describe('serialize', () => {
    it('serializes a valid MusicXML document', () => {
      const xmlStr = examples.loadExample(EXAMPLES.HELLO_WORLD);
      const musicXml = MusicXML.parse(xmlStr);
      expect(() => musicXml.serialize()).not.toThrow();
    });

    it('serializes an invalid MusicXML document into a valid document: %s', async () => {
      const xmlStr = examples.loadExample(EXAMPLES.MOSTLY_INVALID);
      const musicXml = MusicXML.parse(xmlStr);
      await expect(musicXml.serialize()).toBeValidMusicXML();
    });
  });
});
