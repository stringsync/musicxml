import * as elements from './generated/elements';
import { MusicXML } from './MusicXML';
import { loadExample } from './testing/helpers';

describe('MusicXML', () => {
  describe('parsePartwise', () => {
    it('can parse a valid example', async () => {
      const xmlStr = await loadExample('valid.xml');

      const scorePartwise = MusicXML.parsePartwise(xmlStr);
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

      const measureContents = measure.getContents();
      expect(measureContents).toBeArray();
      expect(measureContents).toHaveLength(2);

      const measureContent = measureContents[0];
      expect(measureContent).toBeInstanceOf(elements.Attributes);

      const attributes = measureContent as elements.Attributes;
      const divisions = attributes.getDivisions();
      expect(divisions).toBeInstanceOf(elements.Divisions);
      expect(divisions!.getPositiveDivisions()).toBe(1);

      const keys = attributes.getKeys();
      expect(keys).toBeArray();
      expect(keys).toHaveLength(1);

      const key = keys[0];
      expect(key).toBeInstanceOf(elements.Key);

      const keyValue = key.getValue();
      expect(keyValue).toBeArray();
      expect(keyValue).toHaveLength(3);
      expect(keyValue[0]).toBeNull();
      expect(keyValue[1]).toBeInstanceOf(elements.Fifths);
      expect(keyValue[2]).toBeNull();

      const fifths = keyValue[1] as elements.Fifths;
      expect(fifths.getValue()).toBe(0);

      const times = attributes.getTimes();
      expect(times).toBeArray();
      expect(times).toHaveLength(1);

      const time = times[0];
      expect(time).toBeInstanceOf(elements.Time);

      const timeValue = time.getValue();
      expect(timeValue).toBeArray();
      expect(timeValue).toHaveLength(2);

      const beats = (timeValue as [any, any])[0][0][0];
      expect(beats).toBeInstanceOf(elements.Beats);
      expect(beats.getText()).toBe('4');

      const beatType = (timeValue as [any, any])[0][0][1];
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
      expect(note).toBeInstanceOf(elements.Note);

      const noteValue = (note as elements.Note).getValue();
      expect(noteValue).toBeArray();
      expect(noteValue).toHaveLength(4);
      expect(noteValue[0]).toBeNull();
      expect(noteValue[1]).toBeInstanceOf(elements.Pitch);
      expect(noteValue[2]).toBeInstanceOf(elements.Duration);
      expect(noteValue[3]).toStrictEqual([]);

      const type = (note as elements.Note).getType();
      expect(type).toBeInstanceOf(elements.Type);
      expect(type!.getNoteTypeValue()).toBe('whole');
    });
  });
});
