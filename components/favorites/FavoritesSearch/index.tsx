import { TextInput, TextInputProps, useMantineTheme } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useFavoritesStore } from "modules/favorites";
import {
  selectFavoritesSearchText,
  selectFavoritesSetSearchText,
} from "modules/favorites/selectors";
import { FC } from "react";

interface Props extends TextInputProps {}

export const FavoritesSearch: FC<Props> = (props) => {
  const theme = useMantineTheme();
  const searchText = useFavoritesStore(selectFavoritesSearchText);
  const setSearchText = useFavoritesStore(selectFavoritesSetSearchText);

  const handleChange: TextInputProps["onChange"] = (e) => {
    const value = e.target.value;

    setSearchText(value);
  };

  return (
    <TextInput
      icon={<IconSearch size={theme.spacing.sm} />}
      value={searchText}
      placeholder={"Search saved formulas"}
      onChange={handleChange}
      {...props}
    />
  );
};
