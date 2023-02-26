import { IconSelect } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulasStore } from "modules/formulas";
import { FormulaExpression } from "modules/formulas/models";
import {
  selectSelectedExpressionId,
  selectSetSelectedExpression,
} from "modules/formulas/selectors";
import React, { FC } from "react";

interface Props extends FormulaMenuItemProps {
  expression: FormulaExpression;
}

export const FormulaMenuSelect: FC<Props> = ({ expression, ...props }) => {
  const selectExpression = useFormulasStore(selectSetSelectedExpression);
  const selectedExpressionId = useFormulasStore(selectSelectedExpressionId);
  const isActive = expression.id === selectedExpressionId;

  const onSelect = () => {
    selectExpression(expression.id);
  };

  return (
    <FormulaMenuItem
      onClick={onSelect}
      icon={IconSelect}
      disabled={isActive}
      {...props}
    >
      Select
    </FormulaMenuItem>
  );
};
