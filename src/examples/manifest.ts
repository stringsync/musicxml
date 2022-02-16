export const EXAMPLES = {
  VALID1: 'valid1.xml',
  VALID2: 'valid2.xml',
  VALID3: 'valid3.xml',
  VALID4: 'valid4.xml',
  VALID5: 'valid5.xml',
  INVALID1: 'invalid1.xml',
  INVALID2: 'invalid2.xml',
} as const;

export const EXAMPLE_SUITES = {
  VALID: [EXAMPLES.VALID1, EXAMPLES.VALID2, EXAMPLES.VALID3, EXAMPLES.VALID4, EXAMPLES.VALID5],
  INVALID: [EXAMPLES.INVALID1, EXAMPLES.INVALID2],
} as const;
