import { Text, ThemeIcon, Tooltip, useMantineTheme } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useStyles } from "components/formula/FormulasFavorites/components/Item/components/Icon/styles";
import { ACTION_COLOR } from "config/mantine/theme";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props {
  item: FormulaComputable;
}

export const FormulasFavoritesItemIcon: FC<Props> = ({ item }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <Tooltip
      withArrow
      position={"right"}
      withinPortal
      label={
        <Text size={"xs"} className={classes.tooltip}>
          {item.description || (
            <>
              <span>Description goes here!</span>
              <span>You can edit it in the menu.</span>
            </>
          )}
        </Text>
      }
    >
      <ThemeIcon
        size={"sm"}
        variant={"light"}
        radius={"xl"}
        color={ACTION_COLOR}
        mr={"xs"}
        tabIndex={0}
      >
        <IconInfoCircle size={theme.spacing.sm} />
      </ThemeIcon>
    </Tooltip>
  );
};
