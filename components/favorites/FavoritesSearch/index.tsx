import { TextInput, TextInputProps, useMantineTheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { FavoritesSearchHint } from "components/favorites/FavoritesSearch/components/Hint";
import { useFavoritesStore } from "modules/favorites";
import {
  selectFavoritesSearchText,
  selectFavoritesSetSearchText,
} from "modules/favorites/selectors";
import { FC, useCallback, useRef } from "react";

interface Props extends TextInputProps {}

export const FavoritesSearch: FC<Props> = (props) => {
  const theme = useMantineTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchText = useFavoritesStore(selectFavoritesSearchText);
  const setSearchText = useFavoritesStore(selectFavoritesSetSearchText);

  const handleChange: TextInputProps["onChange"] = (e) => {
    const value = e.target.value;

    setSearchText(value);
  };

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  useHotkeys([["mod+K", focusInput]]);

  return (
    <TextInput
      icon={<IconSearch size={theme.spacing.sm} />}
      value={searchText}
      placeholder={"Search saved formulas"}
      onChange={handleChange}
      ref={inputRef}
      rightSection={<FavoritesSearchHint />}
      rightSectionWidth={60}
      {...props}
    />
  );
};
