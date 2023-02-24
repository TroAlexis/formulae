import { useInputState } from "@mantine/hooks";
import { useFavoritesStore } from "modules/favorites";
import { selectEditFavorite } from "modules/favorites/selectors";
import { FormulaComputable } from "modules/formulas/models";
import { ChangeEventHandler, useState } from "react";

export const useItemEdit = (item: FormulaComputable) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useInputState(item.name);
  const editFavorite = useFavoritesStore(selectEditFavorite);

  const handleNameEdit = () => {
    setEditing(true);
  };

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.value;

    setName(name);
  };

  const handleClose = () => {
    setEditing(false);
    setName(item.name);
  };

  const handleNameSave = () => {
    editFavorite(item.id, { name });

    handleClose();
  };

  return {
    editing,
    name,
    handleNameEdit,
    handleNameChange,
    handleNameSave,
    handleClose,
  };
};
