import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { SemanticColor } from "@/shared/components/atoms/types";

type ToastStyle = "success" | "error" | "warning" | "info";

type DSToastProps = {
  message: string;
  style: ToastStyle;
  visible: boolean;
  duration?: number;
  onDismiss: () => void;
};

const toastStyles: Record<
  ToastStyle,
  { bg: string; icon: string; color: SemanticColor }
> = {
  success: {
    bg: "bg-success",
    icon: "checkmark-circle-outline",
    color: "white",
  },
  error: { bg: "bg-error", icon: "alert-circle-outline", color: "white" },
  warning: { bg: "bg-warning", icon: "warning-outline", color: "white" },
  info: { bg: "bg-accent", icon: "information-circle-outline", color: "white" },
};

const OPACITY_HIDDEN = 0;
const OPACITY_VISIBLE = 1;
const TRANSLATE_Y_HIDDEN = -20;
const TRANSLATE_Y_VISIBLE = 0;
const ANIMATION_DURATION = 200;

export const DSToast = ({
  message,
  style,
  visible,
  duration = 3000,
  onDismiss,
}: DSToastProps) => {
  const opacity = useSharedValue(OPACITY_HIDDEN);
  const translateY = useSharedValue(TRANSLATE_Y_HIDDEN);
  const config = toastStyles[style];

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(OPACITY_VISIBLE, {
        duration: ANIMATION_DURATION,
      });
      translateY.value = withTiming(TRANSLATE_Y_VISIBLE, {
        duration: ANIMATION_DURATION,
      });

      opacity.value = withDelay(
        duration,
        withTiming(OPACITY_HIDDEN, { duration: ANIMATION_DURATION }),
      );
      translateY.value = withDelay(
        duration,
        withTiming(TRANSLATE_Y_HIDDEN, { duration: ANIMATION_DURATION }),
      );

      const timer = setTimeout(onDismiss, duration + 200);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <Animated.View
      style={animatedStyle}
      className={`absolute top-xl left-md right-md flex-row items-center rounded-md px-md py-sm ${config.bg}`}
    >
      <DSIcon name={config.icon} size="medium" color={config.color} />
      <View className="flex-1 ml-sm">
        <DSLabel text={message} style="callout" color="white" />
      </View>
    </Animated.View>
  );
};
