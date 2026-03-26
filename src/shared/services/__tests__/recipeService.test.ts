import { Database } from "@nozbe/watermelondb";
import { createTestDatabase } from "@/shared/test/setupDatabase";
import { createRecipeService } from "../createRecipeService";
import { RecipeModel } from "@/shared/models/db/RecipeModel";
import { IngredientModel } from "@/shared/models/db/IngredientModel";
import { StepModel } from "@/shared/models/db/StepModel";
import { NutritionInfoModel } from "@/shared/models/db/NutritionInfoModel";

let db: Database;
let service: ReturnType<typeof createRecipeService>;

beforeEach(() => {
  db = createTestDatabase();
  service = createRecipeService(db);
});

describe("recipeService", () => {
  describe("create", () => {
    it("creates a recipe with basic fields", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
        cuisine: "Mexican",
      });

      expect(recipe.title).toBe("Tacos");
      expect(recipe.sourceType).toBe("manual");
      expect(recipe.cuisine).toBe("Mexican");
      expect(recipe.timesCooked).toBe(0);
      expect(recipe.isFavorite).toBe(false);
    });

    it("creates ingredients linked to the recipe", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
        ingredients: [
          {
            quantity: "1",
            unit: "lb",
            item: "beef",
            preparation: "ground",
            section: "",
            order: 0,
          },
          {
            quantity: "8",
            unit: "",
            item: "tortillas",
            preparation: "",
            section: "",
            order: 1,
          },
        ],
      });

      const ingredients = await recipe.ingredients.fetch();
      const sorted = ingredients.sort((a, b) => a.order - b.order);
      expect(sorted).toHaveLength(2);
      expect(sorted[0].item).toBe("beef");
      expect(sorted[1].item).toBe("tortillas");
    });

    it("creates steps linked to the recipe", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
        instructions: [
          { order: 0, instruction: "Brown the beef." },
          { order: 1, instruction: "Warm the tortillas." },
        ],
      });

      const steps = await recipe.steps.fetch();
      const sorted = steps.sort((a, b) => a.order - b.order);
      expect(sorted).toHaveLength(2);
      expect(sorted[0].instruction).toBe("Brown the beef.");
    });

    it("creates nutrition linked to the recipe", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
        nutrition: {
          calories: 350,
          protein: 25,
          fat: 15,
        },
      });

      const nutrition = await recipe.nutrition.fetch();
      expect(nutrition).toHaveLength(1);
      expect(nutrition[0].calories).toBe(350);
      expect(nutrition[0].protein).toBe(25);
      expect(nutrition[0].fat).toBe(15);
    });

    it("handles missing optional fields with defaults", async () => {
      const recipe = await service.create({
        title: "Minimal",
        sourceType: "manual",
      });

      expect(recipe.servings).toBeNull();
      expect(recipe.prepTime).toBeNull();
      expect(recipe.cookTime).toBeNull();
      expect(recipe.cuisine).toBe("");
      expect(recipe.notes).toBe("");
      expect(recipe.userTags).toEqual([]);
      expect(recipe.imageURL).toBeNull();
    });
  });

  describe("deleteRecipe", () => {
    it("deletes the recipe and its children", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
        ingredients: [
          {
            quantity: "1",
            unit: "lb",
            item: "beef",
            preparation: "",
            section: "",
            order: 0,
          },
        ],
        instructions: [{ order: 0, instruction: "Cook it." }],
        nutrition: { calories: 350 },
      });

      await service.deleteRecipe(recipe);

      const recipes = await db.get<RecipeModel>("recipes").query().fetch();
      const ingredients = await db
        .get<IngredientModel>("ingredients")
        .query()
        .fetch();
      const steps = await db.get<StepModel>("steps").query().fetch();
      const nutrition = await db
        .get<NutritionInfoModel>("nutrition_info")
        .query()
        .fetch();

      expect(recipes).toHaveLength(0);
      expect(ingredients).toHaveLength(0);
      expect(steps).toHaveLength(0);
      expect(nutrition).toHaveLength(0);
    });
  });

  describe("toggleFavorite", () => {
    it("toggles favorite from false to true", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
      });

      expect(recipe.isFavorite).toBe(false);
      await service.toggleFavorite(recipe);
      expect(recipe.isFavorite).toBe(true);
    });

    it("toggles favorite from true to false", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
        isFavorite: true,
      });

      await service.toggleFavorite(recipe);
      expect(recipe.isFavorite).toBe(false);
    });
  });

  describe("markAsCooked", () => {
    it("increments timesCooked", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
      });

      expect(recipe.timesCooked).toBe(0);
      await service.markAsCooked(recipe);
      expect(recipe.timesCooked).toBe(1);
      await service.markAsCooked(recipe);
      expect(recipe.timesCooked).toBe(2);
    });

    it("sets lastMade date", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
      });

      expect(recipe.lastMade).toBeNull();
      await service.markAsCooked(recipe);
      expect(recipe.lastMade).toBeInstanceOf(Date);
    });
  });
});
