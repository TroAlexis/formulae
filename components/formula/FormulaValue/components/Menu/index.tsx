import { FormulaMenu } from "components/formula/FormulaMenu";
import { FormulaMenuBind } from "components/formula/FormulaMenu/components/Bind";
import { FormulaMenuCopyId } from "components/formula/FormulaMenu/components/CopyId";
import { FormulaMenuWrapWithExpression } from "components/formula/FormulaMenu/components/WrapWithExpression";
import { HoverableRenderProps } from "components/ui/Hoverable/models";
import React, { FC } from "react";

interface Props extends HoverableRenderProps {}

export const FormulaValueMenu: FC<Props> = ({ className }) => {
  return (
    <FormulaMenu classNames={{ target: className }}>
      <FormulaMenuWrapWithExpression />
      <FormulaMenuCopyId />
      <FormulaMenuBind />
    </FormulaMenu>
  );
};
