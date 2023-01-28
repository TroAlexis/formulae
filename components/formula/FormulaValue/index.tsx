import {
  ActionIcon,
  Flex,
  NumberInput,
  NumberInputHandlers,
  NumberInputProps,
} from "@mantine/core";
import React, { FC, useRef } from "react";

import { ACTION_COLOR } from "../../../config/mantine/theme";
import { useFormulasStore } from "../../../modules/formulas";
import { selectEditFormula } from "../../../modules/formulas/selectors";
import {
  DEFAULT_FORMULA_VALUE,
  DEFAULT_PRECISION,
} from "../../../types/consts";
import { FormulaValueProps } from "./models";
import { useStyles } from "./styles";

const FormulaValue: FC<FormulaValueProps> = ({ formulaValue, index }) => {
  const editFormula = useFormulasStore(selectEditFormula);
  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>();

  const { value } = formulaValue;

  const handleNumberChange: NumberInputProps["onChange"] = (num) => {
    const value = num ?? DEFAULT_FORMULA_VALUE;
    return editFormula(index, { value });
  };

  const handleDecrement = () => {
    handlers.current?.decrement();
  };
  const handleIncrement = () => {
    handlers.current?.increment();
  };

  return (
    <Flex direction={"column"}>
      <Flex gap={"xs"} align={"center"}>
        <ActionIcon
          size={"lg"}
          color={ACTION_COLOR}
          variant="subtle"
          onClick={handleDecrement}
        >
          –
        </ActionIcon>

        <NumberInput
          size={"sm"}
          value={value}
          handlersRef={handlers}
          onChange={handleNumberChange}
          precision={DEFAULT_PRECISION}
          placeholder={"Enter value"}
          removeTrailingZeros
          startValue={DEFAULT_FORMULA_VALUE}
          autoFocus
          classNames={{ root: classes.root, input: classes.input }}
          hideControls
          type={"number"}
        />

        <ActionIcon
          size={"lg"}
          variant="subtle"
          color={ACTION_COLOR}
          onClick={handleIncrement}
        >
          +
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default FormulaValue;
