import { useStyles } from "components/formula/FormulaCreator/Expression/styles";
import FormulaExpression from "components/formula/FormulaExpression";
import { FormulaProvider } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { selectRootExpressionId } from "modules/formulas/selectors";
import React, { FC } from "react";

export const FormulaCreatorExpression: FC = ({}) => {
  const rootExpressionId = useFormulasStore(selectRootExpressionId);
  const { classes } = useStyles();

  return (
    <FormulaProvider id={rootExpressionId} useStore={useFormulasStore}>
      <FormulaExpression className={classes.scroll} />
    </FormulaProvider>
  );
};
