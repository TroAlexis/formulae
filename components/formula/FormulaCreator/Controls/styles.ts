import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const edgeRadius = theme.radius.lg;
  return {
    control: {
      "&:focus-visible": {
        zIndex: 1,
      },
      "&:first-of-type": {
        borderTopLeftRadius: edgeRadius,
        borderBottomLeftRadius: edgeRadius,
      },
      "&:last-of-type": {
        borderTopRightRadius: edgeRadius,
        borderBottomRightRadius: edgeRadius,
      },
    },
  };
});
