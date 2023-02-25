import { useClipboard } from "@mantine/hooks";
import { IconShare } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaShare } from "hooks/useFormulaShare";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props extends FormulaMenuItemProps {
  computable: FormulaComputable;
}

export const FormulaMenuShare: FC<Props> = ({ computable, ...props }) => {
  const { link } = useFormulaShare(computable);
  const clipboard = useClipboard();

  const handleClick = () => {
    clipboard.copy(link);
  };

  return (
    <FormulaMenuItem onClick={handleClick} icon={IconShare} {...props}>
      Copy link
    </FormulaMenuItem>
  );
};
