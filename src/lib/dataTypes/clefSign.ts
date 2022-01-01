import { t } from '../xml';

export const clefSign = () => {
  return t.choices(...(['G', 'F', 'C', 'percussion', 'TAB', 'jianpu', 'none'] as const));
};
