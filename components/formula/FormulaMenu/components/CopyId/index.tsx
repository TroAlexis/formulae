import { useClipboard } from "@mantine/hooks";
import { IconId } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import React, { FC } from "react";

interface Props extends FormulaMenuItemProps {}

export const FormulaMenuCopyId: FC<Props> = (props) => {
  const { formula } = useFormulaContext();
  const clipboard = useClipboard();

  const handleClick = () => {
    clipboard.copy(formula.id);
  };

  return (
    <FormulaMenuItem onClick={handleClick} icon={IconId} {...props}>
      Copy reference id
    </FormulaMenuItem>
  );
};
