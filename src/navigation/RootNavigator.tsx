import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParams } from "./types";
import { TabNavigator } from "./TabNavigator";
import { PlaceholderScreen } from "@/shared/components/PlaceholderScreen";

const Stack = createNativeStackNavigator<RootStackParams>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Settings">
          {() => <PlaceholderScreen name="Settings" />}
        </Stack.Screen>
        <Stack.Screen name="NewRecipe">
          {() => <PlaceholderScreen name="New Recipe" />}
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
};
