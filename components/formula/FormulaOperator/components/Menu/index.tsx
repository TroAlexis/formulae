import { Menu } from "@mantine/core";
import { FormulaMenu } from "components/formula/FormulaMenu";
import { HoverableRenderProps } from "components/ui/Hoverable/models";
import React, { FC } from "react";

interface Props extends HoverableRenderProps {}

export const FormulaOperatorMenu: FC<Props> = ({ className }) => {
  return (
    <FormulaMenu classNames={{ target: className }}>
      <Menu.Label>No actions available</Menu.Label>
    </FormulaMenu>
  );
};
