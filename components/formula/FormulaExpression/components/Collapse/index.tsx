import { ActionIcon, ActionIconProps, useMantineTheme } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import { selectToggleCollapseExpression } from "modules/formulas/selectors";
import { checkIsIndexEmpty } from "modules/formulas/utils";
import React, { FC } from "react";

type Props = ActionIconProps;

export const FormulaExpressionCollapse: FC<Props> = (props) => {
  const theme = useMantineTheme();
  const { formula: expression, index } = useFormulaContext(
    FormulaType.EXPRESSION
  );
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
