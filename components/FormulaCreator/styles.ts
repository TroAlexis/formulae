import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  scroll: {
    overflow: "auto",
    flex: "1 1 0",
  },
}));
