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

type KeyBy<T, K extends keyof T> = T[K] extends RecordKey
  ? Record<T[K], T>
  : Record<string, never>;

export const checkIsRecordKey = (item: unknown): item is RecordKey => {
  return (
    typeof item === "number" ||
    typeof item === "string" ||
    typeof item === "symbol"
  );
};

export const keyBy = <T, K extends keyof T>(
  items: T[],
  key: T[K] extends RecordKey ? K : never
): KeyBy<T, K> => {
  return items.reduce<KeyBy<T, K>>((map, item) => {
    const mapKey = item[key];

    if (checkIsRecordKey(mapKey)) {
      (map as any)[mapKey] = item;
    }

    return map;
  }, {} as KeyBy<T, K>);
};
