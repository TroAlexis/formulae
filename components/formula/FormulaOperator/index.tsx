import { AutocompleteProps, Select } from "@mantine/core";
import { FormulaLayout } from "components/formula/FormulaLayout";
import { useStyles } from "components/formula/FormulaOperator/styles";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { OPERATORS } from "modules/formulas/consts";
import { FormulaOperatorType, FormulaType } from "modules/formulas/enums";
import { selectEditFormula } from "modules/formulas/selectors";
import React, { FC } from "react";

const operators = [...OPERATORS.entries()].map(([type, operator]) => ({
  value: type,
  label: operator.label,
}));

const FormulaOperator: FC = () => {
  const { classes } = useStyles();
  const { formula: operator, index } = useFormulaContext(FormulaType.OPERATOR);

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
    <FormulaLayout>
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
