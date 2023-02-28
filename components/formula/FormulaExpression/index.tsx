import { Collapse, Flex, Paper, PaperProps } from "@mantine/core";
import { useStyles } from "components/formula/FormulaExpression/styles";
import { FormulaSwitch } from "components/formula/FormulaSwitch";
import { FormulaProvider, useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import { selectIsExpressionSelected } from "modules/formulas/selectors";
import React, { FC } from "react";

import { FormulaExpressionControls } from "../FormulaExpressionControls";

type Props = PaperProps;

const FormulaExpression: FC<Props> = ({ className, ...props }) => {
  const { formula: expression, index: expressionIndex } = useFormulaContext(
    FormulaType.EXPRESSION
  );
  const isSelected = useFormulasStore((state) =>
    selectIsExpressionSelected(state, expression.id)
  );
  const isCollapsed = expression.collapsed;
  const formulas = expression.value;

  const { classes, cx } = useStyles();

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
        {formulas.map((formula, index) => {
          const parentIndexArray = Array.isArray(expressionIndex)
            ? expressionIndex
            : [expressionIndex];
          const currentIndex = [...parentIndexArray, index];

          return (
            <FormulaProvider
              formula={formula}
              index={currentIndex}
              key={formula.id}
            >
              <FormulaSwitch />
            </FormulaProvider>
          );
        })}
      </Collapse>
    </Paper>
  );
};

export default FormulaExpression;
