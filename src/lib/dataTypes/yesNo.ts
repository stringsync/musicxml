import { t } from '../xml';

/**
 * The yes-no type is used for boolean-like attributes. We cannot use W3C XML Schema booleans due to their restrictions
 * on expression of boolean values.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/yes-no/}
 */
export const yesNo = () => t.choices('yes' as const, 'no' as const);
