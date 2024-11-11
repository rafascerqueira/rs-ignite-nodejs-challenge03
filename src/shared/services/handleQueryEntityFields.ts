/**
 * Exclude a set of keys from an object.
 *
 * Mutates the original object.
 *
 * @param obj The object to exclude keys from.
 * @param keys The keys to exclude.
 * @returns The original object with the keys excluded.
 */
export function excludeFields<T, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  if (!obj) {
    throw new Error("Object cannot be null or undefined");
  }
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>;
}

/**
 * Return a new object with only the specified keys.
 *
 * @param obj The object to pick from.
 * @param keys The keys to pick.
 * @returns A new object with only the specified keys.
 */
export function onlyFields<T, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  if (!obj) {
    throw new Error("Object cannot be null or undefined");
  }

  if (!Array.isArray(keys)) {
    throw new Error("Keys must be an array");
  }

  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key as K))
  ) as Pick<T, K>;
}
