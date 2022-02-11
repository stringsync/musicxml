import { ScorePartwise, ScoreTimewise } from './generated/elements';
import { t } from './lib/schema';
import * as xml from './lib/xml';

export class MusicXML {
  static parse(xmlStr: string): ScorePartwise | ScoreTimewise {
    const rawXmlElements = xml.parse(xmlStr);
    const xmlElements = xml.fromRawXMLElements(rawXmlElements, [t.choices(ScorePartwise, ScoreTimewise)]);
    return xmlElements[0] as ScorePartwise | ScoreTimewise;
  }

  static parsePartwise(xmlStr: string): ScorePartwise {
    const rawXmlElements = xml.parse(xmlStr);
    const xmlElements = xml.fromRawXMLElements(rawXmlElements, [t.required(ScorePartwise)]);
    return xmlElements[0] as ScorePartwise;
  }

  static parseTimewise(xmlStr: string): ScoreTimewise {
    const rawXmlElements = xml.parse(xmlStr);
    const xmlElements = xml.fromRawXMLElements(rawXmlElements, [t.required(ScoreTimewise)]);
    return xmlElements[0] as ScoreTimewise;
  }

  private constructor() {
    // noop
  }
}
