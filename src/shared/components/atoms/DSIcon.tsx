import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { SemanticColor } from "@/shared/components/atoms/types";
import { resolveColor } from "@/shared/utils/resolveColor";

type IconSize = "small" | "medium" | "large" | "xlarge";

type DSIconProps = {
  name: string;
  size?: IconSize;
  color?: SemanticColor;
};

const sizeValues: Record<IconSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
  xlarge: 32,
};

const colorMap: Record<SemanticColor, string> = {
  primary: "text.primary",
  secondary: "text.secondary",
  tertiary: "text.tertiary",
  accent: "accent",
  brand: "primary",
  success: "success",
  warning: "warning",
  error: "error",
  white: "white",
};

export const DSIcon = ({
  name,
  size = "medium",
  color = "primary",
}: DSIconProps) => {
  const themeColors = useThemeColors();

  return (
    <Ionicons
      name={name as any}
      size={sizeValues[size]}
      color={resolveColor(themeColors, colorMap[color])}
    />
  );
};
