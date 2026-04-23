export const mergeOptimisticUpdates = <T extends { id: unknown }>(
  serverItems: T[],
  optimisticUpdates: Partial<T>[]
): T[] => {
  // Apply optimistic updates to server items
  let result = [...serverItems];

  optimisticUpdates.forEach((update) => {
    if (update.id) {
      const index = result.findIndex((item) => item.id === update.id);
      if (index !== -1) {
        // Update existing item
        result[index] = { ...result[index], ...update };
      } else {
        // Add new optimistic item
        result.push(update as T);
      }
    }
  });

  return result;
};