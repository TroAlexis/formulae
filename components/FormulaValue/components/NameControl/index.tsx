import {
  ActionIcon,
  CopyButton,
  Flex,
  FlexProps,
  Text,
  TextInput,
  TextInputProps,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { IconBallpen } from "@tabler/icons-react";
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
    <Flex gap={"xs"} pb={"xs"} align={"center"} {...props}>
      <CopyButton value={inputValue}>
        {({ copied, copy }) => (
          <Tooltip
            label={
              <Text fw={500} size={"xs"}>
                {copied ? "copied" : "copy variable name"}
              </Text>
            }
            position={"right"}
            withArrow
          >
            <ActionIcon
              size={"lg"}
              className={classes.iconWrapper}
              variant={"transparent"}
              color={"lime"}
              onClick={copy}
            >
              <ThemeIcon
                variant={"gradient"}
                radius={"xl"}
                size={"xs"}
                gradient={{ from: "teal", to: "lime" }}
              >
                <IconBallpen className={classes.icon} />
              </ThemeIcon>
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
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
