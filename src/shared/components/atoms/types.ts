export type SemanticColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "accent"
  | "brand"
  | "success"
  | "warning"
  | "error"
  | "white";

export type CornerRadius = "sm" | "md" | "lg";

export const radiusStyles: Record<CornerRadius, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
};
