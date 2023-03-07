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
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFavoritesStore } from "modules/favorites";
import { FavoritesStore } from "modules/favorites/models";
import { selectFavoriteSliceById } from "modules/favorites/selectors";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import { selectReplaceExpression } from "modules/formulas/selectors";
import React, { FC, useCallback } from "react";

interface Props extends FlexProps {
  onClick?: () => unknown;
}

export const FormulaFavoritesItem: FC<Props> = ({
  className,
  onClick,
  ...props
}) => {
  const replaceExpression = useFormulasStore(selectReplaceExpression);
  const { formula } = useFormulaContext(FormulaType.EXPRESSION);
  const sliceSelector = useCallback(
    (state: FavoritesStore) => selectFavoriteSliceById(state, formula.id),
    [formula]
  );
  const slice = useFavoritesStore(sliceSelector);
  const { classes, cx } = useStyles();

  const name = getFormulaName(formula);

  const handleReplace = () => {
    replaceExpression(undefined, slice);
    onClick?.();
  };

  const nameEditor = useItemEditor(formula, "name");
  const descriptionEditor = useItemEditor(formula, "description");
  const editors = [nameEditor, descriptionEditor];

  const getEditHandler = createGetEditHandler(editors);

  const isEditing = nameEditor.editing || descriptionEditor.editing;

  return (
    <div className={cx(classes.wrapper, className)} {...props}>
      <FormulasFavoritesItemIcon />

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
        onNameEdit={getEditHandler(nameEditor)}
        onDescriptionEdit={getEditHandler(descriptionEditor)}
      />
    </div>
  );
};
