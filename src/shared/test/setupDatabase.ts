import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import { schema } from "@/shared/models/schema";
import { RecipeModel } from "@/shared/models/db/RecipeModel";
import { IngredientModel } from "@/shared/models/db/IngredientModel";
import { StepModel } from "@/shared/models/db/StepModel";
import { NutritionInfoModel } from "@/shared/models/db/NutritionInfoModel";
import { MealPlanEntryModel } from "@/shared/models/db/MealPlanEntryModel";
import { ShoppingListModel } from "@/shared/models/db/ShoppingListModel";
import { ShoppingListItemModel } from "@/shared/models/db/ShoppingListItemModel";

export const createTestDatabase = (): Database => {
  const adapter = new LokiJSAdapter({
    schema,
    useWebWorker: false,
    useIncrementalIndexedDB: true,
  });

  return new Database({
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
};
