import { IconSelect } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import {
  selectSelectedExpressionId,
  selectSetSelectedExpressionId,
} from "modules/formulas/selectors";
import React, { FC } from "react";

type Props = FormulaMenuItemProps;

export const FormulaMenuSelect: FC<Props> = (props) => {
  const { formula: expression } = useFormulaContext(FormulaType.EXPRESSION);
  const selectExpressionId = useFormulasStore(selectSetSelectedExpressionId);
  const selectedExpressionId = useFormulasStore(selectSelectedExpressionId);
  const isActive = expression.id === selectedExpressionId;

  const onSelect = () => {
    selectExpressionId(expression.id);
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
