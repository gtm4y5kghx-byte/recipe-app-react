import { Model, Relation } from "@nozbe/watermelondb";
import { field, text, relation } from "@nozbe/watermelondb/decorators";
import { RecipeModel } from "./RecipeModel";

export class IngredientModel extends Model {
  static table = "ingredients";

  static associations = {
    recipes: { type: "belongs_to" as const, key: "recipe_id" },
  };

  @text("quantity") quantity!: string;
  @text("unit") unit!: string;
  @text("item") item!: string;
  @text("preparation") preparation!: string;
  @text("section") section!: string;
  @field("order") order!: number;
  @relation("recipes", "recipe_id") recipe!: Relation<RecipeModel>;
}
