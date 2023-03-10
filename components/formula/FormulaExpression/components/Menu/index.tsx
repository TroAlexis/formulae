import { Menu } from "@mantine/core";
import { FormulaMenu } from "components/formula/FormulaMenu";
import { FormulaMenuFavorite } from "components/formula/FormulaMenu/components/Favorite";
import { FormulaMenuPaste } from "components/formula/FormulaMenu/components/Paste";
import { FormulaMenuSelect } from "components/formula/FormulaMenu/components/Select";
import { FormulaMenuShare } from "components/formula/FormulaMenu/components/Share";
import { FormulaMenuProps } from "components/formula/FormulaMenu/models";
import React, { FC } from "react";

type Props = FormulaMenuProps;

export const FormulaExpressionMenu: FC<Props> = (props) => {
  return (
    <FormulaMenu {...props}>
      <Menu.Label>Actions</Menu.Label>

      <FormulaMenuSelect />
      <FormulaMenuFavorite />

      <Menu.Label>Share & reuse</Menu.Label>

      <FormulaMenuShare action={"link"} />
      <FormulaMenuShare action={"formula"} />
      <FormulaMenuPaste />
    </FormulaMenu>
  );
};
