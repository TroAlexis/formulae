import { ActionIcon, Flex, Text } from "@mantine/core";
import { IconCalculator, IconHash } from "@tabler/icons-react";
import React, { FC } from "react";

import { useFormulasStore } from "../../../modules/formulas";
import { FormulaOperatorType } from "../../../modules/formulas/enums";
import {
  selectAddFormula,
  selectCloseExpression,
  selectIsComputableAddable,
  selectIsExpressionCloseable,
  selectIsExpressionOpenable,
  selectIsOperatorAddable,
  selectOpenExpression,
} from "../../../modules/formulas/selectors";
import {
  createFormulaOperator,
  getBasicFormulaValue,
} from "../../../modules/formulas/utils";

interface Props {}

const FormulaCreatorControls: FC<Props> = ({}) => {
  const addFormula = useFormulasStore(selectAddFormula);
  const openExpression = useFormulasStore(selectOpenExpression);
  const closeExpression = useFormulasStore(selectCloseExpression);

  const isOperatorAddable = useFormulasStore(selectIsOperatorAddable);
  const isComputableAddable = useFormulasStore(selectIsComputableAddable);
  const isExpressionOpenable = useFormulasStore(selectIsExpressionOpenable);
  const isExpressionCloseable = useFormulasStore(selectIsExpressionCloseable);

  const addPlus = () =>
    addFormula(createFormulaOperator({ value: FormulaOperatorType.ADDITION }));

  const addValue = () => addFormula(getBasicFormulaValue());

  return (
    <Flex direction={"row"} gap={"xs"}>
      <ActionIcon
        size={"lg"}
        p={4}
        onClick={addValue}
        disabled={!isComputableAddable}
      >
        <IconHash />
      </ActionIcon>
      <ActionIcon
        size={"lg"}
        p={4}
        onClick={addPlus}
        disabled={!isOperatorAddable}
      >
        <IconCalculator />
      </ActionIcon>
      <ActionIcon
        size={"lg"}
        onClick={openExpression}
        disabled={!isExpressionOpenable}
      >
        <Text span ml={-2}>
          (
        </Text>
      </ActionIcon>
      <ActionIcon
        size={"lg"}
        disabled={!isExpressionCloseable}
        onClick={closeExpression}
      >
        <Text span mr={-2}>
          )
        </Text>
      </ActionIcon>
    </Flex>
  );
};

export default FormulaCreatorControls;
