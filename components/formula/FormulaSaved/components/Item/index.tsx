import { ActionIcon, FlexProps, Text, useMantineTheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useStyles } from "components/formula/FormulaSaved/components/Item/styles";
import { getFormulaName } from "components/formula/FormulaSaved/components/Item/utils";
import { useFavoritesStore } from "modules/favorites";
import { selectRemoveFavorite } from "modules/favorites/selectors";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props extends FlexProps {
  item: FormulaComputable;
}

export const FormulaSavedItem: FC<Props> = ({ item, className, ...props }) => {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  const name = getFormulaName(item);

  const removeItem = useFavoritesStore(selectRemoveFavorite);

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <span className={cx(classes.wrapper, className)} {...props}>
      <Text span truncate size={"sm"}>
        {name}
      </Text>
      <ActionIcon size={"xs"} onClick={handleRemove}>
        <IconTrash size={theme.spacing.sm}></IconTrash>
      </ActionIcon>
    </span>
  );
};
