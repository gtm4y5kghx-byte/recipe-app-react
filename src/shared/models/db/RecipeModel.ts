import { Model, Query } from "@nozbe/watermelondb";
import {
  field,
  text,
  date,
  children,
  json,
} from "@nozbe/watermelondb/decorators";
import { IngredientModel } from "./IngredientModel";
import { StepModel } from "./StepModel";
import { NutritionInfoModel } from "./NutritionalModel";
import { MealPlanEntryModel } from "./MealPlanEntryModel";

const sanitizeStringArray = (raw: any) => (Array.isArray(raw) ? raw : []);

export class RecipeModel extends Model {
  static table = "recipes";

  static associations = {
    ingredients: { type: "has_many" as const, foreignKey: "recipe_id" },
    steps: { type: "has_many" as const, foreignKey: "recipe_id" },
    nutrition_info: { type: "has_many" as const, foreignKey: "recipe_id" },
    meal_plan_entries: { type: "has_many" as const, foreignKey: "recipe_id" },
  };

  @text("title") title!: string;
  @text("source_type") sourceType!: string;
  @field("servings") servings!: number | null;
  @field("prep_time") prepTime!: number | null;
  @field("cook_time") cookTime!: number | null;
  @text("cuisine") cuisine!: string;
  @field("times_cooked") timesCooked!: number;
  @json("user_tags", sanitizeStringArray) userTags!: string[];
  @text("notes") notes!: string;
  @text("source_url") sourceURL!: string;
  @text("image_url") imageURL!: string | null;
  @date("date_added") dateAdded!: Date;
  @date("last_modified") lastModified!: Date;
  @date("last_made") lastMade!: Date | null;
  @field("is_favorite") isFavorite!: boolean;
  @text("summary") summary!: string;

  @children("ingredients") ingredients!: Query<IngredientModel>;
  @children("steps") steps!: Query<StepModel>;
  @children("nutrition_info") nutrition!: Query<NutritionInfoModel>;
  @children("meal_plan_entries") mealPlanEntries!: Query<MealPlanEntryModel>;

  get totalTime(): number | null {
    if (this.prepTime == null && this.cookTime == null) return null;
    return (this.prepTime ?? 0) + (this.cookTime ?? 0);
  }
}
