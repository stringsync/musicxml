import { element } from './factory';

export type Matcher<T extends ReturnType<ReturnType<typeof element>>> = (element: T) => boolean;
