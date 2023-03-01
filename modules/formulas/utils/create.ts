import {
  Formula,
  FormulaExpression,
  FormulaOperator,
  FormulaValue,
} from "modules/formula/models";
import { STATIC_FORMULA_ID, STATIC_VALUE_ID } from "modules/formulas/consts";
import { FormulaType } from "modules/formulas/enums";
import { PartialBy } from "types/types";
import { uuid } from "utils/uuid";

/* Formula factory */
export const createFormulaFactory =
  <T extends Formula>() =>
  <K extends keyof T>(base: Pick<T, K>) =>
  (formula: PartialBy<T, K | "id">): T =>
    ({
      id: uuid(),
      ...base,
      ...formula,
    } as T);

export const createFormulaValue = createFormulaFactory<FormulaValue>()({
  type: FormulaType.VALUE,
});

export const createFormulaExpression =
  createFormulaFactory<FormulaExpression>()({ type: FormulaType.EXPRESSION });

export const createFormulaOperator = createFormulaFactory<FormulaOperator>()({
  type: FormulaType.OPERATOR,
});

export const createEmptyFormulaValue = (): FormulaValue =>
  createFormulaValue({ value: 0 });

export const createInitialValue = (): FormulaValue => ({
  ...createEmptyFormulaValue(),
  id: STATIC_VALUE_ID,
  parentId: STATIC_FORMULA_ID,
});

export const createInitialExpression = (): FormulaExpression => ({
  id: STATIC_FORMULA_ID,
  type: FormulaType.EXPRESSION,
  // Set id to static value to prevent hydration errors
  value: [STATIC_VALUE_ID],
  name: "New formula",
});
