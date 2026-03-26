import { useMemo } from "react";
import { View, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecipes } from "../hooks/useRecipes";
import { DSRecipeCard } from "@/shared/components/molecules/RecipeCard";
import { DSEmptyState } from "@/shared/components/molecules/DSEmptyState";
import { DSDivider } from "@/shared/components/atoms/DSDivider";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { RecipeModel } from "@/shared/models/db/RecipeModel";
import { useDatabase } from "@nozbe/watermelondb/react";
import { createRecipeService } from "@/shared/services/createRecipeService";

export const RecipeListScreen = () => {
  const { recipes, searchQuery, setSearchQuery } = useRecipes();
  const themeColors = useThemeColors();
  const database = useDatabase();
  const service = useMemo(() => createRecipeService(database), [database]);

  const handleFavoriteToggle = (recipe: RecipeModel) => {
    service.toggleFavorite(recipe);
  };

  const handlePress = (recipe: RecipeModel) => {
    // Navigation wired in next step
  };

  const renderItem = ({ item }: { item: RecipeModel }) => (
    <DSRecipeCard
      title={item.title}
      imageURL={item.imageURL}
      cuisine={item.cuisine}
      prepTime={item.prepTime ?? undefined}
      cookTime={item.cookTime ?? undefined}
      servings={item.servings ?? undefined}
      tags={item.userTags}
      action={{
        type: "favorite",
        isFavorite: item.isFavorite,
        onTap: () => handleFavoriteToggle(item),
      }}
      onPress={() => handlePress(item)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-md pt-lg pb-sm">
        <View className="flex-row items-center bg-background-light rounded-md px-sm py-xs">
          <DSIcon name="search-outline" size="medium" color="tertiary" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search recipes..."
            placeholderTextColor={themeColors.text.tertiary}
            className="flex-1 ml-sm text-body text-content-primary"
          />
        </View>
      </View>

      {recipes.length === 0 ? (
        <DSEmptyState
          icon="book-outline"
          title="No Recipes Yet"
          message="Add your first recipe to get started."
          actionTitle="Add Recipe"
          onAction={() => {}}
        />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <DSDivider thickness="thin" color="subtle" spacing="none" />
          )}
        />
      )}
    </SafeAreaView>
  );
};
