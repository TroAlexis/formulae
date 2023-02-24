import { FlexProps, Text, UnstyledButton } from "@mantine/core";
import { FormulasFavoritesItemMenu } from "components/formula/FormulasFavorites/components/Item/components/Menu";
import { FormulasFavoritesItemNameInput } from "components/formula/FormulasFavorites/components/Item/components/NameInput";
import { useItemEdit } from "components/formula/FormulasFavorites/components/Item/hooks/useItemEdit";
import { useStyles } from "components/formula/FormulasFavorites/components/Item/styles";
import { getFormulaName } from "components/formula/FormulasFavorites/components/Item/utils";
import { useFormulasStore } from "modules/formulas";
import { FormulaComputable } from "modules/formulas/models";
import { selectReplaceExpression } from "modules/formulas/selectors";
import { checkIsFormulaExpression } from "modules/formulas/utils";
import React, { FC } from "react";

interface Props extends FlexProps {
  item: FormulaComputable;
  onClick?: () => unknown;
}

export const FormulaFavoritesItem: FC<Props> = ({
  item,
  className,
  onClick,
  ...props
}) => {
  const { classes, cx } = useStyles();

  const name = getFormulaName(item);

  const replaceExpression = useFormulasStore(selectReplaceExpression);

  const handleReplace = () => {
    if (checkIsFormulaExpression(item)) {
      replaceExpression(item);
      onClick?.();
    }
  };

  const {
    editing,
    name: itemName,
    handleNameEdit,
    handleNameChange,
    handleNameSave,
    handleClose,
  } = useItemEdit(item);

  return (
    <span className={cx(classes.wrapper, className)} {...props}>
      {editing ? (
        <FormulasFavoritesItemNameInput
          name={itemName}
          onChange={handleNameChange}
          onSave={handleNameSave}
          onCancel={handleClose}
          className={classes.name}
        />
      ) : (
        <UnstyledButton className={classes.name} onClick={handleReplace}>
          <Text span truncate size={"sm"}>
            {name}
          </Text>
        </UnstyledButton>
      )}
      <FormulasFavoritesItemMenu item={item} onEdit={handleNameEdit} />
    </span>
  );
};
