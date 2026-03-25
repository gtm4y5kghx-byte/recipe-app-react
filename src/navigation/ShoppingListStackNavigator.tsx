import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ShoppingListStackParams } from "./types";
import { PlaceholderScreen } from "@/shared/components/PlaceholderScreen";

const Stack = createNativeStackNavigator<ShoppingListStackParams>();

export const ShoppingListStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShoppingListHome">
        {() => <PlaceholderScreen name="Shopping List" />}
      </Stack.Screen>
      <Stack.Screen name="RecipeDetail">
        {() => <PlaceholderScreen name="Recipe Detail" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
