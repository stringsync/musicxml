export const EXAMPLES = {
  ACTOR_PRELUDE_SAMPLE: 'actor_prelude_sample.xml',
  ACTOR_PRELUDE_SAMPLE_PART_NAME: 'actor_prelude_sample_part_name.xml',
  APRES_UN_REVE: 'apres_un_reve.xml',
  BEETHOVEN_AN_DIE_FERNE_GELIEBTE: 'beethoven_an_die_ferne_geliebte.xml',
  CHOPIN_PRELUDE: 'chopin_prelude.xml',
  CONCERT_SCORE_AND_FOR_PART: 'concert_score_and_for_part.xml',
  EXPRESSION_TEST: 'expression_test.xml',
  HELLO_WORLD_MODIFIED: 'hello_world_modified.xml',
  HELLO_WORLD: 'hello_world.xml',
  MOSTLY_INVALID: 'mostly_invalid.xml',
  NOTE_VARIATIONS: 'note_variations.xml',
  PARTIALLY_INVALID: 'partially_invalid.xml',
  SIMPLE_TABLATURE: 'simple_tablature.xml',
  TUTORIAL_PERCUSSION: 'tutorial_percussion.xml',
  TUTOTRIAL_CHORD_SYMBOLS: 'tutorial_chord_symbols.xml',
  WANNA_SKIP_CLASS: 'wanna_skip_class.xml',
} as const;

export const EXAMPLE_SUITES = {
  GUITAR_PRO: [EXAMPLES.WANNA_SKIP_CLASS],
  OSMD: [
    EXAMPLES.ACTOR_PRELUDE_SAMPLE,
    EXAMPLES.ACTOR_PRELUDE_SAMPLE_PART_NAME,
    EXAMPLES.BEETHOVEN_AN_DIE_FERNE_GELIEBTE,
    EXAMPLES.EXPRESSION_TEST,
  ],
  W3: [
    EXAMPLES.APRES_UN_REVE,
    EXAMPLES.CONCERT_SCORE_AND_FOR_PART,
    EXAMPLES.HELLO_WORLD,
    EXAMPLES.HELLO_WORLD_MODIFIED,
    EXAMPLES.NOTE_VARIATIONS,
    EXAMPLES.SIMPLE_TABLATURE,
    EXAMPLES.TUTORIAL_PERCUSSION,
    EXAMPLES.TUTOTRIAL_CHORD_SYMBOLS,
  ],
} as const;
