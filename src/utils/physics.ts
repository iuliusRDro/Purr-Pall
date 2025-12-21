/**
 * "Plushie Physics" (Spring Configuration)
 *
 * A soft, bouncy spring configuration that feels like squeezing a plushie.
 * Used for scale interactions, button presses, and card releases.
 */
export const plushieSpring = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 1,
};

/**
 * "Soft Dissolve" (Transition)
 *
 * A gentle fade for page transitions and modal appearances.
 */
export const softDissolve = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for a natural feel
};

/**
 * Common variants for "Pop In" animations
 */
export const popInVariant = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: plushieSpring,
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};
