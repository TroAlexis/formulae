import { AutocompleteProps, Select } from "@mantine/core";
import { FormulaLayout } from "components/formula/FormulaLayout";
import { useStyles } from "components/formula/FormulaOperator/styles";
import { useFormulasStore } from "modules/formulas";
import { OPERATORS } from "modules/formulas/consts";
import { FormulaOperatorType } from "modules/formulas/enums";
import { FormulaOperator } from "modules/formulas/models";
import { selectEditFormula } from "modules/formulas/selectors";
import { FormulaIndex } from "modules/formulas/types";
import React, { FC } from "react";

interface Props {
  index: FormulaIndex;
  operator: FormulaOperator;
}

const operators = [...OPERATORS.entries()].map(([type, operator]) => ({
  value: type,
  label: operator.label,
}));

const FormulaOperator: FC<Props> = ({ operator, index }) => {
  const { classes } = useStyles();

  const editFormula = useFormulasStore(selectEditFormula);
  const { value } = operator;

  const { label } = OPERATORS.get(value) || {};

  const handleChange: AutocompleteProps["onChange"] = (
    value: FormulaOperatorType
  ) => {
    if (OPERATORS.has(value)) {
      editFormula(index, { value });
    }
  };

  return (
    <FormulaLayout index={index}>
      <Select
        searchable
        withinPortal
        size={"sm"}
        value={label}
        onChange={handleChange}
        placeholder={"Select operator"}
        data={operators}
        classNames={classes}
        variant={"unstyled"}
      />
    </FormulaLayout>
  );
};

export default FormulaOperator;
