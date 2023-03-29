import {
  CopyButton,
  Flex,
  Text,
  TextProps,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import BigNumber from "bignumber.js";
import { useFormulasStore } from "modules/formulas";
import { selectFormulasResult } from "modules/formulas/selectors";
import { useThemeStore } from "modules/theme";
import { selectResultPrecision } from "modules/theme/selectors";
import React, { FC } from "react";

interface Props extends TextProps {}

export const FormulaResult: FC<Props> = ({ ...props }) => {
  const resultPrecision = useThemeStore(selectResultPrecision);
  const result = useFormulasStore(selectFormulasResult);
  const theme = useMantineTheme();

  const { fontSize } = theme.headings.sizes.h1;

  const value = BigNumber(result.value)
    .decimalPlaces(resultPrecision)
    .toString();

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
              size={fontSize}
              fw={700}
              onClick={copy}
              {...props}
            >
              {value}
            </Text>
          </Tooltip>
        )}
      </CopyButton>
    </Flex>
  );
};
