import { t } from '../xml';

export const metalValue = () => {
  return t.label({
    label: 'metal-value',
    value: t.choices(
      ...([
        'agogo',
        'almglocken',
        'bell',
        'bell plate',
        'bell tree',
        'brake drum',
        'cencerro',
        'chain rattle',
        'Chinese cymbal',
        'cowbell',
        'crash cymbals',
        'crotale',
        'cymbal tongs',
        'domed gong',
        'finger cymbals',
        'flexatone',
        'gong',
        'handbell',
        'hi-hat',
        'high-hat cymbals',
        'jaw harp',
        'jingle bells',
        'musical saw',
        'shell bells',
        'sistrum',
        'sizzle cymbal',
        'sleigh bells',
        'suspended cymbal',
        'tam tam',
        'tam tam with beater',
        'triangle',
        'Vietnamese hat',
      ] as const)
    ),
  });
};
