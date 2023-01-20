import { Flex, Text, TextInput, Title } from "@mantine/core";
import React, { FC } from "react";

import { FormulaValue } from "../../modules/formulas/models";

interface Props {
  index: number;
  formulaValue: FormulaValue;
}

const FormulaValue: FC<Props> = ({ formulaValue }) => {
  const { value, name, id } = formulaValue;
  const [shortId] = id.split("-");
  return (
    <Flex direction={"column"}>
      <Title size={"h6"}>
        <Text component={"span"} color={"dimmed"}>
          VARIABLE:
        </Text>{" "}
        {name || `#${shortId}`}
      </Title>
      <TextInput value={value} readOnly />
    </Flex>
  );
};

export default FormulaValue;
