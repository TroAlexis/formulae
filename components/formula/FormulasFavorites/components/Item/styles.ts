import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    flex: 1,
    minWidth: 0,
    display: "flex",
  },
}));
