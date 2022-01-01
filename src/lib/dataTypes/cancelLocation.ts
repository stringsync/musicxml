import { t } from '../xml';

export const cancelLocation = () => t.choices('left' as const, 'right' as const, 'beforeBarline' as const);
