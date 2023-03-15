import { NO_PROVIDER_ERROR_MESSAGE } from "contexts/useFormulaContext/consts";
import { FormulaContextProps } from "contexts/useFormulaContext/models";
import { FormulaType } from "modules/formulas/enums";
import { checkFormulaType } from "modules/formulas/utils/check";

export const validateFormulaContext = <T extends FormulaType>(
  type?: T,
  context?: FormulaContextProps
) => {
  if (context === undefined) {
    throw new Error(NO_PROVIDER_ERROR_MESSAGE);
  }

  const { formula } = context;

  const isTypeDefined = type !== undefined;
  const isCorrectType = isTypeDefined ? checkFormulaType(formula, type) : true;

  if (!isCorrectType) {
    throw new Error(
      `useFormulaContext with type ${type} can't be used within ${formula?.type}`
    );
  }
};
