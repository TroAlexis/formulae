import { FormulaComputable } from "modules/formula/models";

export const getComputableShortId = (computable: FormulaComputable) => {
  const [shortId] = computable.id.split("-");

  return shortId;
};
