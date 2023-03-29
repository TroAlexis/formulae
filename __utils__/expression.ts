import { FormulaOperatorType } from "modules/formulas/enums";
import {
  Formula,
  FormulaExpression,
  FormulaValue,
} from "modules/formulas/models";
import {
  createFormulaExpression,
  createFormulaOperator,
  createFormulaValue,
} from "modules/formulas/utils/create";
import { getFormulaSlice } from "modules/formulas/utils/slice";
import { keyBy, mapKeysToValues, mergeMaps } from "utils/map";

export class ExpressionBuilder {
  expression: FormulaExpression;
  map: Record<string, Formula>;

  constructor(part: Partial<FormulaExpression> = {}) {
    this.expression = createFormulaExpression({ value: [], ...part });
    this.map = keyBy([this.expression], "id");
  }

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

  addValue(value: number, formula?: Partial<FormulaValue>) {
    const rest = formula || {};
    const newValue = createFormulaValue({ value, ...rest });
    this.addToExpression(newValue);

    return this;
  }

  addOperator(operator: FormulaOperatorType) {
    const newOperator = createFormulaOperator({ value: operator });
    this.addToExpression(newOperator);

    return this;
  }
}
