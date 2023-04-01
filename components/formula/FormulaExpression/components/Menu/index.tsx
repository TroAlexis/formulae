import { Menu } from "@mantine/core";
import { FormulaMenu } from "components/formula/FormulaMenu";
import { FormulaMenuCopyId } from "components/formula/FormulaMenu/components/CopyId";
import { FormulaMenuFavorite } from "components/formula/FormulaMenu/components/Favorite";
import { FormulaMenuPaste } from "components/formula/FormulaMenu/components/Paste";
import { FormulaMenuSelect } from "components/formula/FormulaMenu/components/Select";
import { FormulaMenuShare } from "components/formula/FormulaMenu/components/Share";
import { FormulaMenuWrapWithExpression } from "components/formula/FormulaMenu/components/WrapWithExpression";
import { FormulaMenuProps } from "components/formula/FormulaMenu/models";
import React, { FC } from "react";

type Props = FormulaMenuProps;

export const FormulaExpressionMenu: FC<Props> = (props) => {
  return (
    <FormulaMenu {...props}>
      <Menu.Label>Actions</Menu.Label>

      <FormulaMenuSelect />
      <FormulaMenuFavorite />
      <FormulaMenuWrapWithExpression />

      <Menu.Label>Share & reuse</Menu.Label>

      <FormulaMenuCopyId />
      <FormulaMenuShare action={"link"} />
      <FormulaMenuShare action={"formula"} />
      <FormulaMenuPaste />
    </FormulaMenu>
  );
};
