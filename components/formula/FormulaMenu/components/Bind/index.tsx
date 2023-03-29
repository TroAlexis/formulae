import { IconLink, IconUnlink } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import { FormulaComputable } from "modules/formulas/models";
import { selectEditFormula } from "modules/formulas/selectors";
import { selectMap } from "modules/map/selectors";
import React, { FC } from "react";
import { Maybe } from "types/types";
import { notifyError } from "utils/notifications";

interface Props extends FormulaMenuItemProps {}

export const FormulaMenuBind: FC<Props> = (props) => {
  const editFormula = useFormulasStore(selectEditFormula);
  const { formula, useStore } = useFormulaContext(FormulaType.VALUE);
  const formulas = useStore(selectMap);

  const handleBind = async () => {
    const refId = await navigator.clipboard.readText();

    const refFormula = formulas[refId] as Maybe<FormulaComputable>;
    const isDifferentFormula = formula.id !== refId;
    const isRefNotBoundToFormula = refFormula?.ref !== formula.id;

    if (refFormula && isDifferentFormula && isRefNotBoundToFormula) {
      editFormula(formula.id, { ref: refId });
    } else {
      let message: string;

      if (!isRefNotBoundToFormula) {
        message = "Referenced formula is already bound to this formula";
      } else if (!isDifferentFormula) {
        message = "Can't bind to self";
      } else {
        message = "Referenced formula doesn't exist";
      }

      notifyError({ message });
    }
  };

  const handleUnbind = () => {
    editFormula(formula.id, { ref: undefined });
  };

  const handleClick = () => {
    if (formula.ref) {
      handleUnbind();
    } else {
      handleBind();
    }
  };

  const text = formula.ref ? "Unbind" : "Bind to copied formula id";
  const icon = formula.ref ? IconUnlink : IconLink;

  return (
    <FormulaMenuItem onClick={handleClick} icon={icon} {...props}>
      {text}
    </FormulaMenuItem>
  );
};
