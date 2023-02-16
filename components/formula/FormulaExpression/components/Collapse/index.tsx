import { ActionIcon, ActionIconProps, useMantineTheme } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useFormulasStore } from "modules/formulas";
import { FormulaExpression } from "modules/formulas/models";
import { selectToggleCollapseExpression } from "modules/formulas/selectors";
import { FormulaIndex } from "modules/formulas/types";
import { checkIsIndexEmpty } from "modules/formulas/utils";
import React, { FC } from "react";

interface Props extends ActionIconProps {
  index: FormulaIndex;
  expression: FormulaExpression;
}

export const FormulaExpressionCollapse: FC<Props> = ({
  index,
  expression,
  ...props
}) => {
  const theme = useMantineTheme();
  const toggleCollapseExpression = useFormulasStore(
    selectToggleCollapseExpression
  );

  const isCollapsed = expression.collapsed;
  const isIndexEmpty = checkIsIndexEmpty(index);

  const handleCollapse = () => {
    toggleCollapseExpression(index);
  };

  const Icon = isCollapsed ? IconPlus : IconMinus;

  return (
    <ActionIcon
      size={"lg"}
      disabled={isIndexEmpty}
      variant={isIndexEmpty ? "transparent" : "subtle"}
      onClick={handleCollapse}
      {...props}
    >
      <Icon size={theme.spacing.sm} />
    </ActionIcon>
  );
};
