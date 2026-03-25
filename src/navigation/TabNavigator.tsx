import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { TabParams } from "./types";
import { RecipesStackNavigator } from "./RecipesStackNavigator";
import { MealPlanStackNavigator } from "./MealPlanStackNavigator";
import { ShoppingListStackNavigator } from "./ShoppingListStackNavigator";

const Tab = createBottomTabNavigator<TabParams>();

export const TabNavigator = () => {
  const themeColors = useThemeColors();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.text.tertiary,
        tabBarStyle: {
          backgroundColor: themeColors.background.DEFAULT,
          borderTopColor: themeColors.border,
        },
      }}
    >
      <Tab.Screen
        name="RecipesTab"
        component={RecipesStackNavigator}
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MealPlanTab"
        component={MealPlanStackNavigator}
        options={{
          title: "Meal Plan",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ShoppingListTab"
        component={ShoppingListStackNavigator}
        options={{
          title: "Shopping List",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
