import { t } from '../schema';
/**
 * Calendar dates are represented yyyy-mm-dd format, following ISO 8601. This is a W3C XML Schema date type, but without
 * the optional timezone data.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/yyyy-mm-dd/}
 */
export const yyyyMmDd = () => t.label({ label: 'yyyy-mm-dd', value: t.date() });
