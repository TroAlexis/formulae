import {
  ActionIcon,
  Flex,
  NumberInput,
  NumberInputHandlers,
  NumberInputProps,
  useMantineTheme,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { FormulaMenu } from "components/formula/FormulaMenu";
import { Hoverable } from "components/ui/Hoverable";
import { useFormulasStore } from "modules/formulas";
import { selectEditFormula } from "modules/formulas/selectors";
import React, { FC, useRef } from "react";
import { DEFAULT_FORMULA_VALUE, DEFAULT_PRECISION } from "types/consts";

import styles from "./index.module.css";
import { FormulaValueProps } from "./models";
import { useStyles } from "./styles";

const FormulaValue: FC<FormulaValueProps> = ({ formulaValue, index }) => {
  const theme = useMantineTheme();
  const editFormula = useFormulasStore(selectEditFormula);
  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>();

  const { value } = formulaValue;

  const handleNumberChange: NumberInputProps["onChange"] = (num) => {
    const value = num ?? DEFAULT_FORMULA_VALUE;
    return editFormula(index, { value });
  };

  const handleDelete = () => {};

  return (
    <Flex direction={"column"} className={styles.wrapper}>
      <Flex gap={"xs"} align={"center"}>
        <Hoverable hoverTargetClassName={styles.wrapper}>
          {({ className }) => (
            <ActionIcon
              size={"lg"}
              color={"red"}
              variant="subtle"
              onClick={handleDelete}
              className={className}
            >
              <IconTrash size={theme.spacing.sm} />
            </ActionIcon>
          )}
        </Hoverable>

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

        <Hoverable hoverTargetClassName={styles.wrapper}>
          {({ className }) => (
            <FormulaMenu classNames={{ target: className }} />
          )}
        </Hoverable>
      </Flex>
    </Flex>
  );
};

export default FormulaValue;
