import { Model, Relation } from "@nozbe/watermelondb";
import { field, text, date, relation } from "@nozbe/watermelondb/decorators";
import { RecipeModel } from "./RecipeModel";

export class MealPlanEntryModel extends Model {
  static table = "meal_plan_entries";

  static associations = {
    recipes: { type: "belongs_to" as const, key: "recipe_id" },
  };

  @date("date") date!: Date;
  @text("meal_type") mealType!: string;
  @relation("recipes", "recipe_id") recipe!: Relation<RecipeModel>;
  @date("date_added") dateAdded!: Date;
}
