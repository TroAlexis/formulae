import { Menu } from "@mantine/core";
import { FormulaMenu } from "components/formula/FormulaMenu";
import { FormulaMenuFavorite } from "components/formula/FormulaMenu/components/Favorite";
import { FormulaMenuSelect } from "components/formula/FormulaMenu/components/Select";
import { FormulaMenuShare } from "components/formula/FormulaMenu/components/Share";
import { FormulaMenuProps } from "components/formula/FormulaMenu/models";
import { FormulaExpression } from "modules/formulas/models";
import { FormulaIndex } from "modules/formulas/types";
import React, { FC } from "react";

interface Props extends FormulaMenuProps {
  expression: FormulaExpression;
  index: FormulaIndex;
}

export const FormulaExpressionMenu: FC<Props> = ({
  expression,
  index,
  ...props
}) => {
  return (
    <FormulaMenu {...props}>
      <Menu.Label>Actions</Menu.Label>

      <FormulaMenuSelect index={index} />
      <FormulaMenuFavorite computable={expression} />
      <FormulaMenuShare computable={expression} />
    </FormulaMenu>
  );
};
