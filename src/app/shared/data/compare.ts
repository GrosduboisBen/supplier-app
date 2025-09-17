/**
 * Returns an object containing only the fields from `updated` that have changed compared to `original`.
 *
 * @template T - The type of the objects being compared.
 * @param {Partial<T>} original - The original object to compare against.
 * @param {Partial<T>} updated - The updated object to compare.
 * @returns {Partial<T>} An object with the changed fields and their updated values.
 */
export function getChangedFields<T extends object>(original: Partial<T>, updated: Partial<T>): Partial<T> {
  const changes: Partial<T> = {};
  Object.keys(updated).forEach((key) => {
    const k = key as keyof T;
    if (updated[k] !== original[k]) {
      changes[k] = updated[k];
    }
  });
  return changes;
}
