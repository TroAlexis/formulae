import { useInputState } from "@mantine/hooks";
import { useFavoritesStore } from "modules/favorites";
import { selectEditFavorite } from "modules/favorites/selectors";
import { FormulaComputable } from "modules/formula/models";
import { useState } from "react";

export const useItemEditor = (
  item: FormulaComputable,
  property: "name" | "description"
) => {
  const itemValue = item[property] || "";
  const [editing, setEditing] = useState(false);
  const [value, handleChange] = useInputState(itemValue);
  const editFavorite = useFavoritesStore(selectEditFavorite);

  const handleEdit = () => {
    setEditing(true);
  };

  const stopEditing = () => setEditing(false);
  const resetValue = () => handleChange(itemValue);

  const handleClose = () => {
    stopEditing();
    resetValue();
  };

  const handleSave = () => {
    editFavorite(item.id, { [property]: value });

    stopEditing();
  };

  return {
    editing,
    value,
    handleEdit,
    handleChange,
    handleSave,
    handleClose,
  };
};
