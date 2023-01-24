import { createStyles } from "@mantine/core";

const CONTROL_HEIGHT = 14;

export const useStyles = createStyles(() => ({
  nameInput: {
    fontWeight: 500,
    height: CONTROL_HEIGHT,
    minHeight: CONTROL_HEIGHT,
    lineHeight: `${CONTROL_HEIGHT}px`,
  },
  iconWrapper: {
    height: CONTROL_HEIGHT,
    minHeight: CONTROL_HEIGHT,
  },
  icon: {
    width: `70%`,
    height: `70%`,
  },
}));
