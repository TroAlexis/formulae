import { AutocompleteProps, Select } from "@mantine/core";
import React, { FC } from "react";

import { useFormulasStore } from "../../modules/formulas";
import { OPERATORS } from "../../modules/formulas/consts";
import { FormulaOperatorType } from "../../modules/formulas/enums";
import { FormulaOperator } from "../../modules/formulas/models";
import { selectEditFormula } from "../../modules/formulas/selectors";
import { FormulaIndex } from "../../modules/formulas/types";

interface Props {
  index: FormulaIndex;
  operator: FormulaOperator;
}

const operators = Object.values(OPERATORS).map((operator) => ({
  value: operator.label,
  label: operator.label,
}));

const FormulaOperator: FC<Props> = ({ operator, index }) => {
  const editFormula = useFormulasStore(selectEditFormula);
  const { label } = operator;

  const handleChange: AutocompleteProps["onChange"] = (value) => {
    const newOperator = OPERATORS[value as FormulaOperatorType];
    if (newOperator) {
      editFormula(index, newOperator);
    }
  };

  return (
    <Select
      searchable
      size={"sm"}
      value={label}
      autoFocus
      onChange={handleChange}
      placeholder={"Select operator"}
      data={operators}
      styles={{ input: { textAlign: "center" } }}
      variant={"unstyled"}
    />
  );
};

export default FormulaOperator;
