import { Container, Divider } from "@mantine/core";
import { FormulaProvider } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { selectRootExpression } from "modules/formulas/selectors";
import { FormulaIndex } from "modules/formulas/types";
import React, { FC } from "react";

import FormulaExpression from "../FormulaExpression";
import { FormulaResult } from "../FormulaResult";
import FormulaCreatorControls from "./Controls";
import { useStyles } from "./styles";

interface Props {}

const DEFAULT_INDEX: FormulaIndex = [];

export const FormulaCreator: FC<Props> = ({}) => {
  const expression = useFormulasStore(selectRootExpression);
  const { classes } = useStyles();

  return (
    <Container size={"xs"} className={classes.container}>
      <FormulaResult />

      <Divider label={"="} labelPosition={"center"} my={"sm"} />

      <FormulaProvider formula={expression} index={DEFAULT_INDEX}>
        <FormulaExpression className={classes.scroll} />
      </FormulaProvider>

      <FormulaCreatorControls mt={"sm"} />
    </Container>
  );
};
