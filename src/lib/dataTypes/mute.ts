import { t } from '../xml';

/**
 * The mute type represents muting playback for different instruments, including brass, winds, and strings. The on and
 * off values are used for undifferentiated mutes. The remaining values represent specific mutes.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/mute/}
 */
export const mute = () => {
  return t.choices(
    ...([
      'on',
      'off',
      'bucket',
      'cup',
      'echo',
      'harmon-no-stem',
      'harmon-stem',
      'hat',
      'palm',
      'plunger',
      'practice',
      'solotone',
      'stop-hand',
      'stop-mute',
      'straight',
    ] as const)
  );
};
