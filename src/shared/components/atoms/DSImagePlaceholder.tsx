import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { CornerRadius, radiusStyles } from "./types";

type DSImagePlaceholderProps = {
  height: number;
  cornerRadius?: CornerRadius;
};

export const DSImagePlaceholder = ({
  height,
  cornerRadius = "md",
}: DSImagePlaceholderProps) => {
  const themeColors = useThemeColors();
  const iconSize = Math.min(height * 0.25, 48);

  return (
    <View
      style={{ height }}
      className={`w-full items-center justify-center bg-background-dark ${radiusStyles[cornerRadius]}`}
    >
      <Ionicons
        name="restaurant-outline"
        size={iconSize}
        color={themeColors.text.tertiary}
      />
    </View>
  );
};
