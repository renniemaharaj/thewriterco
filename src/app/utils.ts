/**
 *
 * @param key Key of the local storage object
 * @param initialState Initial state of the object
 * @returns Combined localstorage data and initial state using spread operator
 */
export function initialStateWithLocalStorage<T>(
  key: string,
  initialState: T,
): T {
  const cacheData = localStorage.getItem(key);
  if (cacheData) {
    return { ...initialState, ...JSON.parse(cacheData) };
  }
  return initialState;
}
