import { ActionIcon, ActionIconProps, useMantineTheme } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import {
  selectRootExpressionId,
  selectToggleCollapseExpression,
} from "modules/formulas/selectors";
import React, { FC } from "react";

type Props = ActionIconProps;

export const FormulaExpressionCollapse: FC<Props> = (props) => {
  const theme = useMantineTheme();
  const { formula: expression } = useFormulaContext(FormulaType.EXPRESSION);
  const rootExpressionId = useFormulasStore(selectRootExpressionId);
  const toggleCollapseExpression = useFormulasStore(
    selectToggleCollapseExpression
  );

  const isCollapsed = expression.collapsed;

  const isDisabled = expression.id === rootExpressionId;

  const handleCollapse = () => {
    toggleCollapseExpression(expression.id);
  };

  const Icon = isCollapsed ? IconPlus : IconMinus;

  return (
    <ActionIcon
      size={"lg"}
      disabled={isDisabled}
      variant={isDisabled ? "transparent" : "subtle"}
      onClick={handleCollapse}
      {...props}
    >
      <Icon size={theme.spacing.sm} />
    </ActionIcon>
  );
};
