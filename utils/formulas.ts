import { FormulaComputable, FormulaExpression } from "modules/formulas/models";

export const parseFormulaExpression = (formula: string) => {
  const decoded = atob(formula);

  return JSON.parse(decoded) as FormulaExpression;
};

export const serializeFormulaExpression = (formula: FormulaComputable) => {
  const stringified = JSON.stringify(formula);

  return btoa(stringified);
};
