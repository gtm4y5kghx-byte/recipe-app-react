import { View, Pressable } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSIconButton } from "@/shared/components/atoms/DSIconButton";
import { DSButton } from "@/shared/components/atoms/DSButton";
import { Thumbnail } from "./Thumbnail";
import { SuggestionBadge } from "./SuggestionBadge";
import { MetaDataRow } from "./MetaDataRow";
import { TagsRow } from "./TagsRow";

type RecipeCardAction =
  | { type: "favorite"; isFavorite: boolean; onTap: () => void }
  | { type: "save"; onTap: () => void };

type DSRecipeCardProps = {
  title: string;
  imageURL?: string | null;
  subtitle?: string;
  showSuggestionBadge?: boolean;
  cuisine?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  tags?: string[];
  action: RecipeCardAction;
  onPress: () => void;
};

export const DSRecipeCard = ({
  title,
  imageURL,
  subtitle,
  showSuggestionBadge = false,
  cuisine,
  prepTime,
  cookTime,
  servings,
  tags = [],
  action,
  onPress,
}: DSRecipeCardProps) => {
  return (
    <Pressable onPress={onPress} className="flex-row items-start p-sm gap-md">
      <Thumbnail imageURL={imageURL} />

      {/* Content */}
      <View className="flex-1 gap-sm">
        <View className="gap-xs">
          <DSLabel text={title} style="headline" color="primary" />
          <SuggestionBadge
            showSuggestionBadge={showSuggestionBadge}
            subtitle={subtitle}
          />
        </View>

        <MetaDataRow
          servings={servings}
          prepTime={prepTime}
          cookTime={cookTime}
          cuisine={cuisine}
        />

        <TagsRow tags={tags} />

        {action.type === "save" && (
          <DSButton
            title="Save to Collection"
            style="primary"
            size="small"
            onPress={action.onTap}
          />
        )}
      </View>

      {action.type === "favorite" && (
        <DSIconButton
          icon={action.isFavorite ? "heart" : "heart-outline"}
          size="medium"
          color={action.isFavorite ? "error" : "secondary"}
          accessibilityLabel={
            action.isFavorite ? "Remove from favorites" : "Add to favorites"
          }
          onPress={action.onTap}
        />
      )}
    </Pressable>
  );
};
