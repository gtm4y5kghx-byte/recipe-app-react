import { Database } from "@nozbe/watermelondb";
import { RecipeModel } from "@/shared/models/db/RecipeModel";
import { IngredientModel } from "@/shared/models/db/IngredientModel";
import { StepModel } from "@/shared/models/db/StepModel";
import { NutritionInfoModel } from "@/shared/models/db/NutritionInfoModel";
import { database as appDatabase } from "@/shared/models/db/database";

type RecipeInput = {
  title: string;
  sourceType: string;
  servings?: number | null;
  prepTime?: number | null;
  cookTime?: number | null;
  cuisine?: string;
  userTags?: string[];
  notes?: string;
  sourceURL?: string;
  imageURL?: string | null;
  isFavorite?: boolean;
  summary?: string;
  ingredients?: {
    quantity: string;
    unit: string;
    item: string;
    preparation: string;
    section: string;
    order: number;
  }[];
  instructions?: {
    order: number;
    instruction: string;
    timerDuration?: number | null;
  }[];
  nutrition?: {
    calories?: number | null;
    carbohydrates?: number | null;
    protein?: number | null;
    fat?: number | null;
    fiber?: number | null;
    sodium?: number | null;
    sugar?: number | null;
  } | null;
};

export const createRecipeService = (database: Database) => ({
  async create(input: RecipeInput): Promise<RecipeModel> {
    return database.write(async () => {
      const recipesCollection = database.get<RecipeModel>("recipes");
      const ingredientsCollection =
        database.get<IngredientModel>("ingredients");
      const stepsCollection = database.get<StepModel>("steps");
      const nutritionCollection =
        database.get<NutritionInfoModel>("nutrition_info");

      const recipe = await recipesCollection.create((r) => {
        r.title = input.title;
        r.sourceType = input.sourceType;
        r.servings = input.servings ?? null;
        r.prepTime = input.prepTime ?? null;
        r.cookTime = input.cookTime ?? null;
        r.cuisine = input.cuisine ?? "";
        r.timesCooked = 0;
        r.userTags = input.userTags ?? [];
        r.notes = input.notes ?? "";
        r.sourceURL = input.sourceURL ?? "";
        r.imageURL = input.imageURL ?? null;
        r.dateAdded = new Date();
        r.lastModified = new Date();
        r.lastMade = null;
        r.isFavorite = input.isFavorite ?? false;
        r.summary = input.summary ?? "";
      });

      if (input.ingredients) {
        for (const ing of input.ingredients) {
          await ingredientsCollection.create((i) => {
            i.recipe.set(recipe);
            i.quantity = ing.quantity;
            i.unit = ing.unit;
            i.item = ing.item;
            i.preparation = ing.preparation;
            i.section = ing.section;
            i.order = ing.order;
          });
        }
      }

      if (input.instructions) {
        for (const step of input.instructions) {
          await stepsCollection.create((s) => {
            s.recipe.set(recipe);
            s.order = step.order;
            s.instruction = step.instruction;
            s.timerDuration = step.timerDuration ?? null;
          });
        }
      }

      if (input.nutrition) {
        await nutritionCollection.create((n) => {
          n.recipe.set(recipe);
          n.calories = input.nutrition!.calories ?? null;
          n.carbohydrates = input.nutrition!.carbohydrates ?? null;
          n.protein = input.nutrition!.protein ?? null;
          n.fat = input.nutrition!.fat ?? null;
          n.fiber = input.nutrition!.fiber ?? null;
          n.sodium = input.nutrition!.sodium ?? null;
          n.sugar = input.nutrition!.sugar ?? null;
        });
      }

      return recipe;
    });
  },

  async deleteRecipe(recipe: RecipeModel): Promise<void> {
    await database.write(async () => {
      const ingredients = await recipe.ingredients.fetch();
      const steps = await recipe.steps.fetch();
      const nutrition = await recipe.nutrition.fetch();

      for (const i of ingredients) await i.destroyPermanently();
      for (const s of steps) await s.destroyPermanently();
      for (const n of nutrition) await n.destroyPermanently();

      await recipe.destroyPermanently();
    });
  },

  async toggleFavorite(recipe: RecipeModel): Promise<void> {
    await database.write(async () => {
      await recipe.update((r) => {
        r.isFavorite = !r.isFavorite;
      });
    });
  },

  async markAsCooked(recipe: RecipeModel): Promise<void> {
    await database.write(async () => {
      await recipe.update((r) => {
        r.timesCooked += 1;
        r.lastMade = new Date();
        r.lastModified = new Date();
      });
    });
  },
});

export const recipeService = createRecipeService(appDatabase);
