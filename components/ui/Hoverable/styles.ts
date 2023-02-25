import { createStyles, CSSObject } from "@mantine/core";
import { HoverableProps } from "components/ui/Hoverable/models";

export const useStyles = createStyles((_theme, params: HoverableProps) => {
  const onHover: CSSObject = {
    opacity: 1,
  };

  return {
    hoverable: {
      [`@media (hover: hover)`]: {
        opacity: 0,
        transitionDuration: ".3s",
        transitionTimingFunction: "ease-out",
        transitionProperty: "opacity",

        [`&:hover, &:focus`]: onHover,

        [`.${params.hoverTargetClassName}:hover &`]: onHover,
      },
    },
  };
});
