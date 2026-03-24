import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type DSPageIndicatorProps = {
  pageCount: number;
  currentPage: number;
};

const Dot = ({ active }: { active: boolean }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active ? 1 : 0.3, { duration: 200 }),
    transform: [{ scale: withTiming(active ? 1.2 : 1, { duration: 200 }) }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className={`h-[8px] w-[8px] rounded-full ${active ? "bg-primary" : "bg-border"}`}
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
