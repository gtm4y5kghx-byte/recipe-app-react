import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import { TabParams } from "./types";
import { RecipesStackNavigator } from "./RecipesStackNavigator";
import { MealPlanStackNavigator } from "./MealPlanStackNavigator";
import { ShoppingListStackNavigator } from "./ShoppingListStackNavigator";

const Tab = createBottomTabNavigator<TabParams>();

const RecipesTabWithBoundary = () => (
  <ErrorBoundary>
    <RecipesStackNavigator />
  </ErrorBoundary>
);

const MealPlanTabWithBoundary = () => (
  <ErrorBoundary>
    <MealPlanStackNavigator />
  </ErrorBoundary>
);

const ShoppingListTabWithBoundary = () => (
  <ErrorBoundary>
    <ShoppingListStackNavigator />
  </ErrorBoundary>
);

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
        component={RecipesTabWithBoundary}
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MealPlanTab"
        component={MealPlanTabWithBoundary}
        options={{
          title: "Meal Plan",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ShoppingListTab"
        component={ShoppingListTabWithBoundary}
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
