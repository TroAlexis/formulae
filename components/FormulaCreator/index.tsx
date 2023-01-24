import { Container, Divider } from "@mantine/core";
import React, { FC } from "react";

import { useFormulasStore } from "../../modules/formulas";
import { selectRootExpression } from "../../modules/formulas/selectors";
import FormulaExpression from "../FormulaExpression";
import { FormulaResult } from "../FormulaResult";
import FormulaCreatorControls from "./Controls";

interface Props {}

export const FormulaCreator: FC<Props> = ({}) => {
  const expression = useFormulasStore(selectRootExpression);

  return (
    <Container size={"xs"}>
      <FormulaExpression expression={expression} />

      <Divider label={"Result: "} my={"lg"} />

      <FormulaResult />

      <Divider label={"Add: "} my={"lg"} />

      <FormulaCreatorControls />
    </Container>
  );
};
