import { View } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSIconButton } from "@/shared/components/atoms/DSIconButton";
import { DSSection } from "@/shared/components/molecules/DSSection";

type RecipeDetailHeaderProps = {
  title: string;
  isFavorite: boolean;
  onFavoriteTap: () => void;
};

export const RecipeDetailHeader = ({
  title,
  isFavorite,
  onFavoriteTap,
}: RecipeDetailHeaderProps) => {
  return (
    <DSSection>
      <View className="flex-row items-start">
        <View className="flex-1 mr-sm">
          <DSLabel text={title} style="title2" color="primary" />
        </View>
        <DSIconButton
          icon={isFavorite ? "heart" : "heart-outline"}
          size="large"
          color={isFavorite ? "error" : "secondary"}
          accessibilityLabel={
            isFavorite ? "Remove from favorites" : "Add to favorites"
          }
          onPress={onFavoriteTap}
        />
      </View>
    </DSSection>
  );
};
