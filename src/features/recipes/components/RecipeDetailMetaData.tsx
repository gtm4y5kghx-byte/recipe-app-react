import { View } from "react-native";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSSection } from "@/shared/components/molecules/DSSection";

type RecipeDetailMetadataProps = {
  totalTime?: number | null;
  servings?: number | null;
  cuisine?: string;
};

export const RecipeDetailMetadata = ({
  totalTime,
  servings,
  cuisine,
}: RecipeDetailMetadataProps) => {
  if (!totalTime && !servings && !cuisine) return null;

  return (
    <DSSection>
      <View className="flex-row items-center gap-lg">
        {totalTime && (
          <View className="flex-row items-center gap-xs">
            <DSIcon name="time-outline" size="small" color="secondary" />
            <DSLabel
              text={`${totalTime} min`}
              style="caption1"
              color="secondary"
            />
          </View>
        )}
        {servings && (
          <View className="flex-row items-center gap-xs">
            <DSIcon name="people-outline" size="small" color="secondary" />
            <DSLabel
              text={`${servings} servings`}
              style="caption1"
              color="secondary"
            />
          </View>
        )}
        {cuisine && (
          <View className="flex-row items-center gap-xs">
            <DSIcon name="restaurant-outline" size="small" color="secondary" />
            <DSLabel text={cuisine} style="caption1" color="secondary" />
          </View>
        )}
      </View>
    </DSSection>
  );
};
