import {
  ActionIcon,
  Menu,
  MenuItemProps,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconSelect } from "@tabler/icons-react";
import { useFormulasStore } from "modules/formulas";
import {
  selectCurrentExpressionIndex,
  selectSetCurrentExpressionIndex,
} from "modules/formulas/selectors";
import { FormulaIndex } from "modules/formulas/types";
import { checkIndexesEqual } from "modules/formulas/utils";
import React, { FC } from "react";

interface Props extends MenuItemProps {
  index: FormulaIndex;
}

export const FormulaMenuSelect: FC<Props> = ({ index, ...props }) => {
  const theme = useMantineTheme();
  const setCurrentExpressionIndex = useFormulasStore(
    selectSetCurrentExpressionIndex
  );
  const currentExpressionIndex = useFormulasStore(selectCurrentExpressionIndex);
  const isActiveIndex = checkIndexesEqual(index, currentExpressionIndex);

  const onSelect = () => {
    setCurrentExpressionIndex(index);
  };

  return (
    <Menu.Item
      disabled={isActiveIndex}
      icon={
        <ActionIcon size={"xs"} variant={"transparent"} component={"span"}>
          <IconSelect size={theme.spacing.sm} />
        </ActionIcon>
      }
      onClick={onSelect}
      {...props}
    >
      <Text size={"xs"}>Select</Text>
    </Menu.Item>
  );
};
