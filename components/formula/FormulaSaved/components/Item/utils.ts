import { FormulaComputable } from "modules/formulas/models";
import { getComputableShortId } from "modules/formulas/utils";

export const getFormulaName = (formula: FormulaComputable) => {
  return formula.name || `Formula: ${getComputableShortId(formula)}`;
};
