import { t } from '../xml';

/**
 * Calendar dates are represented yyyy-mm-dd format, following ISO 8601. This is a W3C XML Schema date type, but without
 * the optional timezone data.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/yyyy-mm-dd/}
 */
// export const yyyyMmDdd = () => {
//   return t.custom({
//     zero: () => new Date(1970, 0, 1, 0, 0, 0, 0),
//     encode: (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
//     decode: (str: string) => new Date(str),
//     isValid: (date: Date) => date instanceof Date,
//   });
// };
export const yyyyMmDd = () => t.date();
