import { View } from "react-native";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { DSLabel } from "@/shared/components/atoms/DSLabel";

type MetaDataRowProps = {
  cuisine?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
};

export const MetaDataRow = ({
  cuisine,
  prepTime,
  cookTime,
  servings,
}: MetaDataRowProps) => {
  const totalTime = (prepTime ?? 0) + (cookTime ?? 0) || undefined;

  return (
    <>
      {(totalTime || servings || cuisine) && (
        <View className="flex-row items-center gap-md">
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
                text={`${servings}`}
                style="caption1"
                color="secondary"
              />
            </View>
          )}
          {cuisine && (
            <DSLabel text={cuisine} style="caption1" color="tertiary" />
          )}
        </View>
      )}
    </>
  );
};
