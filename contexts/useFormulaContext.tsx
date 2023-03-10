import { FormulaType } from "modules/formulas/enums";
import { Formula, FormulaByType, FormulaSlice } from "modules/formulas/models";
import { checkFormulaType } from "modules/formulas/utils/check";
import { MapStore, RecordKey } from "modules/map/models";
import { selectById } from "modules/map/selectors";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { Maybe } from "types/types";
import { StoreApi, UseBoundStore } from "zustand/esm";

export interface FormulaContext<T extends Formula = Formula> {
  formula: T;
  useStore: BoundStore<RecordKey, unknown>;
  selectSlice: (state: MapStore<any, any>) => Maybe<FormulaSlice<T>>;
}

type BoundStore<K extends RecordKey, V> = UseBoundStore<
  StoreApi<MapStore<K, V>>
>;

export interface FormulaProviderProps<K extends RecordKey, V> {
  id: string;
  useStore: BoundStore<K, V>;
  formulaSelector?: (state: MapStore<K, V>, id: string) => Maybe<Formula>;
  sliceSelector: (state: MapStore<K, V>, id: string) => Maybe<FormulaSlice>;
}

const FormulaContext = createContext<Maybe<FormulaContext>>(undefined);

export const FormulaProvider = <K extends RecordKey, V>({
  children,
  id,
  useStore,
  formulaSelector = selectById,
  sliceSelector,
}: PropsWithChildren<FormulaProviderProps<K, V>>) => {
  const selectFormula = useCallback(
    (state: MapStore<K, V>) => formulaSelector(state, id),
    [formulaSelector, id]
  );

  const selectSlice = useCallback(
    (state: MapStore<K, V>) => sliceSelector(state, id),
    [sliceSelector, id]
  );

  const formula = useStore(selectFormula);

  const value = useMemo(() => {
    if (formula) {
      return { formula, useStore: useStore, selectSlice };
    }

    return null;
  }, [formula, useStore, selectSlice]);

  if (!value) {
    return null;
  }

  return (
    <FormulaContext.Provider value={value}>{children}</FormulaContext.Provider>
  );
};

export const useFormulaContext = <T extends FormulaType>(type?: T) => {
  const context = useContext(FormulaContext);

  if (context === undefined) {
    throw new Error("useFormulaContext must be used within a FormulaProvider");
  }
  type TypeOfFormula = T extends FormulaType ? FormulaByType[T] : Formula;

  const { formula } = context;

  const isCorrectType = type ? checkFormulaType(formula, type) : true;

  if (!isCorrectType) {
    throw new Error(
      `useFormulaContext with type ${type} can't be used within ${formula.type}`
    );
  }

  return context as FormulaContext<TypeOfFormula>;
};
