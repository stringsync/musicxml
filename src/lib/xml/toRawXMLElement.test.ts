import { fromRawXMLElements } from './fromRawXMLElements';
import { t } from './t';
import { toRawXMLElement } from './toRawXMLElement';
import { RawXMLElement } from './types';
import * as xml from './xml';

describe('toRawXMLElement', () => {
  it('returns the raw elements that the xml elements came from', () => {
    const Foo = xml.element(
      'foo',
      { attributes: { foo: t.int() }, content: [t.oneOrMore(t.choices(t.constant('foo'), t.float()))] },
      {}
    );

    const rawElement: RawXMLElement = {
      type: 'element',
      name: 'foo',
      attributes: { foo: '42' },
      children: [
        { type: 'text', text: '4.2' },
        { type: 'text', text: 'foo' },
      ],
    };
    const element = fromRawXMLElements([rawElement], t.required(Foo));

    expect(toRawXMLElement(element)).toStrictEqual(rawElement);
  });
});
