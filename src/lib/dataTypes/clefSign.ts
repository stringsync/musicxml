import { t } from '../schema';
export const clefSign = () => {
  return t.label({
    label: 'clef-sign',
    value: t.choices(...(['G', 'F', 'C', 'percussion', 'TAB', 'jianpu', 'none'] as const)),
  });
};
