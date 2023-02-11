import { ActionIcon, ActionIconProps, useMantineTheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useFormulasStore } from "modules/formulas";
import { selectRemoveFormula } from "modules/formulas/selectors";
import { FormulaIndex } from "modules/formulas/types";
import { checkIsIndexEmpty } from "modules/formulas/utils";
import React, { FC } from "react";

interface Props extends ActionIconProps {
  index: FormulaIndex;
}

export const FormulaDelete: FC<Props> = ({ index, ...props }) => {
  const theme = useMantineTheme();
  const removeFormula = useFormulasStore(selectRemoveFormula);
  const isIndexEmpty = checkIsIndexEmpty(index);

  const handleRemove = () => {
    removeFormula(index);
  };

  return (
    <ActionIcon
      size={"lg"}
      color={"red"}
      variant={isIndexEmpty ? "transparent" : "subtle"}
      onClick={handleRemove}
      disabled={isIndexEmpty}
      {...props}
    >
      <IconTrash size={theme.spacing.sm} />
    </ActionIcon>
  );
};
