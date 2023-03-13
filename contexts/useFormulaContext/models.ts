import { Formula, FormulaSlice } from "modules/formulas/models";
import { MapStore, RecordKey } from "modules/map/models";
import { Maybe, PartialBy } from "types/types";
import { StoreApi, UseBoundStore } from "zustand";

export interface FormulaContext<T extends Formula = Formula> {
  formula: T;
  useStore: BoundStore<RecordKey, unknown>;
  selectSlice: (state: MapStore<any, any>) => Maybe<FormulaSlice<T>>;
}

export type FormulaContextProps = PartialBy<FormulaContext, "formula">;

type BoundStore<K extends RecordKey, V> = UseBoundStore<
  StoreApi<MapStore<K, V>>
>;

export interface FormulaProviderProps<K extends RecordKey, V> {
  id: string;
  useStore: BoundStore<K, V>;
  formulaSelector?: (state: MapStore<K, V>, id: string) => Maybe<Formula>;
  sliceSelector: (state: MapStore<K, V>, id: string) => Maybe<FormulaSlice>;
}
