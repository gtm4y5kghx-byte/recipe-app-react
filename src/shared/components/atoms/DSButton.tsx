import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

type ButtonStyle = "primary" | "secondary" | "tertiary" | "destructive";
type ButtonSize = "small" | "medium" | "large";

type DSButtonProps = {
  title: string;
  style?: ButtonStyle;
  size?: ButtonSize;
  icon?: string;
  onPress: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
};

const textStyles: Record<ButtonStyle, string> = {
  primary: "text-white",
  secondary: "text-primary",
  tertiary: "text-primary",
  destructive: "text-white",
};

const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
  small: {
    container: "py-sm px-md",
    text: "text-callout",
  },
  medium: {
    container: "py-md px-lg",
    text: "text-headline font-semibold",
  },
  large: {
    container: "py-lg px-lg",
    text: "text-headline font-semibold",
  },
};

export const DSButton = ({
  title,
  style = "primary",
  size = "medium",
  icon,
  onPress,
  fullWidth = true,
  disabled = false,
}: DSButtonProps) => {
  const themeColors = useThemeColors();
  const gradientColors = {
    primary: [themeColors.primary, `${themeColors.primary}D9`] as const,
    destructive: [themeColors.error, `${themeColors.error}D9`] as const,
  };
  const hasGradient = style === "primary" || style === "destructive";
  const sizeConfig = sizeStyles[size];

  const content = (
    <View
      className={`flex-row items-center justify-center gap-sm ${sizeConfig.container}`}
    >
      {icon && (
        <Ionicons
          name={icon as any}
          size={16}
          color={
            style === "primary" || style === "destructive"
              ? themeColors.white
              : themeColors.primary
          }
        />
      )}
      <Text className={`${textStyles[style]} ${sizeConfig.text}`}>{title}</Text>
    </View>
  );

  const baseStyles = `rounded-md overflow-hidden ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-50" : ""}`;

  const borderStyles = style === "secondary" ? "border-2 border-primary" : "";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${baseStyles} ${borderStyles}`}
    >
      {hasGradient ? (
        <LinearGradient
          colors={[...gradientColors[style as "primary" | "destructive"]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </Pressable>
  );
};
