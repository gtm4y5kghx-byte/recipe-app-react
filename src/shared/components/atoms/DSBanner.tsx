import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { colors } from "@/theme/colors";
import { resolveColor } from "@/shared/utils/resolveColor";

type BannerStyle = "info" | "warning" | "error" | "success";

type DSBannerProps = {
  message: string;
  icon: string;
  style: BannerStyle;
  actionTitle?: string;
  onAction?: () => void;
};

type ThemeColorKey = keyof typeof colors.light;

const bannerStyles: Record<
  BannerStyle,
  { bg: string; iconColor: ThemeColorKey; textColor: string }
> = {
  info: {
    bg: "bg-accent/10",
    iconColor: "accent",
    textColor: "text-accent",
  },
  warning: {
    bg: "bg-warning/10",
    iconColor: "warning",
    textColor: "text-warning",
  },
  error: {
    bg: "bg-error/10",
    iconColor: "error",
    textColor: "text-error",
  },
  success: {
    bg: "bg-success/10",
    iconColor: "success",
    textColor: "text-success",
  },
};

export const DSBanner = ({
  message,
  icon,
  style,
  actionTitle,
  onAction,
}: DSBannerProps) => {
  const themeColors = useThemeColors();
  const config = bannerStyles[style];

  return (
    <View
      className={`flex-row items-center rounded-md px-md py-sm ${config.bg}`}
    >
      <Ionicons
        name={icon as any}
        size={20}
        color={resolveColor(themeColors, config.iconColor)}
      />
      <Text className={`flex-1 ml-sm text-body ${config.textColor}`}>
        {message}
      </Text>
      {actionTitle && onAction && (
        <Pressable onPress={onAction} className="ml-sm">
          <Text className={`text-callout font-semibold ${config.textColor}`}>
            {actionTitle}
          </Text>
        </Pressable>
      )}
    </View>
  );
};
