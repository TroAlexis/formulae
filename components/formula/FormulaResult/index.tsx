import {
  CopyButton,
  Flex,
  Text,
  TextProps,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useFormulasStore } from "modules/formulas";
import { selectFormulasResult } from "modules/formulas/selectors";
import React, { FC } from "react";

interface Props extends TextProps {}

export const FormulaResult: FC<Props> = ({ ...props }) => {
  const result = useFormulasStore(selectFormulasResult);
  const theme = useMantineTheme();

  const { fontSize } = theme.headings.sizes.h1;

  const size = fontSize ? parseInt(fontSize as string) : "xl";

  return (
    <Flex align={"center"} justify={"center"}>
      <CopyButton value={`${result.value}`}>
        {({ copied, copy }) => (
          <Tooltip
            label={<Text size={"xs"}>{copied ? "copied" : "copy"}</Text>}
            withArrow
            position="right"
          >
            <Text
              span
              align={"center"}
              size={size}
              fw={700}
              onClick={copy}
              {...props}
            >
              {result.value}
            </Text>
          </Tooltip>
        )}
      </CopyButton>
    </Flex>
  );
};
