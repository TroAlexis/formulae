import {
  NumberInput,
  NumberInputHandlers,
  NumberInputProps,
} from "@mantine/core";
import { FormulaLayout } from "components/formula/FormulaLayout";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import { selectEditFormula } from "modules/formulas/selectors";
import React, { FC, useRef } from "react";
import { DEFAULT_FORMULA_VALUE, DEFAULT_PRECISION } from "types/consts";

import { useStyles } from "./styles";

const FormulaValue: FC = () => {
  const editFormula = useFormulasStore(selectEditFormula);
  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>();

  const { formula } = useFormulaContext(FormulaType.VALUE);

  const { value, id } = formula;

  const handleNumberChange: NumberInputProps["onChange"] = (num) => {
    const value = num ?? DEFAULT_FORMULA_VALUE;
    return editFormula(id, { value });
  };

  return (
    <FormulaLayout>
      <NumberInput
        size={"sm"}
        value={value}
        handlersRef={handlers}
        onChange={handleNumberChange}
        precision={DEFAULT_PRECISION}
        placeholder={"Enter value"}
        removeTrailingZeros
        startValue={DEFAULT_FORMULA_VALUE}
        autoFocus
        classNames={{ root: classes.root, input: classes.input }}
        hideControls
        type={"number"}
      />
    </FormulaLayout>
  );
};

export default FormulaValue;
