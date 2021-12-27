import { IsNotEmpty, IsOptional } from 'class-validator';
import { ValidationError } from '../errors/ValidationError';
import { MusicXMLElement, MusicXMLNode } from './MusicXMLElement';

type DummyProps = {
  text?: string;
  dummy?: Dummy;
};

class Dummy extends MusicXMLElement {
  @IsNotEmpty()
  text?: string;

  @IsOptional()
  dummy?: Dummy;

  constructor(props: DummyProps = {}) {
    super();
    this.text = props.text;
    this.dummy = props.dummy;
  }

  toPOJO(): MusicXMLNode {
    const elements = new Array<MusicXMLNode>();
    if (this.text) {
      elements.push({ type: 'text', text: this.text });
    }
    if (this.dummy) {
      elements.push(this.dummy.toPOJO());
    }
    return { type: 'element', name: 'dummy', elements };
  }
}

describe('MusicXMLElement', () => {
  describe('validate', () => {
    it('honors class-validator decorators', () => {
      const dummy1 = new Dummy({ text: '' });
      expect(() => dummy1.validate()).toThrow(ValidationError);

      const dummy2 = new Dummy({ text: 'hello' });
      expect(() => dummy2.validate()).not.toThrow();
    });
  });

  describe('isValid', () => {
    it('returns true when the element is valid', () => {
      const dummy = new Dummy({ text: 'hello' });
      expect(dummy.isValid()).toBeTrue();
    });

    it('returns false when the element is invalid', () => {
      const dummy = new Dummy({ text: '' });
      expect(dummy.isValid()).toBeFalse();
    });
  });

  describe('toString', () => {
    it('renders simple xml', () => {
      const dummy = new Dummy({ text: 'hello' });
      expect(dummy.toString()).toBe('<dummy>hello</dummy>');
    });

    it('renders nested xml', () => {
      const dummy = new Dummy({ text: 'hello', dummy: new Dummy({ text: 'world' }) });
      expect(dummy.toString()).toBe('<dummy>hello<dummy>world</dummy></dummy>');
    });
  });
});
