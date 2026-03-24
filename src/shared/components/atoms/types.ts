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

export type FieldState = "normal" | "error" | "success" | "disabled";

export const fieldBorderStyles: Record<
  FieldState,
  { default: string; focused: string }
> = {
  normal: { default: "border-border", focused: "border-primary" },
  error: { default: "border-error", focused: "border-error" },
  success: { default: "border-success", focused: "border-success" },
  disabled: { default: "border-border", focused: "border-border" },
};

export const fieldHelperTextColor: Record<
  FieldState,
  "secondary" | "error" | "success" | "tertiary"
> = {
  normal: "secondary",
  error: "error",
  success: "success",
  disabled: "tertiary",
};

export const fieldIconColor: Record<
  FieldState,
  { default: string; focused: string }
> = {
  normal: { default: "secondary", focused: "brand" },
  error: { default: "error", focused: "error" },
  success: { default: "success", focused: "success" },
  disabled: { default: "tertiary", focused: "tertiary" },
};
