import { Database } from "@nozbe/watermelondb";
import { RecipeModel } from "@/shared/models/db/RecipeModel";
import { IngredientModel } from "@/shared/models/db/IngredientModel";

type TestRecipeInput = {
  title: string;
  isFavorite?: boolean;
  cuisine?: string;
  dateAdded?: Date;
  lastMade?: Date | null;
  timesCooked?: number;
};

export const seedTestRecipe = async (
  database: Database,
  input: TestRecipeInput,
): Promise<RecipeModel> => {
  return database.write(async () => {
    return database.get<RecipeModel>("recipes").create((r) => {
      r.title = input.title;
      r.sourceType = "manual";
      r.isFavorite = input.isFavorite ?? false;
      r.cuisine = input.cuisine ?? "";
      r.dateAdded = input.dateAdded ?? new Date();
      r.lastModified = new Date();
      r.lastMade = input.lastMade ?? null;
      r.timesCooked = input.timesCooked ?? 0;
      r.userTags = [];
      r.notes = "";
      r.sourceURL = "";
      r.imageURL = null;
      r.summary = "";
      r.servings = null;
      r.prepTime = null;
      r.cookTime = null;
    });
  });
};
