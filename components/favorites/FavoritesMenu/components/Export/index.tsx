import { useClipboard } from "@mantine/hooks";
import { IconFileArrowRight } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { useFavoritesStore } from "modules/favorites";
import { selectMap } from "modules/map/selectors";
import React, { FC } from "react";
import { serialize } from "utils/serialize";

interface Props {}

export const FavoritesMenuExport: FC<Props> = ({}) => {
  const map = useFavoritesStore(selectMap);
  const { copy } = useClipboard();

  const handleClick = () => {
    const slices = Object.values(map);
    const value = serialize(slices);
    copy(value);
  };

  return (
    <FormulaMenuItem icon={IconFileArrowRight} onClick={handleClick}>
      Export all
    </FormulaMenuItem>
  );
};
