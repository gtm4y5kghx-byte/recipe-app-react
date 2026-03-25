import { Model, Relation } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { RecipeModel } from "./RecipeModel";

export class NutritionInfoModel extends Model {
  static table = "nutrition_info";

  static associations = {
    recipes: { type: "belongs_to" as const, key: "recipe_id" },
  };

  @field("calories") calories!: number | null;
  @field("carbohydrates") carbohydrates!: number | null;
  @field("protein") protein!: number | null;
  @field("fat") fat!: number | null;
  @field("fiber") fiber!: number | null;
  @field("sodium") sodium!: number | null;
  @field("sugar") sugar!: number | null;
  @relation("recipes", "recipe_id") recipe!: Relation<RecipeModel>;
}
