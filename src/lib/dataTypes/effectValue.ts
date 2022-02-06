import { t } from '../xml';

/**
 * The effect-value type represents pictograms for sound effect percussion instruments. The cannon, lotus flute, and
 * megaphone values are in addition to Stone's list.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/effect-value/}
 */
export const effectValue = () => {
  return t.label({
    label: 'effect-value',
    value: t.choices(
      ...([
        'anvil',
        'auto horn',
        'bird whistle',
        'cannon',
        'duck call',
        'gun shot',
        'klaxon horn',
        'lions roar',
        'lotus flute',
        'megaphone',
        'police whistle',
        'siren',
        'slide whistle',
        'thunder sheet',
        'wind machine',
        'wind whistle',
      ] as const)
    ),
  });
};
