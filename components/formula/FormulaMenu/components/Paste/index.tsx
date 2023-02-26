import { IconFileArrowLeft } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulasStore } from "modules/formulas";
import { FormulaComputable, FormulaExpression } from "modules/formulas/models";
import { selectReplaceExpression } from "modules/formulas/selectors";
import { FormulaIndex } from "modules/formulas/types";
import React, { FC } from "react";
import { parse } from "utils/serialize";

interface Props extends FormulaMenuItemProps {
  computable: FormulaComputable;
  index: FormulaIndex;
}

export const FormulaMenuPaste: FC<Props> = ({
  computable,
  index,
  ...props
}) => {
  const replaceExpression = useFormulasStore(selectReplaceExpression);

  const handleClick = async () => {
    const data = await navigator.clipboard.readText();

    const formula = parse<FormulaExpression>(data);

    replaceExpression(formula, index);
  };

  return (
    <FormulaMenuItem onClick={handleClick} icon={IconFileArrowLeft} {...props}>
      Paste formula
    </FormulaMenuItem>
  );
};
