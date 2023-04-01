import { ActionIcon, ActionIconProps, useMantineTheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { selectRemoveFormula } from "modules/formulas/selectors";
import React, { FC } from "react";

type Props = ActionIconProps;

export const FormulaDelete: FC<Props> = (props) => {
  const theme = useMantineTheme();
  const { formula } = useFormulaContext();
  const removeFormula = useFormulasStore(selectRemoveFormula);

  const handleRemove = () => {
    removeFormula(formula.id);
  };

  return (
    <ActionIcon
      size={"lg"}
      variant={"transparent"}
      onClick={handleRemove}
      {...props}
    >
      <IconTrash size={theme.spacing.sm} />
    </ActionIcon>
  );
};
