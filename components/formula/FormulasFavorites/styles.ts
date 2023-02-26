import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.xs,
  },
  item: {
    display: "flex",
  },
  savedItem: {
    flex: 1,
    minWidth: 0,
  },
}));
