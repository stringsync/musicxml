import { ArrayMinSize, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Credit } from './Credit';
import { Defaults } from './Defaults';
import { Identification } from './Identification';
import { MovementNumber } from './MovementNumber';
import { MovementTitle } from './MovementTitle';
import { MusicXMLElement, MusicXMLNode } from './MusicXMLElement';
import { Part } from './Part';
import { PartList } from './PartList';
import { Work } from './Work';

export type ScorePartwiseProps = {
  work?: Work;
  movementNumber?: MovementNumber;
  movementTitle?: MovementTitle;
  identification?: Identification;
  defaults?: Defaults;
  credits?: Credit[];
  partList?: PartList;
  parts?: Part[];
};

/**
 * Parent elements: None
 *
 * The <score-partwise> element is the root element for a partwise MusicXML score. It includes score header information
 * followed by a series of <part> elements with <measure> elements inside.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/score-partwise/}
 */
export class ScorePartwise extends MusicXMLElement {
  /**
   * The version attribute was added in Version 1.1 for the score-partwise and score-timewise documents. It provides an
   * easier way to get version information than through the MusicXML public ID. The default value is 1.0 to make it
   * possible for programs that handle later versions to distinguish earlier version files reliably. Programs that write
   * MusicXML 1.1 or later files should set this attribute.
   */
  @IsOptional()
  readonly version = '4.0';

  @IsOptional()
  @ValidateNested()
  work?: Work;

  @IsOptional()
  @ValidateNested()
  movementNumber?: MovementNumber;

  @IsOptional()
  @ValidateNested()
  movementTitle?: MovementTitle;

  @IsOptional()
  @ValidateNested()
  identification?: Identification;

  @IsOptional()
  @ValidateNested()
  defaults?: Defaults;

  @ArrayMinSize(0)
  @ValidateNested()
  credits?: Credit[];

  @IsNotEmpty()
  @ValidateNested()
  partList?: PartList;

  @ArrayMinSize(1)
  @ValidateNested()
  parts?: Part[];

  constructor(props: ScorePartwiseProps = {}) {
    super();
    this.work = props.work;
    this.movementNumber = props.movementNumber;
    this.movementTitle = props.movementTitle;
    this.identification = props.identification;
    this.defaults = props.defaults;
    this.credits = props.credits;
    this.partList = props.partList;
    this.parts = props.parts;
  }

  toPOJO(): MusicXMLNode {
    const elements = new Array<MusicXMLNode>();
    if (this.work) {
      elements.push(this.work.toPOJO());
    }
    if (this.movementNumber) {
      elements.push(this.movementNumber.toPOJO());
    }
    if (this.movementTitle) {
      elements.push(this.movementTitle.toPOJO());
    }
    if (this.identification) {
      elements.push(this.identification.toPOJO());
    }
    if (this.defaults) {
      elements.push(this.defaults.toPOJO());
    }
    if (this.credits) {
      elements.push(...this.credits.map((credit) => credit.toPOJO()));
    }
    if (this.partList) {
      elements.push(this.partList.toPOJO());
    }
    if (this.parts) {
      elements.push(...this.parts.map((part) => part.toPOJO()));
    }
    return { type: 'element', name: 'score-partwise', attributes: { version: this.version }, elements };
  }
}
