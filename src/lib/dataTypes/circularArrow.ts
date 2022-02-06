import { t } from '../xml';

export const circularArrow = () => {
  return t.label({ label: 'circular-arrow', value: t.choices('anticlockwise' as const, 'clockwise' as const) });
};
