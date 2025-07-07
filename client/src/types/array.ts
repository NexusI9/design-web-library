export type EnsureAll<T, U extends T[] = T[]> =
  Exclude<T, U[number]> extends never
    ? U[number][] extends T[]
      ? U
      : never
    : never;
