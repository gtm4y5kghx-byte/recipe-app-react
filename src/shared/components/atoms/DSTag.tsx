import { View, Text } from "react-native";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { SemanticColor } from "@/shared/components/atoms/types";

type TagStyle =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "success"
  | "outline";
type TagSize = "small" | "medium" | "large";

type DSTagProps = {
  text: string;
  style?: TagStyle;
  size?: TagSize;
  icon?: string;
};

const tagStyles: Record<TagStyle, string> = {
  primary: "bg-primary",
  secondary: "bg-tag-secondary-bg",
  accent: "bg-accent",
  neutral: "bg-background-dark",
  success: "bg-success/15",
  outline: "bg-transparent border border-border",
};

const tagTextStyles: Record<
  TagStyle,
  { text: string; iconColor: SemanticColor }
> = {
  primary: { text: "text-white", iconColor: "white" },
  secondary: { text: "text-tag-secondary-text", iconColor: "brand" },
  accent: { text: "text-white", iconColor: "white" },
  neutral: { text: "text-content-secondary", iconColor: "secondary" },
  success: { text: "text-success", iconColor: "success" },
  outline: { text: "text-content-primary", iconColor: "primary" },
};

const sizeStyles: Record<
  TagSize,
  { container: string; text: string; iconSize: number }
> = {
  small: {
    container: "px-xs py-xs",
    text: "text-caption2",
    iconSize: 10,
  },
  medium: {
    container: "px-sm py-xs",
    text: "text-caption1",
    iconSize: 12,
  },
  large: {
    container: "px-md py-sm",
    text: "text-footnote",
    iconSize: 14,
  },
};

export const DSTag = ({
  text,
  style = "primary",
  size = "medium",
  icon,
}: DSTagProps) => {
  const sizeConfig = sizeStyles[size];
  const textConfig = tagTextStyles[style];

  return (
    <View
      className={`flex-row items-center rounded-full ${tagStyles[style]} ${sizeConfig.container}`}
    >
      {icon && <DSIcon name={icon} size="small" color={textConfig.iconColor} />}
      <Text
        numberOfLines={1}
        className={`${textConfig.text} ${sizeConfig.text} ${icon ? "ml-xs" : ""}`}
      >
        {text}
      </Text>
    </View>
  );
};
