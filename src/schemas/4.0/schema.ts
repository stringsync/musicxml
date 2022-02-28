export const schema = {
  version: '4.0',
  states: {
    $init: [{ 'score-partwise': 1, 'score-timewise': 1 }],
    'score-partwise': [{ 'score-header': 1 }, { part: 1 }],
    'score-header': [{ work: 0, 'movement-number': 1 }],
  },
};
