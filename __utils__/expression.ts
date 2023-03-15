import { FormulaOperatorType } from "modules/formulas/enums";
import { Formula } from "modules/formulas/models";
import {
  createFormulaExpression,
  createFormulaOperator,
  createFormulaValue,
} from "modules/formulas/utils/create";
import { getFormulaSlice } from "modules/formulas/utils/slice";
import { keyBy, mapKeysToValues, mergeMaps } from "utils/map";

export class ExpressionBuilder {
  expression = createFormulaExpression({ value: [] });
  map: Record<string, Formula> = keyBy([this.expression], "id");

  get formulas() {
    return mapKeysToValues(this.expression.value, this.map);
  }

  get slice() {
    return getFormulaSlice(this.expression.id, this.map);
  }

  addToExpression(formula: Formula) {
    this.expression.value.push(formula.id);
    this.map[formula.id] = { ...formula, parentId: this.expression.id };
    return this;
  }

  addExpression(builder: ExpressionBuilder) {
    this.addToExpression(builder.expression);
    mergeMaps(this.map, builder.map);
    return this;
  }

  addValue(value: number) {
    const newValue = createFormulaValue({ value });
    this.addToExpression(newValue);

    return this;
  }

  addOperator(operator: FormulaOperatorType) {
    const newOperator = createFormulaOperator({ value: operator });
    this.addToExpression(newOperator);

    return this;
  }
}
