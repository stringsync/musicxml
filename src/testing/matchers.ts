import fetch from 'node-fetch';

const VALIDATE_URL = 'http://xmlvalidator:8080/validate';

type ValidationResponse =
  | { code: 'OK'; error: null }
  | { code: 'BAD_REQUEST'; error: string }
  | { code: 'VALIDATION_ERROR'; error: string };

const validate = async (xml: string): Promise<ValidationResponse> => {
  const res = await fetch(VALIDATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: xml,
  });
  return await res.json();
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
