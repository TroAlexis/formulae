import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -53%)",
    top: "50%",
    margin: 0,
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
  },
  burger: {
    marginLeft: theme.spacing.md,
  },
  theme: {
    marginRight: theme.spacing.md,
    marginLeft: "auto",
  },
}));
