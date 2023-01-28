import { Center, Container, Divider } from "@mantine/core";
import React, { FC } from "react";

import { useFormulasStore } from "../../../modules/formulas";
import { selectRootExpression } from "../../../modules/formulas/selectors";
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
      <Center component={"section"}>
        <FormulaCreatorControls />
      </Center>

      <Divider my={"xs"} />

      <FormulaExpression className={classes.scroll} expression={expression} />

      <Divider label={"="} labelPosition={"center"} my={"sm"} />

      <FormulaResult />
    </Container>
  );
};
