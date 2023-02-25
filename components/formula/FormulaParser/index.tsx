import { useFormulasStore } from "modules/formulas";
import { selectReplaceExpression } from "modules/formulas/selectors";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { parseFormulaExpression } from "utils/formulas";

interface Props {}

export const FormulaParser: FC<Props> = ({}) => {
  const replaceExpression = useFormulasStore(selectReplaceExpression);
  const router = useRouter();

  const { formula } = router.query;

  useEffect(() => {
    if (formula && !Array.isArray(formula)) {
      const parsedFormula = parseFormulaExpression(formula);

      replaceExpression(parsedFormula);
    }
  }, [formula, replaceExpression]);

  return null;
};
