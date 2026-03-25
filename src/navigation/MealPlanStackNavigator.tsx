import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MealPlanStackParams } from "./types";
import { PlaceholderScreen } from "@/shared/components/PlaceholderScreen";

const Stack = createNativeStackNavigator<MealPlanStackParams>();

export const MealPlanStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MealPlanHome">
        {() => <PlaceholderScreen name="Meal Plan" />}
      </Stack.Screen>
      <Stack.Screen name="RecipeDetail">
        {() => <PlaceholderScreen name="Recipe Detail" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
