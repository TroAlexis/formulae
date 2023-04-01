import { IconParentheses } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { selectWrapWithExpression } from "modules/formulas/selectors";
import React, { FC } from "react";

interface Props extends FormulaMenuItemProps {}

export const FormulaMenuWrapWithExpression: FC<Props> = (props) => {
  const wrapWithExpression = useFormulasStore(selectWrapWithExpression);

  const { formula } = useFormulaContext();
  const handleClick = () => {
    wrapWithExpression(formula.id);
  };

  return (
    <FormulaMenuItem onClick={handleClick} icon={IconParentheses} {...props}>
      Wrap with expression
    </FormulaMenuItem>
  );
};
