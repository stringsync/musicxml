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

export type Resolution =
  | {
      type: 'resolved';
      value: any;
    }
  | {
      type: 'zero';
      value: any;
    }
  | {
      type: 'none';
      value: undefined;
    };
