import { Menu } from "@mantine/core";
import { FormulaMenu } from "components/formula/FormulaMenu";
import { FormulaMenuFavorite } from "components/formula/FormulaMenu/components/Favorite";
import { FormulaMenuProps } from "components/formula/FormulaMenu/models";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props extends FormulaMenuProps {
  computable: FormulaComputable;
}

export const FormulaExpressionMenu: FC<Props> = ({ computable, ...props }) => {
  return (
    <FormulaMenu {...props}>
      <Menu.Label>Actions</Menu.Label>

      <FormulaMenuFavorite computable={computable} />
    </FormulaMenu>
  );
};
