import { ReactNode } from "react";

export interface HoverableProps {
  hoverTargetClassName?: string;
  children?: (props: HoverableRenderProps) => ReactNode | undefined;
}

export interface HoverableRenderProps {
  className?: string;
}
