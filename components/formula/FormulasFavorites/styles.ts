import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  item: {
    display: "flex",
  },
  /* Styles for truncate working as intended */
  itemWrapper: {
    flex: 1,
    minWidth: 0,
  },
  itemIcon: {
    "~ span": {
      display: "inline-flex",
      flex: 1,
      minWidth: 0,
    },
  },
  savedItem: {
    flex: 1,
    minWidth: 0,
  },
}));
