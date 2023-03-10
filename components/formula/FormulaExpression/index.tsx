import { Collapse, Flex, Paper, PaperProps } from "@mantine/core";
import { FormulaExpressionItems } from "components/formula/FormulaExpression/components/Items";
import { useStyles } from "components/formula/FormulaExpression/styles";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import { selectIsExpressionSelected } from "modules/formulas/selectors";
import React, { FC, useMemo } from "react";

import { FormulaExpressionControls } from "../FormulaExpressionControls";

type Props = PaperProps;

const FormulaExpression: FC<Props> = ({ className, ...props }) => {
  const { classes, cx } = useStyles();
  const { formula: expression } = useFormulaContext(FormulaType.EXPRESSION);
  const isSelected = useFormulasStore((state) =>
    selectIsExpressionSelected(state, expression.id)
  );
  const isCollapsed = expression.collapsed;

  const formulas = useMemo(() => [...expression.value], [expression.value]);

  return (
    <Paper
      component={Flex}
      className={cx(className, isSelected && classes.selected)}
      withBorder
      radius={"lg"}
      direction={"column"}
      {...props}
    >
      <FormulaExpressionControls px={"xs"} pt={"xs"} />

      <Collapse in={!isCollapsed} px={"xs"} pb={"sm"}>
        <FormulaExpressionItems formulaIds={formulas} />
      </Collapse>
    </Paper>
  );
};

export default FormulaExpression;
