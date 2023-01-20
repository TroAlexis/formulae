import { Text } from "@mantine/core";
import React, { FC } from "react";

import { FormulaOperator } from "../../modules/formulas/models";

interface Props {
  operator: FormulaOperator;
}

const FormulaOperator: FC<Props> = ({ operator }) => {
  const { label } = operator;
  return <Text>{label}</Text>;
};

export default FormulaOperator;
