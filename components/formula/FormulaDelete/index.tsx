import { ActionIcon, ActionIconProps, useMantineTheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { selectRemoveFormula } from "modules/formulas/selectors";
import { checkIsIndexEmpty } from "modules/formulas/utils";
import React, { FC } from "react";

type Props = ActionIconProps;

export const FormulaDelete: FC<Props> = (props) => {
  const theme = useMantineTheme();
  const { index } = useFormulaContext();
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
