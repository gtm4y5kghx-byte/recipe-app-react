import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { schema } from "../schema";
import { RecipeModel } from "./RecipeModel";
import { IngredientModel } from "./IngredientModel";
import { StepModel } from "./StepModel";
import { NutritionInfoModel } from "./NutritionInfoModel";
import { MealPlanEntryModel } from "./MealPlanEntryModel";
import { ShoppingListModel } from "./ShoppingListModel";
import { ShoppingListItemModel } from "./ShoppingListItemModel";

const adapter = new SQLiteAdapter({
  schema,
  jsi: true,
});

export const database = new Database({
  adapter,
  modelClasses: [
    RecipeModel,
    IngredientModel,
    StepModel,
    NutritionInfoModel,
    MealPlanEntryModel,
    ShoppingListModel,
    ShoppingListItemModel,
  ],
});
