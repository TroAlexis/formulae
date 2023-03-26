import { IconLink } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { FormulaComputable } from "modules/formulas/models";
import { selectEditFormula } from "modules/formulas/selectors";
import { selectMap } from "modules/map/selectors";
import React, { FC } from "react";
import { Maybe } from "types/types";

interface Props extends FormulaMenuItemProps {}

export const FormulaMenuBind: FC<Props> = (props) => {
  const editFormula = useFormulasStore(selectEditFormula);
  const { formula, useStore } = useFormulaContext();
  const formulas = useStore(selectMap);

  const handleClick = async () => {
    const refId = await navigator.clipboard.readText();

    const refFormula = formulas[refId] as Maybe<FormulaComputable>;
    const isDifferentFormula = formula.id !== refId;
    const isRefNotBoundToFormula = refFormula?.ref !== formula.id;

    if (refFormula && isDifferentFormula && isRefNotBoundToFormula) {
      editFormula(formula.id, { ref: refId });
    } else {
      /* TODO: Notifications for errors */
      if (!isRefNotBoundToFormula) {
        console.error("Referenced formula is already bound to this formula");
      } else if (!isDifferentFormula) {
        console.error("Can't bind to self");
      } else {
        console.error("Referenced formula doesn't exist");
      }
    }
  };

  return (
    <FormulaMenuItem onClick={handleClick} icon={IconLink} {...props}>
      Bind to copied formula id
    </FormulaMenuItem>
  );
};
