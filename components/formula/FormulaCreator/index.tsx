import { Container, Divider } from "@mantine/core";
import { FormulaCreatorExpression } from "components/formula/FormulaCreator/Expression";
import React, { FC } from "react";

import { FormulaResult } from "../FormulaResult";
import FormulaCreatorControls from "./Controls";
import { useStyles } from "./styles";

interface Props {}

export const FormulaCreator: FC<Props> = ({}) => {
  const { classes } = useStyles();

  return (
    <Container size={"xs"} className={classes.container}>
      <FormulaResult />

      <Divider label={"="} labelPosition={"center"} my={"sm"} />

      <FormulaCreatorExpression />

      <FormulaCreatorControls mt={"sm"} />
    </Container>
  );
};
