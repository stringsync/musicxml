import { t } from '../xml';

export const caesuraValue = () => {
  return t.choices(...(['normal', 'thick', 'short', 'curved', 'single', ''] as const));
};
