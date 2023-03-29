import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const paddingX = `${theme.spacing.xs} * 1.5`;

  return {
    root: {
      flex: 1,
    },
    input: {
      textAlign: "center",
      paddingLeft: `calc(${paddingX} + ${rem(4)})`,
      paddingRight: `calc(${paddingX})`,
      border: "1px solid transparent",
    },
    rightSection: {
      display: "none",
    },
  };
});
