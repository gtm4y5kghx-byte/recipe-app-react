import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecipes } from "../hooks/useRecipes";
import { DSEmptyState } from "@/shared/components/molecules/DSEmptyState";
import { DSDivider } from "@/shared/components/atoms/DSDivider";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { RecipeModel } from "@/shared/models/db/RecipeModel";

import { RecipesStackParams } from "@/navigation/types";
import { ObservableRecipeCard } from "../components/ObservableRecipeCard";

export const RecipeListScreen = () => {
  const { recipes, searchQuery, setSearchQuery } = useRecipes();
  const themeColors = useThemeColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RecipesStackParams>>();

  const handlePress = (recipe: RecipeModel) => {
    navigation.navigate("RecipeDetail", { id: recipe.id });
  };

  const renderItem = ({ item }: { item: RecipeModel }) => (
    <ObservableRecipeCard recipe={item} onPress={handlePress} />
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
