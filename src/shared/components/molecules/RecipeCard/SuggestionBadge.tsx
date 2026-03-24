import { View } from "react-native";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { DSLabel } from "@/shared/components/atoms/DSLabel";

type SuggestionBadgeProps = {
  showSuggestionBadge?: boolean;
  subtitle: string | undefined;
};

export const SuggestionBadge = ({
  showSuggestionBadge,
  subtitle,
}: SuggestionBadgeProps) => {
  if (!subtitle) return null;
  return showSuggestionBadge ? (
    <View className="flex-row items-center gap-xs">
      <DSIcon name="sparkles" size="small" color="accent" />
      <DSLabel text={`For You: ${subtitle}`} style="caption1" color="accent" />
    </View>
  ) : (
    <DSLabel text={subtitle} style="caption1" color="secondary" />
  );
};
