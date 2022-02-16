export const EXAMPLES = {
  VALID1: 'valid1.xml',
  VALID2: 'valid2.xml',
  VALID3: 'valid3.xml',
  INVALID1: 'invalid1.xml',
} as const;

export const EXAMPLE_SUITES = {
  VALID: [EXAMPLES.VALID1, EXAMPLES.VALID2, EXAMPLES.VALID3],
  INVALID: [EXAMPLES.INVALID1],
} as const;
