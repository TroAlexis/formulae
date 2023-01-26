import { Center, Container, Divider } from "@mantine/core";
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
      <Center>
        <FormulaCreatorControls />
      </Center>

      <Divider label={"Add: "} my={"sm"} />

      <div>
        <FormulaExpression expression={expression} />
      </div>

      <Divider label={"Result: "} my={"lg"} />

      <FormulaResult />
    </Container>
  );
};
