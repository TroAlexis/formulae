import { Flex, Paper, PaperProps, ScrollArea } from "@mantine/core";
import React, { FC } from "react";

import { FormulaExpression } from "../../../modules/formulas/models";
import { FormulaIndex } from "../../../modules/formulas/types";
import {
  checkIsFormulaExpression,
  checkIsFormulaOperator,
  checkIsFormulaValue,
} from "../../../modules/formulas/utils";
import { FormulaNameControl } from "../FormulaNameControl";
import FormulaOperator from "../FormulaOperator";
import FormulaValue from "../FormulaValue";

interface Props extends PaperProps {
  expression: FormulaExpression;
  parentIndex?: FormulaIndex;
}

const FormulaExpression: FC<Props> = ({
  expression,
  parentIndex = [],
  ...props
}) => {
  const formulas = expression.value;

  return (
    <Paper
      component={Flex}
      shadow={"xs"}
      withBorder
      p={"xs"}
      radius={"lg"}
      direction={"column"}
      {...props}
    >
      <FormulaNameControl index={parentIndex} computable={expression} />

      <ScrollArea>
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
      </ScrollArea>
    </Paper>
  );
};

export default FormulaExpression;
