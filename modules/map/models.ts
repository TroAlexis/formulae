export type RecordKey = number | string | symbol;

export type MapState<K extends RecordKey, V> = {
  map: Record<K, V>;
};

export type MapStore<K extends RecordKey, V> = MapState<K, V>;
