import { t } from '../schema';
export const woodValue = () => {
  return t.label({
    label: 'wood-value',
    value: t.choices(
      ...([
        'bamboo scraper',
        'board clapper',
        'cabasa',
        'castanets',
        'castanets with handle',
        'claves',
        'footbal rattle',
        'guiro',
        'log drum',
        'maraca',
        'maracas',
        'quijada',
        'rainstick',
        'ratchet',
        'reco-reco',
        'sandpaper blocks',
        'slit drum',
        'temple block',
        'vibraslap',
        'whip',
        'wood block',
      ] as const)
    ),
  });
};
