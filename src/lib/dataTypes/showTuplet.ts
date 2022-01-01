import { t } from '../xml';

/**
 * The show-tuplet type indicates whether to show a part of a tuplet relating to the tuplet-actual element, both the
 * tuplet-actual and tuplet-normal elements, or neither.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/show-tuplet/}
 */
export const showTuplet = () => t.choices(...(['none', 'actual', 'both'] as const));
