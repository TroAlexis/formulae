import { useClipboard } from "@mantine/hooks";
import { IconFileArrowRight, IconShare } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulaShare } from "hooks/useFormulaShare";
import { FormulaType } from "modules/formulas/enums";
import React, { FC } from "react";
import { serialize } from "utils/serialize";

interface Props extends FormulaMenuItemProps {
  action: "link" | "formula";
}

export const FormulaMenuShare: FC<Props> = ({ action, ...props }) => {
  const { useStore, selectSlice } = useFormulaContext(FormulaType.EXPRESSION);
  const formulaSlice = useStore(selectSlice);

  const { link } = useFormulaShare(formulaSlice);
  const clipboard = useClipboard();

  const isLink = action === "link";

  const handleClick = () => {
    const valueToCopy = isLink ? link : serialize(formulaSlice);

    clipboard.copy(valueToCopy);
  };

  const icon = isLink ? IconShare : IconFileArrowRight;

  return (
    <FormulaMenuItem onClick={handleClick} icon={icon} {...props}>
      Copy {action}
    </FormulaMenuItem>
  );
};
