import { FormulaSwitch } from "components/formula/FormulaSwitch";
import { FormulaProvider } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { selectFormulaSliceById } from "modules/formulas/selectors";
import React, { FC, useMemo } from "react";

interface Props {
  formulaIds: string[];
}

export const FormulaExpressionItems: FC<Props> = ({ formulaIds }) => {
  const formula = useMemo(() => <FormulaSwitch />, []);

  return (
    <>
      {formulaIds.map((formulaId) => {
        return (
          <FormulaProvider
            id={formulaId}
            key={formulaId}
            useStore={useFormulasStore}
            sliceSelector={selectFormulaSliceById}
          >
            {formula}
          </FormulaProvider>
        );
      })}
    </>
  );
};
