import { useClipboard } from "@mantine/hooks";
import { IconFileArrowRight } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { useFavoritesStore } from "modules/favorites";
import { selectFavorites } from "modules/favorites/selectors";
import React, { FC } from "react";
import { serialize } from "utils/serialize";

interface Props {}

export const FavoritesMenuExport: FC<Props> = ({}) => {
  const favorites = useFavoritesStore(selectFavorites);
  const { copy } = useClipboard();

  const serialized = serialize(favorites);

  const handleClick = () => copy(serialized);

  return (
    <FormulaMenuItem icon={IconFileArrowRight} onClick={handleClick}>
      Export all
    </FormulaMenuItem>
  );
};
