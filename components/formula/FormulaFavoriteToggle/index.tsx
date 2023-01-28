import {
  ActionIcon,
  ActionIconProps,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import React, { FC } from "react";

import { useHandlerProcess } from "../../../hooks/useHandlerProcess";
import { useFavoritesStore } from "../../../modules/favorites";
import { selectAddFavorite } from "../../../modules/favorites/selectors";
import { FormulaComputable } from "../../../modules/formulas/models";
import { useStyles } from "./styles";

interface Props extends ActionIconProps {
  computable: FormulaComputable;
}

export const FormulaFavoriteToggle: FC<Props> = ({ computable, ...props }) => {
  const { classes } = useStyles();
  const addFavorite = useFavoritesStore(selectAddFavorite);
  const onAddFavorite = () => {
    addFavorite(computable);
  };
  const { handle: handleAddFavorite, compeleted } = useHandlerProcess({
    handler: onAddFavorite,
  });
  return (
    <Tooltip
      label={
        <Text fw={500} size={"xs"}>
          {compeleted ? "formula saved" : "save formula"}
        </Text>
      }
      position={"right"}
      withArrow
    >
      <ActionIcon
        size={"lg"}
        variant={"transparent"}
        color={"lime"}
        onClick={handleAddFavorite}
        {...props}
      >
        <ThemeIcon
          variant={"gradient"}
          radius={"xl"}
          size={"xs"}
          gradient={{ from: "red", to: "pink" }}
        >
          <IconDeviceFloppy className={classes.icon} />
        </ThemeIcon>
      </ActionIcon>
    </Tooltip>
  );
};
