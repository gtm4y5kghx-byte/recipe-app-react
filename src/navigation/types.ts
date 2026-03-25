import type { NavigatorScreenParams } from "@react-navigation/native";

export type RecipesStackParams = {
  RecipeList: undefined;
  RecipeDetail: { id: string };
  RecipeForm: { id?: string };
  CookingMode: { id: string };
};

export type MealPlanStackParams = {
  MealPlanHome: undefined;
  RecipeDetail: { id: string };
};

export type ShoppingListStackParams = {
  ShoppingListHome: undefined;
  RecipeDetail: { id: string };
};

export type TabParams = {
  RecipesTab: NavigatorScreenParams<RecipesStackParams>;
  MealPlanTab: NavigatorScreenParams<MealPlanStackParams>;
  ShoppingListTab: NavigatorScreenParams<ShoppingListStackParams>;
};

export type RootStackParams = {
  Tabs: NavigatorScreenParams<TabParams>;
  Settings: undefined;
  NewRecipe: undefined;
};
