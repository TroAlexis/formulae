import {
  ActionIcon,
  createStyles,
  Flex,
  NumberInput,
  NumberInputHandlers,
  NumberInputProps,
  Text,
  Title,
} from "@mantine/core";
import React, { FC, useRef } from "react";

import { useFormulasStore } from "../../modules/formulas";
import { FormulaValue } from "../../modules/formulas/models";
import { selectEditFormula } from "../../modules/formulas/selectors";
import { FormulaIndex } from "../../modules/formulas/types";
import { DEFAULT_FORMULA_VALUE, DEFAULT_PRECISION } from "../../types/consts";

interface Props {
  index: FormulaIndex;
  formulaValue: FormulaValue;
}

const useStyles = createStyles(() => ({
  root: {
    flexGrow: 1,
  },
  input: {
    textAlign: "center",
  },
}));

const FormulaValue: FC<Props> = ({ formulaValue, index }) => {
  const editFormula = useFormulasStore(selectEditFormula);
  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>();

  const { value, name, id } = formulaValue;
  const [shortId] = id.split("-");

  const handleChange: NumberInputProps["onChange"] = (num) => {
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
      <Title size={"h6"}>
        <Text span color={"dimmed"}>
          VARIABLE:
        </Text>{" "}
        {name || `#${shortId}`}
      </Title>

      <Flex gap={"xs"} align={"center"}>
        <ActionIcon size={"lg"} variant="default" onClick={handleDecrement}>
          –
        </ActionIcon>

        <NumberInput
          size={"sm"}
          value={value}
          handlersRef={handlers}
          onChange={handleChange}
          precision={DEFAULT_PRECISION}
          placeholder={"Enter value"}
          removeTrailingZeros
          startValue={DEFAULT_FORMULA_VALUE}
          autoFocus
          classNames={{ root: classes.root, input: classes.input }}
          hideControls
        />

        <ActionIcon size={"lg"} variant="default" onClick={handleIncrement}>
          +
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default FormulaValue;
