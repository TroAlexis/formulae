import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const edgeRadius = theme.radius.lg;
  return {
    control: {
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
