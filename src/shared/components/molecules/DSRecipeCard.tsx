import { View, Pressable } from "react-native";
import { DSImage } from "@/shared/components/atoms/DSImage";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { DSIconButton } from "@/shared/components/atoms/DSIconButton";
import { DSTag } from "@/shared/components/atoms/DSTag";
import { DSDivider } from "@/shared/components/atoms/DSDivider";

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

const MAX_VISIBLE_TAGS = 2;

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
  const totalTime = (prepTime ?? 0) + (cookTime ?? 0) || undefined;
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const overflowCount = tags.length - MAX_VISIBLE_TAGS;

  return (
    <Pressable
      onPress={onPress}
      className="bg-background-light rounded-lg overflow-hidden shadow"
    >
      <DSImage url={imageURL} height={160} cornerRadius="lg" />

      <View className="p-md gap-sm">
        {/* Title row */}
        <View className="flex-row items-start justify-between">
          <View className="flex-1 mr-sm">
            <DSLabel text={title} style="headline" color="primary" />
          </View>
          {action.type === "favorite" ? (
            <DSIconButton
              icon={action.isFavorite ? "heart" : "heart-outline"}
              size="medium"
              color={action.isFavorite ? "error" : "secondary"}
              accessibilityLabel={
                action.isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              onPress={action.onTap}
            />
          ) : (
            <DSIconButton
              icon="bookmark-outline"
              size="medium"
              color="secondary"
              accessibilityLabel="Save recipe"
              onPress={action.onTap}
            />
          )}
        </View>

        {/* Subtitle or suggestion badge */}
        {showSuggestionBadge ? (
          <View className="flex-row items-center gap-xs">
            <DSIcon name="sparkles" size="small" color="accent" />
            <DSLabel text="For You" style="caption1" color="accent" />
          </View>
        ) : subtitle ? (
          <DSLabel text={subtitle} style="caption1" color="secondary" />
        ) : null}

        {/* Metadata row */}
        {(totalTime || servings || cuisine) && (
          <>
            <DSDivider thickness="thin" color="subtle" spacing="none" />
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
                  <DSIcon
                    name="people-outline"
                    size="small"
                    color="secondary"
                  />
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
          </>
        )}

        {/* Tags */}
        {visibleTags.length > 0 && (
          <View className="flex-row items-center gap-xs">
            {visibleTags.map((tag) => (
              <DSTag key={tag} text={tag} style="secondary" size="small" />
            ))}
            {overflowCount > 0 && (
              <DSLabel
                text={`+${overflowCount} more`}
                style="caption2"
                color="tertiary"
              />
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};
