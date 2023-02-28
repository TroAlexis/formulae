import { IconFileArrowLeft } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import { FormulaExpression } from "modules/formulas/models";
import { selectReplaceExpression } from "modules/formulas/selectors";
import React, { FC } from "react";
import { parse } from "utils/serialize";

type Props = FormulaMenuItemProps;

export const FormulaMenuPaste: FC<Props> = (props) => {
  const replaceExpression = useFormulasStore(selectReplaceExpression);
  const { index } = useFormulaContext(FormulaType.EXPRESSION);

  const handleClick = async () => {
    const data = await navigator.clipboard.readText();

    const formula = parse<FormulaExpression>(data);

    replaceExpression(formula, index);
  };

  return (
    <FormulaMenuItem onClick={handleClick} icon={IconFileArrowLeft} {...props}>
      Paste formula
    </FormulaMenuItem>
  );
};
