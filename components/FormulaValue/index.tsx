import {
  ActionIcon,
  Flex,
  NumberInput,
  NumberInputHandlers,
  NumberInputProps,
} from "@mantine/core";
import React, { FC, useRef } from "react";

import { useFormulasStore } from "../../modules/formulas";
import { selectEditFormula } from "../../modules/formulas/selectors";
import { DEFAULT_FORMULA_VALUE, DEFAULT_PRECISION } from "../../types/consts";
import { FormulaValueNameControl } from "./components/NameControl";
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
      <FormulaValueNameControl index={index} formulaValue={formulaValue} />

      <Flex gap={"xs"} align={"center"}>
        <ActionIcon
          size={"lg"}
          color={"indigo"}
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
        />

        <ActionIcon
          size={"lg"}
          variant="subtle"
          color={"indigo"}
          onClick={handleIncrement}
        >
          +
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default FormulaValue;
