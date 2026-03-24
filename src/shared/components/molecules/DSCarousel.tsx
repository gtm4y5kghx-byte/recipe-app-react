import { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { DSPageIndicator } from "@/shared/components/atoms/DSPageIndicator";

type PageIndicatorPosition = "top" | "bottom" | "none";

type DSCarouselProps = {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  showPageIndicator?: boolean;
  pageIndicatorPosition?: PageIndicatorPosition;
  children: (index: number) => React.ReactNode;
};

const SWIPE_THRESHOLD = 0.25; // 25% of screen width
const SPRING_CONFIG = { damping: 20, stiffness: 200 };

export const DSCarousel = ({
  pageCount,
  currentPage,
  onPageChange,
  showPageIndicator = true,
  pageIndicatorPosition = "bottom",
  children,
}: DSCarouselProps) => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);

  const handleDrag = (translationX: number) => {
    translateX.value = translationX;
  };

  const handleDragEnd = (translationX: number) => {
    const threshold = width * SWIPE_THRESHOLD;
    const swipedLeft = translationX < -threshold;
    const swipedRight = translationX > threshold;
    const canGoNext = currentPage < pageCount - 1;
    const canGoPrev = currentPage > 0;

    if (swipedLeft && canGoNext) {
      onPageChange(currentPage + 1);
    } else if (swipedRight && canGoPrev) {
      onPageChange(currentPage - 1);
    }

    translateX.value = withSpring(0, SPRING_CONFIG);
  };

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((event) => handleDrag(event.translationX))
    .onEnd((event) => handleDragEnd(event.translationX));

  const pageOffset = -currentPage * width;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pageOffset + translateX.value }],
  }));

  const indicator = showPageIndicator && pageIndicatorPosition !== "none" && (
    <View className="items-center py-sm">
      <DSPageIndicator pageCount={pageCount} currentPage={currentPage} />
    </View>
  );

  return (
    <View className="overflow-hidden">
      {pageIndicatorPosition === "top" && indicator}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[animatedStyle, { width: width * pageCount }]}
          className="flex-row"
        >
          {Array.from({ length: pageCount }, (_, index) => (
            <View key={index} style={{ width }}>
              {children(index)}
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
      {pageIndicatorPosition === "bottom" && indicator}
    </View>
  );
};
