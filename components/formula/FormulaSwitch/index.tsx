import FormulaExpression from "components/formula/FormulaExpression";
import FormulaOperator from "components/formula/FormulaOperator";
import FormulaValue from "components/formula/FormulaValue";
import { useFormulaContext } from "contexts/useFormulaContext";
import {
  checkIsFormulaExpression,
  checkIsFormulaOperator,
  checkIsFormulaValue,
} from "modules/formulas/utils";
import React, { FC } from "react";

export const FormulaSwitch: FC = ({}) => {
  const { formula } = useFormulaContext();

  if (checkIsFormulaOperator(formula)) {
    return <FormulaOperator />;
  }
  if (checkIsFormulaValue(formula)) {
    return <FormulaValue />;
  }

  if (checkIsFormulaExpression(formula)) {
    return <FormulaExpression />;
  }

  return null;
};
