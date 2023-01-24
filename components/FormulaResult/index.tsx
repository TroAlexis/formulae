import { CopyButton, Flex, Text, TextProps, Tooltip } from "@mantine/core";
import React, { FC } from "react";

import { useFormulasStore } from "../../modules/formulas";
import { selectFormulasResult } from "../../modules/formulas/selectors";

interface Props extends TextProps {}

export const FormulaResult: FC<Props> = ({ ...props }) => {
  const result = useFormulasStore(selectFormulasResult);

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
              size={"xl"}
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
