export const checkIsIOS = () =>
  [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform) ||
  // iPad on iOS 13 detection
  (navigator.userAgent.includes("Mac") && "ontouchend" in document);

export const getOrigin = () => {
  return typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";
};
