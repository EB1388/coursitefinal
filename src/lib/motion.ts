/** Shared easing — fast start, soft land */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function stagger(delay = 0.08) {
  return {
    visible: { transition: { staggerChildren: delay } },
  };
}
