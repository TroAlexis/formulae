import { createStyles } from "@mantine/core";
import { ACTION_COLOR } from "config/mantine/theme";

export const useStyles = createStyles((theme) => ({
  selected: {
    [`&[data-with-border]`]: {
      borderColor: theme.colors[ACTION_COLOR][6],
    },
  },
}));
