import { Model, Relation } from "@nozbe/watermelondb";
import { field, text, relation } from "@nozbe/watermelondb/decorators";
import { RecipeModel } from "./RecipeModel";

export class StepModel extends Model {
  static table = "steps";

  static associations = {
    recipes: { type: "belongs_to" as const, key: "recipe_id" },
  };

  @field("order") order!: number;
  @text("instruction") instruction!: string;
  @field("timer_duration") timerDuration!: number | null;
  @relation("recipes", "recipe_id") recipe!: Relation<RecipeModel>;
}
