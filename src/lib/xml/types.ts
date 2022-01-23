export type RawXMLElement =
  | {
      type: 'element';
      name: string;
      attributes: Record<string, string>;
      children: RawXMLElement[];
    }
  | {
      type: 'text';
      text: string;
    };

export type Parser = (xml: string) => RawXMLElement[];
