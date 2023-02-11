import { HoverableProps } from "components/ui/Hoverable/models";
import { useStyles } from "components/ui/Hoverable/styles";
import React, { FC } from "react";

export const Hoverable: FC<HoverableProps> = ({ children, ...props }) => {
  const { classes } = useStyles(props);

  return <>{children?.({ className: classes.hoverable })}</>;
};
