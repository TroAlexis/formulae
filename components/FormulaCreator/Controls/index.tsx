import { CalculatorIcon, HashtagIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Flex, Text } from "@mantine/core";
import React, { FC } from "react";

import { useFormulasStore } from "../../../modules/formulas";
import {
  FormulaOperatorType,
  FormulaType,
} from "../../../modules/formulas/enums";
import {
  selectAddFormula,
  selectIsComputableAddable,
  selectIsExpressionCloseable,
  selectIsExpressionOpenable,
  selectIsOperatorAddable,
} from "../../../modules/formulas/selectors";
import { getBasicFormulaValue } from "../../../modules/formulas/utils";

interface Props {}

const FormulaCreatorControls: FC<Props> = ({}) => {
  const addFormula = useFormulasStore(selectAddFormula);

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
  return (
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
  );
};

export default FormulaCreatorControls;
