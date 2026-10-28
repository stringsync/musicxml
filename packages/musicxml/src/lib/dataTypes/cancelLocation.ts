import { t } from '../schema';
export const cancelLocation = () => t.choices('left' as const, 'right' as const, 'beforeBarline' as const);
