import { Montserrat, Noto_Sans } from "@next/font/google";

export const noto = Noto_Sans({
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"],
  style: "normal",
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
