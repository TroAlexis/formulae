import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  viewport: {
    "& > div": {
      display: "block !important",
    },
  },
  search: {
    flex: 1,
  },
}));
