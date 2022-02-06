import { t } from '../xml';

export const caesuraValue = () => {
  return t.label({
    label: 'caesura-value',
    value: t.choices(...(['normal', 'thick', 'short', 'curved', 'single', ''] as const)),
  });
};
