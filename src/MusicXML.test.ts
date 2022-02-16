import * as examples from './examples';
import { EXAMPLES, EXAMPLE_SUITES } from './examples';
import * as elements from './generated/elements';
import * as operations from './lib/operations';
import { MusicXML } from './MusicXML';

describe('MusicXML', () => {
  it.each(EXAMPLE_SUITES.VALID)('preserves a valid MusicXML document: %s', (example) => {
    const xmlStr = examples.loadExample(example);
    const musicXml = MusicXML.parse(xmlStr);
    expect(musicXml.serialize()).toEqualXML(xmlStr);
  });

  describe('parse', () => {
    it.each(EXAMPLE_SUITES.VALID)('parses valid MusicXML documents: %s', (example) => {
      const xmlStr = examples.loadExample(example);
      expect(() => MusicXML.parse(xmlStr)).not.toThrow();
    });

    it('preserves values of a valid MusicXML document', () => {
      const xmlStr = examples.loadExample(EXAMPLES.VALID1);

      const musicXml = MusicXML.parse(xmlStr);
      expect(musicXml.getRoot()).toBeInstanceOf(elements.ScorePartwise);

      const scorePartwise = musicXml.getRoot();
      if (!MusicXML.isScorePartwise(scorePartwise)) {
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

      const parts = scorePartwise.getPartsPartwise();
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

      const measureContents = measure.getContents();
      expect(measureContents).toBeArray();
      expect(measureContents).toHaveLength(2);

      const attributes = measureContents[0];
      if (!elements.MeasurePartwise.isAttributes(attributes)) {
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
      if (!elements.Key.isTraditionalKey(keyValue)) {
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
      if (!elements.Time.isTimeSignature(timeValue)) {
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

      const note = measureContents[1];
      if (!elements.MeasurePartwise.isNote(note)) {
        fail(`expected Note, got: ${note}`);
      }

      const noteValue = note.getValue();
      expect(elements.Note.isBasicNoteValue(noteValue)).toBeTrue();
      expect(noteValue).toBeArray();
      expect(noteValue).toHaveLength(4);
      expect(noteValue[0]).toBeNull();
      expect(noteValue[1]).toBeInstanceOf(elements.Pitch);
      expect(noteValue[2]).toBeInstanceOf(elements.Duration);
      expect(noteValue[3]).toStrictEqual([]);

      const type = note.getType();
      expect(type).toBeInstanceOf(elements.Type);
      expect(type!.getNoteTypeValue()).toBe('whole');
    });

    it('replaces invalid values with zero values', () => {
      // See musicxml/src/examples/invalid1.xml for invalid value locations.
      const xmlStr = examples.loadExample(EXAMPLES.INVALID1);
      const musicXml = MusicXML.parse(xmlStr);

      const scorePartwise = musicXml.getRoot();
      if (!MusicXML.isScorePartwise(scorePartwise)) {
        fail(`expected ScorePartwise, got: ${scorePartwise}`);
      }

      const parts = scorePartwise.getPartsPartwise();
      expect(parts).toHaveLength(1);

      const part = parts[0];
      const measures = part.getMeasures();
      expect(measures).toHaveLength(1);

      const measure = measures[0];
      const contents = measure.getContents();
      expect(contents).toHaveLength(2);

      const attributes = contents[0];
      if (!elements.MeasurePartwise.isAttributes(attributes)) {
        fail(`expected Attributes, got ${attributes}`);
      }

      const divisions = attributes.getDivisions();
      expect(divisions).toBeNull();

      const note = contents[1];
      if (!elements.MeasurePartwise.isNote(note)) {
        fail(`expected Note, got ${note}`);
      }
      const noteValue = note.getValue();
      if (!elements.Note.isBasicNoteValue(noteValue)) {
        fail(`expected BasicNoteValue, got ${noteValue}`);
      }

      const duration = noteValue[2];
      expect(duration.getPositiveDivisions()).toBe(1);
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
      expect(MusicXML.isScorePartwise(new elements.ScorePartwise())).toBeTrue();
    });

    it('refutes the ScorePartwise constructor', () => {
      expect(MusicXML.isScorePartwise(elements.ScorePartwise)).toBeFalse();
    });

    it('refutes non-ScorePartwise elements', () => {
      expect(MusicXML.isScorePartwise(new elements.ScoreTimewise())).toBeFalse();
    });
  });

  describe('isScoreTimewise', () => {
    it('asserts ScoreTimewise elements', () => {
      expect(MusicXML.isScoreTimewise(new elements.ScoreTimewise())).toBeTrue();
    });

    it('refutes the ScoreTimewise constructor', () => {
      expect(MusicXML.isScoreTimewise(elements.ScoreTimewise)).toBeFalse();
    });

    it('refutes non-ScoreTimewise elements', () => {
      expect(MusicXML.isScoreTimewise(new elements.ScorePartwise())).toBeFalse();
    });
  });

  describe('serialize', () => {
    it.each(EXAMPLE_SUITES.VALID)('serializes a valid MusicXML document: %s', (example) => {
      const xmlStr = examples.loadExample(example);
      const musicXml = MusicXML.parse(xmlStr);
      expect(() => musicXml.serialize()).not.toThrow();
    });

    it.each(EXAMPLE_SUITES.INVALID)(
      'serializes an invalid MusicXML document into a valid document: %s',
      async (example) => {
        const xmlStr = examples.loadExample(example);
        const musicXml = MusicXML.parse(xmlStr);
        await expect(musicXml.serialize()).toBeValidMusicXML();
      }
    );
  });
});
