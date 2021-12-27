import * as classValidator from 'class-validator';
import * as xmlJs from 'xml-js';
import { ValidationError } from './errors';

export type MusicXMLNode =
  | {
      type: 'element';
      name: string;
      attributes?: xmlJs.Attributes;
      elements?: MusicXMLNode[];
    }
  | {
      type: 'text';
      text: string;
    };

export abstract class MusicXMLElement {
  abstract toPOJO(): MusicXMLNode;

  toString() {
    const pojo = this.toPOJO();
    const xml = xmlJs.js2xml({ elements: [pojo] });
    return xml.toString();
  }

  validate() {
    const messages = this.getErrorMessages();
    if (messages.length > 0) {
      throw new ValidationError(messages);
    }
  }

  isValid() {
    const messages = this.getErrorMessages();
    return messages.length === 0;
  }

  private getErrorMessages(): string[] {
    const errors = classValidator.validateSync(this);
    return this.toMessages(errors);
  }

  private toMessages(errors: classValidator.ValidationError[]): string[] {
    return errors.flatMap((error) => [error.toString(true, true), ...this.toMessages(error.children || [])]);
  }
}
