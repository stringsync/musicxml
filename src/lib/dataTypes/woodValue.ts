import { t } from '../xml';

export const woodValue = () => {
  return t.choices(
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
  );
};
