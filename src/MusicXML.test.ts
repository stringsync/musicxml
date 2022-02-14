import * as elements from './generated/elements';
import { MusicXML } from './MusicXML';
import { loadExample } from './testing/helpers';

describe('MusicXML', () => {
  describe('parse', () => {
    it('parses valid.xml', async () => {
      const xmlStr = await loadExample('valid.xml');

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

      const parts = scorePartwise.getParts();
      expect(parts).toBeArray();
      expect(parts).toHaveLength(1);

      const part = parts[0];
      expect(part.getId()).toBe('P1');

      const measures = part.getMeasures();
      expect(measures).toBeArray();
      expect(measures).toHaveLength(1);

      const measure = measures[0];
      expect(measure).toBeInstanceOf(elements.Measure);
      expect(measure.getNumber()).toBe('1');

      const measureContents = measure.getContents();
      expect(measureContents).toBeArray();
      expect(measureContents).toHaveLength(2);

      const attributes = measureContents[0];
      if (!(attributes instanceof elements.Attributes)) {
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
      if (!(note instanceof elements.Note)) {
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
  });

  describe('serialize', () => {
    it('serializes valid.xml', async () => {
      const xmlStr = await loadExample('valid.xml');
      const musicXml = MusicXML.parse(xmlStr);
      expect(musicXml.serialize()).toEqualXML(xmlStr);
    });
  });
});
