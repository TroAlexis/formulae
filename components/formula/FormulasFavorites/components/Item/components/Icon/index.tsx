import { Text, ThemeIcon, Tooltip, useMantineTheme } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useStyles } from "components/formula/FormulasFavorites/components/Item/components/Icon/styles";
import { ACTION_COLOR } from "config/mantine/theme";
import { useFormulaContext } from "contexts/useFormulaContext";
import { FormulaType } from "modules/formulas/enums";
import React, { FC } from "react";

export const FormulasFavoritesItemIcon: FC = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { formula } = useFormulaContext(FormulaType.EXPRESSION);
  return (
    <Tooltip
      withArrow
      position={"right"}
      withinPortal
      label={
        <Text size={"xs"} className={classes.tooltip}>
          {formula.description || (
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
