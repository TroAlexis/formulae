import { CalculatorIcon, HashtagIcon } from "@heroicons/react/24/outline";
import {
  ActionIcon,
  Container,
  Divider,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import React, { FC } from "react";

import { useFormulasStore } from "../../modules/formulas";
import { FormulaOperatorType, FormulaType } from "../../modules/formulas/enums";
import { Formula } from "../../modules/formulas/models";
import {
  selectAddFormula,
  selectFormulas,
  selectFormulasResult,
  selectIsComputableAddable,
  selectIsExpressionCloseable,
  selectIsExpressionOpenable,
  selectIsOperatorAddable,
} from "../../modules/formulas/selectors";
import { FormulaIndex } from "../../modules/formulas/types";
import {
  checkIsFormulaExpression,
  checkIsFormulaOperator,
  checkIsFormulaValue,
  getBasicFormulaValue,
} from "../../modules/formulas/utils";
import FormulaOperator from "../FormulaOperator";
import FormulaValue from "../FormulaValue";

interface Props {}

export const FormulaCreator: FC<Props> = ({}) => {
  const formulas = useFormulasStore(selectFormulas);
  const addFormula = useFormulasStore(selectAddFormula);
  const result = useFormulasStore(selectFormulasResult);
  const isOperatorAddable = useFormulasStore(selectIsOperatorAddable);
  const isComputableAddable = useFormulasStore(selectIsComputableAddable);
  const isExpressionOpenable = useFormulasStore(selectIsExpressionOpenable);
  const isExpressionCloseable = useFormulasStore(selectIsExpressionCloseable);

  const addPlus = () =>
    addFormula({
      type: FormulaType.OPERATOR,
      value: FormulaOperatorType.ADDITION,
    });

  const addOne = () => addFormula(getBasicFormulaValue());

  const renderFormulas = (
    formulas: Formula[],
    parentIndex: FormulaIndex = []
  ) => {
    return formulas.map((formula, index) => {
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
          <div key={formula.id}>
            ({renderFormulas(formula.value, currentIndex)})
          </div>
        );
      }

      return null;
    });
  };

  return (
    <Container size={"xs"}>
      <Flex direction={"column"}>{renderFormulas(formulas)}</Flex>

      <Divider label={"Result: "} my={"lg"} />
      <Title align={"center"} size={"h1"}>
        {result.value}
      </Title>
      <Divider label={"Add: "} my={"lg"} />

      <Flex direction={"row"} gap={"xs"}>
        <ActionIcon
          size={"lg"}
          p={4}
          onClick={addOne}
          disabled={!isComputableAddable}
        >
          <HashtagIcon />
        </ActionIcon>
        <ActionIcon
          size={"lg"}
          p={4}
          onClick={addPlus}
          disabled={!isOperatorAddable}
        >
          <CalculatorIcon />
        </ActionIcon>
        <ActionIcon size={"lg"} disabled={!isExpressionOpenable}>
          <Text span ml={-2}>
            (
          </Text>
        </ActionIcon>
        <ActionIcon size={"lg"} disabled={!isExpressionCloseable}>
          <Text span mr={-2}>
            )
          </Text>
        </ActionIcon>
      </Flex>
    </Container>
  );
};
