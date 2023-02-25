import { FlexProps, Text, UnstyledButton } from "@mantine/core";
import { FormulasFavoritesItemIcon } from "components/formula/FormulasFavorites/components/Item/components/Icon";
import { FormulasFavoritesItemInput } from "components/formula/FormulasFavorites/components/Item/components/Input";
import { FormulasFavoritesItemMenu } from "components/formula/FormulasFavorites/components/Item/components/Menu";
import { useItemEditor } from "components/formula/FormulasFavorites/components/Item/hooks/useItemEditor";
import { useStyles } from "components/formula/FormulasFavorites/components/Item/styles";
import {
  createGetEditHandler,
  getFormulaName,
} from "components/formula/FormulasFavorites/components/Item/utils";
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

  const nameEditor = useItemEditor(item, "name");
  const descriptionEditor = useItemEditor(item, "description");
  const editors = [nameEditor, descriptionEditor];

  const getEditHandler = createGetEditHandler(editors);

  const isEditing = nameEditor.editing || descriptionEditor.editing;

  return (
    <span className={cx(classes.wrapper, className)} {...props}>
      <FormulasFavoritesItemIcon item={item} />

      {nameEditor.editing && (
        <FormulasFavoritesItemInput
          value={nameEditor.value}
          onChange={nameEditor.handleChange}
          onSave={nameEditor.handleSave}
          onCancel={nameEditor.handleClose}
          placeholder={"Enter name"}
          className={classes.name}
        />
      )}

      {descriptionEditor.editing && (
        <FormulasFavoritesItemInput
          value={descriptionEditor.value}
          onChange={descriptionEditor.handleChange}
          onSave={descriptionEditor.handleSave}
          onCancel={descriptionEditor.handleClose}
          placeholder={"Enter description"}
          className={classes.name}
        />
      )}

      {!isEditing && (
        <UnstyledButton className={classes.name} onClick={handleReplace}>
          <Text span truncate size={"sm"}>
            {name}
          </Text>
        </UnstyledButton>
      )}
      <FormulasFavoritesItemMenu
        item={item}
        onNameEdit={getEditHandler(nameEditor)}
        onDescriptionEdit={getEditHandler(descriptionEditor)}
      />
    </span>
  );
};
