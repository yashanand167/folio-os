export const designSystem = {
  colors: {
    primary: "#0a0a0a",
    secondary: "#f4f4f5",
    accent: "#c8f542",
    muted: "#71717a",
  },
  typography: {
    fontFamily: "Space Grotesk",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  motion: {
    spring: {
      type: "spring" as const,
      stiffness: 420,
      damping: 28,
    },
    hoverScale: 1.03,
  },
  spacing: {
    padding: 20,
    margin: 20,
  },
  borderRadius: {
    small: 12,
    medium: 20,
    large: 32,
    pill: 999,
  },
};
