import { t, xml } from '../xml';
import { Credit } from './Credit';
import { Defaults } from './Defaults';
import { Identification } from './Identification';
import { MovementNumber } from './MovementNumber';
import { MovementTitle } from './MovementTitle';
import { Part } from './Part';
import { PartList } from './PartList';
import { Work } from './Work';

/**
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
      this.content[4];
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
    getPartLists() {
      return this.content[6];
    },
    setPartList(partList: PartList) {
      this.content[6] = partList;
    },
  }
);
