import type { en } from "./locales/en.ts";

// The shape every catalog must match: same keys as English; strings stay
// strings and functions keep their parameters
type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => string
    ? (...args: A) => string
    : { [K in keyof T]: Widen<T[K]> };

export type Messages = Widen<typeof en>;
