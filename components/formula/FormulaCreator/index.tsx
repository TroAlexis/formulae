import { Container, Divider } from "@mantine/core";
import { useFormulasStore } from "modules/formulas";
import { selectRootExpression } from "modules/formulas/selectors";
import React, { FC } from "react";

import FormulaExpression from "../FormulaExpression";
import { FormulaResult } from "../FormulaResult";
import FormulaCreatorControls from "./Controls";
import { useStyles } from "./styles";

interface Props {}

export const FormulaCreator: FC<Props> = ({}) => {
  const expression = useFormulasStore(selectRootExpression);
  const { classes } = useStyles();

  return (
    <Container size={"xs"} className={classes.container}>
      <FormulaResult />

      <Divider label={"="} labelPosition={"center"} my={"sm"} />

      <FormulaExpression className={classes.scroll} expression={expression} />

      <FormulaCreatorControls mt={"sm"} />
    </Container>
  );
};
