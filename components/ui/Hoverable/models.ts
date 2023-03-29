import { FC } from "react";

export interface HoverableProps {
  hoverTargetClassName?: string;
  children?: FC<HoverableRenderProps>;
}

export interface HoverableRenderProps {
  className?: string;
}
