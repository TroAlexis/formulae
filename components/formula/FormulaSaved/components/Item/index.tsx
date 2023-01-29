import {
  ActionIcon,
  FlexProps,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useStyles } from "components/formula/FormulaSaved/components/Item/styles";
import { getFormulaName } from "components/formula/FormulaSaved/components/Item/utils";
import { useFavoritesStore } from "modules/favorites";
import { selectRemoveFavorite } from "modules/favorites/selectors";
import { useFormulasStore } from "modules/formulas";
import { FormulaComputable } from "modules/formulas/models";
import { selectReplaceExpression } from "modules/formulas/selectors";
import { checkIsFormulaExpression } from "modules/formulas/utils";
import React, { FC } from "react";

interface Props extends FlexProps {
  item: FormulaComputable;
}

export const FormulaSavedItem: FC<Props> = ({ item, className, ...props }) => {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  const name = getFormulaName(item);

  const removeItem = useFavoritesStore(selectRemoveFavorite);
  const replaceExpression = useFormulasStore(selectReplaceExpression);

  const handleRemove = () => {
    removeItem(item.id);
  };

  const handleReplace = () => {
    if (checkIsFormulaExpression(item)) {
      replaceExpression(item);
    }
  };

  return (
    <span className={cx(classes.wrapper, className)} {...props}>
      <UnstyledButton className={classes.name} onClick={handleReplace}>
        <Text span truncate size={"sm"}>
          {name}
        </Text>
      </UnstyledButton>
      <ActionIcon size={"xs"} onClick={handleRemove}>
        <IconTrash size={theme.spacing.sm}></IconTrash>
      </ActionIcon>
    </span>
  );
};
