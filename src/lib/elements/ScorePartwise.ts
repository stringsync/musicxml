import { Credit } from './Credit';
import { Defaults } from './Defaults';
import { element, t } from './factory';
import { Identification } from './Identification';
import { MovementNumber } from './MovementNumber';
import { MovementTitle } from './MovementTitle';
import { Part } from './Part';
import { PartList } from './PartList';
import { Work } from './Work';

export type ScorePartwise = ReturnType<typeof ScorePartwise>;

/**
 * Parent elements: None
 *
 * The <score-partwise> element is the root element for a partwise MusicXML score. It includes score header information
 * followed by a series of <part> elements with <measure> elements inside.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/score-partwise/}
 */
export const ScorePartwise = element(
  'score-partwise',
  {
    attributes: {
      version: t.constant('4.0' as const),
    },
    content: t.list(
      t.optional(Work),
      t.optional(MovementNumber),
      t.optional(MovementTitle),
      t.optional(Identification),
      t.optional(Defaults),
      t.zeroOrMore(Credit),
      t.required(PartList),
      t.oneOrMore(Part)
    ),
  },
  {
    getWork() {
      return this.content[0];
    },
    setWork(work: Work) {
      this.content[0] = work;
    },
    removeWork() {
      this.content[0] = null;
    },
    getMovementNumber() {
      return this.content[1];
    },
    setMovementNumber(movementNumber: MovementNumber) {
      this.content[1] = movementNumber;
    },
    removeMovementNumber() {
      this.content[1] = null;
    },
    getMovementTitle() {
      return this.content[2];
    },
    setMovementTitle(movementTitle: MovementTitle) {
      this.content[2] = movementTitle;
    },
    removeMovementTitle() {
      this.content[2] = null;
    },
    getIdentification() {
      return this.content[3];
    },
    setIdentification(identification: Identification) {
      this.content[3] = identification;
    },
    removeIdentification() {
      this.content[3] = null;
    },
    getDefaults() {
      this.content[4];
    },
    setDefaults(defaults: Defaults) {
      this.content[4] = defaults;
    },
    removeDefaults() {
      this.content[4] = null;
    },
    getCredits() {
      return this.content[5];
    },
    addCredit(credit: Credit) {
      this.content[5].push(credit);
    },
    removeCredit(credit: Credit) {
      this.content[5] = this.content[5].filter((c) => c !== credit);
    },
    getPartLists() {
      return this.content[6];
    },
    setPartList(partList: PartList) {
      this.content[6] = partList;
    },
  }
);
