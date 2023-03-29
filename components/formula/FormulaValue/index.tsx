import {
  NumberInput,
  NumberInputHandlers,
  NumberInputProps,
} from "@mantine/core";
import { FormulaLayout } from "components/formula/FormulaLayout";
import { FormulaValueMenu } from "components/formula/FormulaValue/components/Menu";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useSelectorWithArguments } from "hooks/useSelectorWithArguments";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import {
  selectEditFormula,
  selectFormulaRef,
} from "modules/formulas/selectors";
import { useThemeStore } from "modules/theme";
import { selectValuePrecision } from "modules/theme/selectors";
import React, { FC, useRef } from "react";
import { DEFAULT_FORMULA_VALUE } from "types/consts";

import { useStyles } from "./styles";

const FormulaValue: FC = () => {
  const editFormula = useFormulasStore(selectEditFormula);
  const valuePrecision = useThemeStore(selectValuePrecision);
  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>();

  const { formula, useStore } = useFormulaContext(FormulaType.VALUE);
  const { ref = "" } = formula;

  const refSelector = useSelectorWithArguments(selectFormulaRef, ref);
  const refFormula = useStore(refSelector);

  const { value, id } = refFormula || formula;

  const handleNumberChange: NumberInputProps["onInput"] = (event) => {
    const inputValue = event.currentTarget.valueAsNumber;
    const value = Number.isNaN(inputValue) ? DEFAULT_FORMULA_VALUE : inputValue;
    return editFormula(id, { value });
  };

  return (
    <FormulaLayout menu={FormulaValueMenu}>
      <NumberInput
        size={"sm"}
        value={value}
        handlersRef={handlers}
        onInput={handleNumberChange}
        precision={valuePrecision}
        placeholder={"Enter value"}
        removeTrailingZeros
        startValue={DEFAULT_FORMULA_VALUE}
        autoFocus
        disabled={!!ref}
        classNames={{ root: classes.root, input: classes.input }}
        hideControls
        type={"number"}
      />
    </FormulaLayout>
  );
};

export default FormulaValue;
