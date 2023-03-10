type RecordKey = keyof any;

export const mergeMaps = <K extends RecordKey, V>(
  a: Record<K, V>,
  b: Record<K, V>
) => {
  Object.assign(a, b);
};

export const getMapItem = <K extends RecordKey, V>(
  key: K,
  map: Record<K, V>
) => {
  return map[key];
};

export const removeMapItem = <K extends RecordKey, V>(
  key: K,
  map: Record<K, V | undefined>
): V | undefined => {
  const item = map[key];

  map[key] = undefined;

  return item;
};

export const mapKeysToValues = <K extends RecordKey, V>(
  keys: K[],
  map: Record<K, V>
) => {
  return keys.map((key) => map[key]);
};
