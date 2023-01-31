import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const edgeRadius = theme.radius.lg;
  return {
    control: {
      "&:focus-visible": {
        zIndex: 1,
      },
      "&:first-child": {
        borderTopLeftRadius: edgeRadius,
        borderBottomLeftRadius: edgeRadius,
      },
      "&:last-child": {
        borderTopRightRadius: edgeRadius,
        borderBottomRightRadius: edgeRadius,
      },
    },
  };
});
