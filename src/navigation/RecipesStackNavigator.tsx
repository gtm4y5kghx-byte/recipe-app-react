import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecipesStackParams } from "./types";
import { PlaceholderScreen } from "@/shared/components/PlaceholderScreen";
import { RecipeListScreen } from "@/features/recipes/screens/RecipeListScreen";
import { RecipeDetailScreen } from "@/features/recipes/screens/RecipeDetailScreen";

const Stack = createNativeStackNavigator<RecipesStackParams>();

export const RecipesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecipeList" component={RecipeListScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      <Stack.Screen name="RecipeForm">
        {() => <PlaceholderScreen name="Recipe Form" />}
      </Stack.Screen>
      <Stack.Screen name="CookingMode">
        {() => <PlaceholderScreen name="Cooking Mode" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
