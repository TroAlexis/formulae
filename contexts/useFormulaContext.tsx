import {
  Formula,
  FormulaByType,
  FormulasMapStore,
} from "modules/formula/models";
import { selectFormulaById } from "modules/formula/selectors";
import { FormulaType } from "modules/formulas/enums";
import { checkFormulaType } from "modules/formulas/utils/check";
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
  useStore: BoundStore;
}

type BoundStore = UseBoundStore<StoreApi<FormulasMapStore>>;

export interface FormulaProviderProps {
  id: string;
  useStore: BoundStore;
}

const FormulaContext = createContext<Maybe<FormulaContext>>(undefined);

export const FormulaProvider = ({
  children,
  id,
  useStore,
}: PropsWithChildren<FormulaProviderProps>) => {
  const selector = useCallback(
    (state: FormulasMapStore) => selectFormulaById(state, id),
    [id]
  );
  const formula = useStore(selector);

  const value = useMemo(() => {
    if (formula) {
      return { formula, useStore: useStore };
    }

    return null;
  }, [formula, useStore]);

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

  const isCorrectType = type
    ? checkFormulaType<TypeOfFormula>(formula, type)
    : true;

  if (!isCorrectType) {
    throw new Error(
      `useFormulaContext with type ${type} can't be used within ${formula.type}`
    );
  }

  return context as FormulaContext<TypeOfFormula>;
};
