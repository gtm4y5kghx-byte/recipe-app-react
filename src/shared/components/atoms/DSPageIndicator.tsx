import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type DSPageIndicatorProps = {
  pageCount: number;
  currentPage: number;
};

const DOT_SIZE = 8;
const ACTIVE_SCALE = 1.2;
const INACTIVE_SCALE = 1;
const ACTIVE_OPACITY = 1;
const INACTIVE_OPACITY = 0.3;
const ANIMATION_DURATION = 200;

const Dot = ({ active }: { active: boolean }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active ? ACTIVE_OPACITY : INACTIVE_OPACITY, {
      duration: ANIMATION_DURATION,
    }),
    transform: [
      {
        scale: withTiming(active ? ACTIVE_SCALE : INACTIVE_SCALE, {
          duration: ANIMATION_DURATION,
        }),
      },
    ],
  }));

  return (
    <Animated.View
      style={[animatedStyle, { height: DOT_SIZE, width: DOT_SIZE }]}
      className={`rounded-full ${active ? "bg-primary" : "bg-border"}`}
    />
  );
};

export const DSPageIndicator = ({
  pageCount,
  currentPage,
}: DSPageIndicatorProps) => {
  return (
    <View className="flex-row items-center gap-sm">
      {Array.from({ length: pageCount }, (_, index) => (
        <Dot key={index} active={index === currentPage} />
      ))}
    </View>
  );
};
