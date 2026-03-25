import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecipesStackParams } from "./types";
import { PlaceholderScreen } from "@/shared/components/PlaceholderScreen";

const Stack = createNativeStackNavigator<RecipesStackParams>();

export const RecipesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecipeList">
        {() => <PlaceholderScreen name="Recipe List" />}
      </Stack.Screen>
      <Stack.Screen name="RecipeDetail">
        {() => <PlaceholderScreen name="Recipe Detail" />}
      </Stack.Screen>
      <Stack.Screen name="RecipeForm">
        {() => <PlaceholderScreen name="Recipe Form" />}
      </Stack.Screen>
      <Stack.Screen name="CookingMode">
        {() => <PlaceholderScreen name="Cooking Mode" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
