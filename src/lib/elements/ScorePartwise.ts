import { t, xml } from '../xml';
import { Credit } from './Credit';
import { Defaults } from './Defaults';
import { Identification } from './Identification';
import { Measure } from './Measure';
import { MovementNumber } from './MovementNumber';
import { MovementTitle } from './MovementTitle';
import { Part } from './Part';
import { PartList } from './PartList';
import { Work } from './Work';

/**
 * The `<score-partwise>` element
 *
 * Parent elements: None
 *
 * The `<score-partwise>` element is the root element for a partwise MusicXML score. It includes score header
 * information followed by a series of `<part>` elements with `<measure>` elements inside.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/score-partwise/}
 */
export type ScorePartwise = ReturnType<typeof ScorePartwise>;

export const ScorePartwise = xml.element(
  'score-partwise',
  {
    attributes: {
      /**
       * The version attribute was added in Version 1.1 for the score-partwise and score-timewise documents. It provides
       * an easier way to get version information than through the MusicXML public ID. The default value is 1.0 to make
       * it possible for programs that handle later versions to distinguish earlier version files reliably. Programs
       * that write MusicXML 1.1 or later files should set this attribute.
       */
      version: t.constant('4.0' as const),
    },
    content: [
      t.optional(Work),
      t.optional(MovementNumber),
      t.optional(MovementTitle),
      t.optional(Identification),
      t.optional(Defaults),
      t.zeroOrMore(Credit),
      t.required(PartList),
      t.oneOrMore(Part),
      t.oneOrMore(Measure),
    ] as const,
  },
  {
    getWork() {
      return this.content[0];
    },
    setWork(work: Work) {
      this.content[0] = work;
    },
    getMovementNumber() {
      return this.content[1];
    },
    setMovementNumber(movementNumber: MovementNumber) {
      this.content[1] = movementNumber;
    },
    getMovementTitle() {
      return this.content[2];
    },
    setMovementTitle(movementTitle: MovementTitle) {
      this.content[2] = movementTitle;
    },
    getIdentification() {
      return this.content[3];
    },
    setIdentification(identification: Identification) {
      this.content[3] = identification;
    },
    getDefaults() {
      return this.content[4];
    },
    setDefaults(defaults: Defaults) {
      this.content[4] = defaults;
    },
    getCredits() {
      return this.content[5];
    },
    setCredits(credits: Credit[]) {
      this.content[5] = credits;
    },
    getPartList() {
      return this.content[6];
    },
    setPartList(partList: PartList) {
      this.content[6] = partList;
    },
    getParts() {
      return this.content[7];
    },
    setParts(parts: [Part, ...Part[]]) {
      this.content[7] = parts;
    },
    getMeasures() {
      return this.content[8];
    },
    setMeasures(measures: [Measure, ...Measure[]]) {
      this.content[8] = measures;
    },
  }
);
