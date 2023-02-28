import { FormulaType } from "modules/formulas/enums";
import { Formula, FormulaByType } from "modules/formulas/models";
import { FormulaIndex } from "modules/formulas/types";
import { checkFormulaType } from "modules/formulas/utils";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { Maybe } from "types/types";

export interface FormulaContext<T extends Formula = Formula> {
  formula: T;
  index: FormulaIndex;
}

const FormulaContext = createContext<Maybe<FormulaContext>>(undefined);

export const FormulaProvider = ({
  children,
  formula,
  index,
}: PropsWithChildren<FormulaContext>) => {
  const value = useMemo(() => ({ formula, index }), [formula, index]);

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
