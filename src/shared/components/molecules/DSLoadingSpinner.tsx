import { View, ActivityIndicator } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

type SpinnerSize = "small" | "medium" | "large";

type DSLoadingSpinnerProps = {
  message?: string;
  size?: SpinnerSize;
};

const sizeMap: Record<SpinnerSize, "small" | "large"> = {
  small: "small",
  medium: "large",
  large: "large",
};

export const DSLoadingSpinner = ({
  message,
  size = "medium",
}: DSLoadingSpinnerProps) => {
  const themeColors = useThemeColors();

  return (
    <View className="items-center justify-center gap-sm">
      <ActivityIndicator size={sizeMap[size]} color={themeColors.primary} />
      {message && (
        <DSLabel
          text={message}
          style="caption1"
          color="secondary"
          alignment="center"
        />
      )}
    </View>
  );
};
