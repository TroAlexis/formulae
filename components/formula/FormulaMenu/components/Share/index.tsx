import { useClipboard } from "@mantine/hooks";
import { IconFileArrowRight, IconShare } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaShare } from "hooks/useFormulaShare";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";
import { serialize } from "utils/serialize";

interface Props extends FormulaMenuItemProps {
  computable: FormulaComputable;
  action: "link" | "formula";
}

export const FormulaMenuShare: FC<Props> = ({
  computable,
  action,
  ...props
}) => {
  const { link } = useFormulaShare(computable);
  const clipboard = useClipboard();

  const isLink = action === "link";

  const handleClick = () => {
    const valueToCopy = isLink ? link : serialize(computable);

    clipboard.copy(valueToCopy);
  };

  const icon = isLink ? IconShare : IconFileArrowRight;

  return (
    <FormulaMenuItem onClick={handleClick} icon={icon} {...props}>
      Copy {action}
    </FormulaMenuItem>
  );
};
