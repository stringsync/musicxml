export const EXAMPLES = {
  APRES_UN_REVE: 'apres_un_reve.xml',
  CHOPIN_PRELUDE: 'chopin_prelude.xml',
  CONCERT_SCORE_AND_FOR_PART: 'concert_score_and_for_part.xml',
  HELLO_WORLD_MODIFIED: 'hello_world_modified.xml',
  HELLO_WORLD: 'hello_world.xml',
  MOSTLY_INVALID: 'mostly_invalid.xml',
  NOTE_VARIATIONS: 'note_variations.xml',
  PARTIALLY_INVALID: 'partially_invalid.xml',
  SIMPLE_TABLATURE: 'simple_tablature.xml',
  TUTOTRIAL_CHORD_SYMBOLS: 'tutorial_chord_symbols.xml',
  TUTORIAL_PERCUSSION: 'tutorial_percussion.xml',
  WANNA_SKIP_CLASS: 'wanna_skip_class.xml',
} as const;

export const EXAMPLE_SUITES = {
  VALID: [
    EXAMPLES.HELLO_WORLD,
    EXAMPLES.CHOPIN_PRELUDE,
    EXAMPLES.CONCERT_SCORE_AND_FOR_PART,
    EXAMPLES.HELLO_WORLD_MODIFIED,
    EXAMPLES.APRES_UN_REVE,
    EXAMPLES.TUTORIAL_PERCUSSION,
    EXAMPLES.NOTE_VARIATIONS,
    EXAMPLES.WANNA_SKIP_CLASS,
    EXAMPLES.SIMPLE_TABLATURE,
    EXAMPLES.TUTOTRIAL_CHORD_SYMBOLS,
  ],
  INVALID: [EXAMPLES.MOSTLY_INVALID, EXAMPLES.PARTIALLY_INVALID],
  GUITAR_PRO: [],
} as const;
