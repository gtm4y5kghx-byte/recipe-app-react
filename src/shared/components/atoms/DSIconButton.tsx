import { Pressable, View } from "react-native";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { SemanticColor } from "@/shared/components/atoms/types";

type IconButtonStyle = "plain" | "filled" | "filledPrimary" | "filledAccent";
type IconSize = "small" | "medium" | "large" | "xlarge";

type DSIconButtonProps = {
  icon: string;
  size?: IconSize;
  color?: SemanticColor;
  style?: IconButtonStyle;
  accessibilityLabel: string;
  onPress: () => void;
};

const paddingStyles: Record<IconSize, string> = {
  small: "p-xs",
  medium: "p-sm",
  large: "p-sm",
  xlarge: "p-md",
};

const backgroundStyles: Record<IconButtonStyle, string> = {
  plain: "",
  filled: "bg-background-light rounded-full",
  filledPrimary: "bg-primary rounded-full shadow",
  filledAccent: "bg-accent rounded-full shadow",
};

const iconColorOverride: Record<IconButtonStyle, SemanticColor | null> = {
  plain: null,
  filled: null,
  filledPrimary: "white",
  filledAccent: "white",
};

export const DSIconButton = ({
  icon,
  size = "medium",
  color = "primary",
  style = "plain",
  accessibilityLabel,
  onPress,
}: DSIconButtonProps) => {
  const resolvedColor = iconColorOverride[style] ?? color;

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      className={`${paddingStyles[size]} ${backgroundStyles[style]}`}
    >
      <DSIcon name={icon} size={size} color={resolvedColor} />
    </Pressable>
  );
};
