import { t } from '../schema';
export const breathMarkValue = () => {
  return t.label({
    label: 'breath-mark-value',
    value: t.choices(...(['comma', 'tick', 'upbow', 'salzedo', ''] as const)),
  });
};
