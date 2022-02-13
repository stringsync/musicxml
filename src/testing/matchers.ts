import { diff } from 'jest-diff';
import fetch from 'node-fetch';
import * as xmlJs from 'xml-js';

const VALIDATE_URL = 'http://xmlvalidator:8080/validate';

type ValidationResponse =
  | { code: 'OK'; error: null }
  | { code: 'BAD_REQUEST'; error: string }
  | { code: 'VALIDATION_ERROR'; error: string }
  | { code: 'ERROR'; error: string };

const validate = async (xml: string): Promise<ValidationResponse> => {
  try {
    const res = await fetch(VALIDATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: xml,
    });
    return await res.json();
  } catch (e) {
    return { code: 'ERROR', error: String(e) };
  }
};

export const toBeValidMusicXML: jest.CustomMatcher = async function (xml: string) {
  const validation = await validate(xml);
  switch (validation.code) {
    case 'OK':
      return { message: () => `got unexpected success: code=${validation.code}`, pass: true };
    default:
      return { message: () => `${validation.code || 'UNKNOWN ERROR'}\n\n${validation.error}`, pass: false };
  }
};

const prettify = (xml: string): string => {
  const parsed = xmlJs.xml2js(xml);
  const serialized = xmlJs.js2xml(parsed, { spaces: 2 });
  return serialized;
};

export const toEqualXML: jest.CustomMatcher = function (received: string, expected: string) {
  const prettyReceived = prettify(received);
  const prettyExpected = prettify(expected);
  const pass = prettyReceived === prettyExpected;

  const message = pass
    ? () =>
        this.utils.matcherHint('toEqualXML') +
        '\n\n' +
        `Expected: not ${this.utils.printExpected(expected)}\n` +
        `Received: ${this.utils.printReceived(received)}`
    : () => {
        const diffString = diff(expected, received, {
          expand: this.expand,
        });
        return (
          this.utils.matcherHint('toBe') +
          '\n\n' +
          (diffString && diffString.includes('- Expect')
            ? `Difference:\n\n${diffString}`
            : `Expected: ${this.utils.printExpected(expected)}\n` + `Received: ${this.utils.printReceived(received)}`)
        );
      };

  return { actual: received, message, pass };
};
