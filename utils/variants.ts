export const fadeIn = (
  direction: "up" | "down" | "left" | "right" = "up",
  delay: number = 0
) => {
  const transition = {
    type: "tween",
    duration: 1.5,
    delay: delay,
    ease: [0.25, 0.6, 0.3, 0.8],
  };

  return {
    hidden: {
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
      opacity: 0,
      transition,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        ...transition,
        duration: 1.4,
      },
    },
  };
};
