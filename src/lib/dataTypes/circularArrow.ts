import { t } from '../xml';

export const circularArrow = () => t.choices('anticlockwise' as const, 'clockwise' as const);
