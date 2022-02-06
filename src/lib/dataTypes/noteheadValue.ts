import { t } from '../xml';

export const noteheadValue = () => {
  return t.label({
    label: 'notehead-value',
    value: t.choices(
      ...([
        'other',
        'arrow down',
        'arrow up',
        'back slashed',
        'circle dot',
        'circle-x',
        'circled',
        'cluster',
        'cross',
        'diamond',
        'do',
        'fa',
        'fa up',
        'inverted triangle',
        'la',
        'left triangle',
        'mi',
        'none',
        'normal',
        're',
        'rectangle',
        'slash',
        'slashed',
        'so',
        'square',
        'ti',
        'triangle',
        'x',
      ] as const)
    ),
  });
};
