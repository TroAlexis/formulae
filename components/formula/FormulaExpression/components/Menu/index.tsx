import { Menu } from "@mantine/core";
import { FormulaMenu } from "components/formula/FormulaMenu";
import { FormulaMenuFavorite } from "components/formula/FormulaMenu/components/Favorite";
import { FormulaMenuSelect } from "components/formula/FormulaMenu/components/Select";
import { FormulaMenuProps } from "components/formula/FormulaMenu/models";
import { FormulaComputable } from "modules/formulas/models";
import { FormulaIndex } from "modules/formulas/types";
import React, { FC } from "react";

interface Props extends FormulaMenuProps {
  computable: FormulaComputable;
  index: FormulaIndex;
}

export const FormulaExpressionMenu: FC<Props> = ({
  computable,
  index,
  ...props
}) => {
  return (
    <FormulaMenu {...props}>
      <Menu.Label>Actions</Menu.Label>

      <FormulaMenuSelect index={index} />
      <FormulaMenuFavorite computable={computable} />
    </FormulaMenu>
  );
};
