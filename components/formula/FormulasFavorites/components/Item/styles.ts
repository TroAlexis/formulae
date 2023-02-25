import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    marginRight: theme.spacing.xs,
  },
}));
