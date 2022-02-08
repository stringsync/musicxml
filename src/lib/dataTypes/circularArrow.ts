import { t } from '../schema';
export const circularArrow = () => {
  return t.label({ label: 'circular-arrow', value: t.choices('anticlockwise' as const, 'clockwise' as const) });
};
