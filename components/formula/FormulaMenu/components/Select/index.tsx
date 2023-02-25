import { IconSelect } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulasStore } from "modules/formulas";
import {
  selectCurrentExpressionIndex,
  selectSetCurrentExpressionIndex,
} from "modules/formulas/selectors";
import { FormulaIndex } from "modules/formulas/types";
import { checkIndexesEqual } from "modules/formulas/utils";
import React, { FC } from "react";

interface Props extends FormulaMenuItemProps {
  index: FormulaIndex;
}

export const FormulaMenuSelect: FC<Props> = ({ index, ...props }) => {
  const setCurrentExpressionIndex = useFormulasStore(
    selectSetCurrentExpressionIndex
  );
  const currentExpressionIndex = useFormulasStore(selectCurrentExpressionIndex);
  const isActiveIndex = checkIndexesEqual(index, currentExpressionIndex);

  const onSelect = () => {
    setCurrentExpressionIndex(index);
  };

  return (
    <FormulaMenuItem
      onClick={onSelect}
      icon={IconSelect}
      disabled={isActiveIndex}
      {...props}
    >
      Select
    </FormulaMenuItem>
  );
};
