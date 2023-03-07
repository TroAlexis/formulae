import { MapStore, RecordKey } from "modules/map/models";
import { createSelector } from "reselect";
import { getMapItem } from "utils/map";

export type MapContent<S> = S extends MapStore<infer K, infer V>
  ? { key: K; value: V }
  : { key: never; value: never };

export const selectMap = <K extends RecordKey, V>(state: MapStore<K, V>) =>
  state.map;

export const createTypedSelectMap = <S>() => {
  type Map = MapContent<S>;

  return selectMap<Map["key"], Map["value"]>;
};

export const createSelectById = <S>() => {
  type Map = MapContent<S>;
  const getMap = selectMap<Map["key"], Map["value"]>;

  return createSelector([getMap, (_, id: string) => id], (map, id) =>
    getMapItem(id, map)
  );
};

export const selectById = createSelectById();
