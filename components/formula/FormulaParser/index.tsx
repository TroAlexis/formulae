import { useFormulasStore } from "modules/formulas";
import { FormulaSlice } from "modules/formulas/models";
import { selectReplaceExpression } from "modules/formulas/selectors";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { parse } from "utils/serialize";

interface Props {}

export const FormulaParser: FC<Props> = ({}) => {
  const replaceExpression = useFormulasStore(selectReplaceExpression);
  const router = useRouter();

  const { formula } = router.query;

  useEffect(() => {
    if (formula && !Array.isArray(formula)) {
      const parsedFormula = parse<FormulaSlice>(formula);

      replaceExpression(undefined, parsedFormula);
    }
  }, [formula, replaceExpression]);

  return null;
};
