import { MapState, RecordKey } from "modules/map/models";
import { selectMap } from "modules/map/selectors";
import { removeMapItem } from "utils/map";

export const addToMap = <K extends RecordKey, V>(
  state: MapState<K, V>,
  key: K,
  value: V
) => {
  const map = selectMap(state);
  map[key] = value;
};

export const editInMap = <K extends RecordKey, V>(
  state: MapState<K, V>,
  key: K,
  edit: (value: V) => void
) => {
  const map = selectMap(state);
  const value = map[key];
  edit(value);
};

export const deleteFromMap = <K extends RecordKey, V>(
  state: MapState<K, V>,
  key: K
) => {
  const map = selectMap(state);
  return removeMapItem(key, map);
};

export const clearMap = <K extends RecordKey, V>(state: MapState<K, V>) => {
  state.map = {} as typeof state.map;
};
