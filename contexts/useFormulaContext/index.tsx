import {
  FormulaContext,
  FormulaContextProps,
  FormulaProviderProps,
} from "contexts/useFormulaContext/models";
import { validateFormulaContext } from "contexts/useFormulaContext/utils";
import { FormulaType } from "modules/formulas/enums";
import { Formula, FormulaByType } from "modules/formulas/models";
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

const FormulaContext = createContext<Maybe<FormulaContextProps>>(undefined);

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

  validateFormulaContext(type, context);

  type TypeOfFormula = T extends FormulaType ? FormulaByType[T] : Formula;

  return context as FormulaContext<TypeOfFormula>;
};
