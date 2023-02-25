import { FormulaComputable } from "modules/formulas/models";
import { useRouter } from "next/router";
import { serializeFormulaExpression } from "utils/formulas";
import { getOrigin } from "utils/window";

export const useFormulaShare = (formula: FormulaComputable) => {
  const { basePath } = useRouter();

  const hostname = getOrigin();

  const serializedFormula = serializeFormulaExpression(formula);

  const link = `${hostname}${basePath}?formula=${serializedFormula}`;

  return { link };
};
