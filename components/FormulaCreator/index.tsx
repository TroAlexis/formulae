import { Button, Container, Title } from "@mantine/core";
import React, { FC } from "react";

import { useFormulasStore } from "../../modules/formulas";
import { FormulaType } from "../../modules/formulas/enums";
import { Formula } from "../../modules/formulas/models";
import {
  selectAddFormula,
  selectFormulas,
  selectFormulasResult,
  selectIsComputableAddable,
  selectIsOperatorAddable,
} from "../../modules/formulas/selectors";
import {
  checkIsFormulaExpression,
  checkIsFormulaOperator,
  checkIsFormulaValue,
} from "../../modules/formulas/utils";
import { uuid } from "../../utils/uuid";
import FormulaOperator from "../FormulaOperator";
import FormulaValue from "../FormulaValue";

interface Props {}

export const FormulaCreator: FC<Props> = ({}) => {
  const formulas = useFormulasStore(selectFormulas);
  const addFormula = useFormulasStore(selectAddFormula);
  const result = useFormulasStore(selectFormulasResult);
  const isOperatorAddable = useFormulasStore(selectIsOperatorAddable);
  const isComputableAddable = useFormulasStore(selectIsComputableAddable);

  const addPlus = () =>
    addFormula({
      id: uuid(),
      type: FormulaType.OPERATOR,
      label: "+",
      value: (a, b) => ({
        value: a.value + b.value,
        id: uuid(),
        type: FormulaType.VALUE,
      }),
    });

  const addOne = () =>
    addFormula({ value: 1, type: FormulaType.VALUE, id: uuid() });

  const addExpression = () =>
    addFormula({
      value: [
        { value: 1, type: FormulaType.VALUE, id: uuid() },
        {
          id: uuid(),
          type: FormulaType.OPERATOR,
          label: "+",
          value: (a, b) => ({
            value: a.value + b.value,
            id: uuid(),
            type: FormulaType.VALUE,
          }),
        },
        { value: 1, type: FormulaType.VALUE, id: uuid() },
      ],
      type: FormulaType.EXPRESSION,
      id: uuid(),
    });

  const renderFormulas = (formulas: Formula[]) => {
    return formulas.map((formula, index) => {
      if (checkIsFormulaOperator(formula)) {
        return <FormulaOperator operator={formula} key={formula.id} />;
      }
      if (checkIsFormulaValue(formula)) {
        return (
          <FormulaValue index={index} formulaValue={formula} key={formula.id} />
        );
      }

      if (checkIsFormulaExpression(formula)) {
        return <div key={formula.id}>({renderFormulas(formula.value)})</div>;
      }

      return null;
    });
  };

  return (
    <Container>
      <ul>{renderFormulas(formulas)}</ul>
      <Title>{result.value}</Title>
      <Button onClick={addPlus} disabled={!isOperatorAddable}>
        Add plus
      </Button>
      <Button onClick={addOne} disabled={!isComputableAddable}>
        Add one
      </Button>
      <Button onClick={addExpression} disabled={!isComputableAddable}>
        Add expression
      </Button>
    </Container>
  );
};
