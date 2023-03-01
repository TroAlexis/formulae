import { FormulaSwitch } from "components/formula/FormulaSwitch";
import { FormulaProvider } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import React, { FC, memo, useMemo } from "react";

interface Props {
  formulaIds: string[];
}

export const FormulaExpressionItems: FC<Props> = memo(({ formulaIds }) => {
  const formula = useMemo(() => <FormulaSwitch />, []);

  return (
    <>
      {formulaIds.map((formulaId) => {
        return (
          <FormulaProvider
            id={formulaId}
            key={formulaId}
            useStore={useFormulasStore}
          >
            {formula}
          </FormulaProvider>
        );
      })}
    </>
  );
});

FormulaExpressionItems.displayName = "FormulaExpressionItems";
