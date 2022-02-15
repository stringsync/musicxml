export const EXAMPLES = {
  VALID1: 'valid1.xml',
  INVALID1: 'invalid1.xml',
} as const;

export const EXAMPLE_SUITES = {
  VALID: [EXAMPLES.VALID1],
  INVALID: [EXAMPLES.INVALID1],
} as const;
