export const arrowClass = (openValue: boolean) => {
  return openValue
    ? "transform rotate-180 transition-transform duration-300"
    : "transform rotate-0 transition-transform duration-300";
};
