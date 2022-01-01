import { t } from '../xml';

export const breathMarkValue = () => {
  return t.choices(...(['comma', 'tick', 'upbow', 'salzedo', ''] as const));
};
