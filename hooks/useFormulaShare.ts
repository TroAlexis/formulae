import { FormulaComputable } from "modules/formulas/models";
import { useRouter } from "next/router";
import { serialize } from "utils/serialize";
import { getOrigin } from "utils/window";

export const useFormulaShare = (formula: FormulaComputable) => {
  const { basePath } = useRouter();

  const hostname = getOrigin();

  const serializedFormula = serialize(formula);

  const link = `${hostname}${basePath}?formula=${serializedFormula}`;

  return { link };
};
