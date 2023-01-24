import { VariableIcon } from "@heroicons/react/24/outline";
import {
  ActionIcon,
  Flex,
  FlexProps,
  Text,
  TextInput,
  TextInputProps,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import React, { FC } from "react";

import { useFormulasStore } from "../../../../modules/formulas";
import { selectEditFormula } from "../../../../modules/formulas/selectors";
import { FormulaValueProps } from "../../models";
import { useStyles } from "./styles";

interface Props extends FormulaValueProps, FlexProps {}

export const FormulaValueNameControl: FC<Props> = ({
  formulaValue,
  index,
  ...props
}) => {
  const editFormula = useFormulasStore(selectEditFormula);
  const { classes } = useStyles();

  const { name, id } = formulaValue;
  const [shortId] = id.split("-");

  const inputValue = name ?? shortId;

  const handleNameChange: TextInputProps["onChange"] = (event) => {
    const name = event.target.value;

    return editFormula(index, { name });
  };

  return (
    <Flex gap={"xs"} align={"center"} {...props}>
      <Tooltip
        label={
          <Text fw={500} size={"xs"}>
            variable name
          </Text>
        }
        position={"right"}
      >
        <ActionIcon
          size={"lg"}
          className={classes.iconWrapper}
          variant={"transparent"}
          color={"lime"}
        >
          <ThemeIcon
            variant={"gradient"}
            radius={"xl"}
            size={"xs"}
            gradient={{ from: "teal", to: "lime" }}
          >
            <VariableIcon className={classes.icon} />
          </ThemeIcon>
        </ActionIcon>
      </Tooltip>
      <TextInput
        size={"xs"}
        value={inputValue}
        variant={"unstyled"}
        tt={"uppercase"}
        placeholder={"Enter variable name"}
        classNames={{ input: classes.nameInput }}
        onChange={handleNameChange}
      />
    </Flex>
  );
};
