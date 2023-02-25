import { Collapse, Flex, Paper, PaperProps } from "@mantine/core";
import { useStyles } from "components/formula/FormulaExpression/styles";
import { useFormulasStore } from "modules/formulas";
import { FormulaExpression } from "modules/formulas/models";
import { selectIsExpressionSelected } from "modules/formulas/selectors";
import { FormulaIndex } from "modules/formulas/types";
import {
  checkIsFormulaExpression,
  checkIsFormulaOperator,
  checkIsFormulaValue,
} from "modules/formulas/utils";
import React, { FC } from "react";

import { FormulaExpressionControls } from "../FormulaExpressionControls";
import FormulaOperator from "../FormulaOperator";
import FormulaValue from "../FormulaValue";

interface Props extends PaperProps {
  expression: FormulaExpression;
  parentIndex?: FormulaIndex;
}

const FormulaExpression: FC<Props> = ({
  expression,
  parentIndex = [],
  className,
  ...props
}) => {
  const isSelected = useFormulasStore((state) =>
    selectIsExpressionSelected(state, parentIndex)
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
      <FormulaExpressionControls
        px={"xs"}
        pt={"xs"}
        index={parentIndex}
        expression={expression}
      />

      <Collapse in={!isCollapsed} px={"xs"} pb={"sm"}>
        {formulas.map((formula, index) => {
          const parentIndexArray = Array.isArray(parentIndex)
            ? parentIndex
            : [parentIndex];
          const currentIndex = [...parentIndexArray, index];
          if (checkIsFormulaOperator(formula)) {
            return (
              <FormulaOperator
                index={currentIndex}
                operator={formula}
                key={formula.id}
              />
            );
          }
          if (checkIsFormulaValue(formula)) {
            return (
              <FormulaValue
                index={currentIndex}
                formulaValue={formula}
                key={formula.id}
              />
            );
          }

          if (checkIsFormulaExpression(formula)) {
            return (
              <FormulaExpression
                expression={formula}
                key={formula.id}
                parentIndex={currentIndex}
              />
            );
          }

          return null;
        })}
      </Collapse>
    </Paper>
  );
};

export default FormulaExpression;
