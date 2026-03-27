import { renderHook, act } from "@testing-library/react-native";
import { createTestDatabase } from "@/shared/test/setupDatabase";
import { createWrapper } from "@/shared/test/TestWrapper";
import { createRecipeService } from "@/shared/services/createRecipeService";
import { Database } from "@nozbe/watermelondb";
import { useRecipeForm } from "../useRecipeForm";
import { RecipeModel } from "@/shared/models/db/RecipeModel";

let db: Database;
let service: ReturnType<typeof createRecipeService>;

beforeEach(() => {
  db = createTestDatabase();
  service = createRecipeService(db);
});

describe("useRecipeForm", () => {
  describe("create mode", () => {
    it("initializes with empty fields", () => {
      const { result } = renderHook(() => useRecipeForm(), {
        wrapper: createWrapper(db),
      });

      expect(result.current.fields.title).toBe("");
      expect(result.current.fields.cuisine).toBe("");
      expect(result.current.ingredientFields).toEqual([""]);
      expect(result.current.instructionFields).toEqual([""]);
    });

    it("saves a new recipe", async () => {
      const { result } = renderHook(() => useRecipeForm(), {
        wrapper: createWrapper(db),
      });

      act(() => {
        result.current.setField("title", "Tacos");
        result.current.setField("cuisine", "Mexican");
        result.current.setField("servings", "4");
      });

      await act(async () => {
        await result.current.save();
      });

      const recipes = await db.get("recipes").query().fetch();
      expect(recipes).toHaveLength(1);
      expect((recipes[0] as RecipeModel).title).toBe("Tacos");
    });

    it("does not save without a title", async () => {
      const { result } = renderHook(() => useRecipeForm(), {
        wrapper: createWrapper(db),
      });

      expect(result.current.canSave).toBe(false);
    });
  });

  describe("edit mode", () => {
    it("pre-populates fields from existing recipe", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
        cuisine: "Mexican",
        servings: 4,
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
        instructions: [{ order: 0, instruction: "Cook the beef." }],
      });

      const ingredients = await recipe.ingredients.fetch();
      const steps = await recipe.steps.fetch();

      const { result } = renderHook(
        () => useRecipeForm({ recipe, ingredients, steps, nutrition: null }),
        { wrapper: createWrapper(db) },
      );

      expect(result.current.fields.title).toBe("Tacos");
      expect(result.current.fields.cuisine).toBe("Mexican");
      expect(result.current.fields.servings).toBe("4");
      expect(result.current.ingredientFields).toHaveLength(1);
      expect(result.current.instructionFields).toHaveLength(1);
    });
  });

  describe("ingredient fields", () => {
    it("adds an ingredient field", () => {
      const { result } = renderHook(() => useRecipeForm(), {
        wrapper: createWrapper(db),
      });

      expect(result.current.ingredientFields).toHaveLength(1);

      act(() => {
        result.current.addIngredient();
      });

      expect(result.current.ingredientFields).toHaveLength(2);
    });

    it("removes an ingredient field", () => {
      const { result } = renderHook(() => useRecipeForm(), {
        wrapper: createWrapper(db),
      });

      act(() => {
        result.current.addIngredient();
        result.current.addIngredient();
      });

      expect(result.current.ingredientFields).toHaveLength(3);

      act(() => {
        result.current.removeIngredient(1);
      });

      expect(result.current.ingredientFields).toHaveLength(2);
    });

    it("keeps at least one ingredient field", () => {
      const { result } = renderHook(() => useRecipeForm(), {
        wrapper: createWrapper(db),
      });

      act(() => {
        result.current.removeIngredient(0);
      });

      expect(result.current.ingredientFields).toHaveLength(1);
    });
  });

  describe("instruction fields", () => {
    it("adds an instruction field", () => {
      const { result } = renderHook(() => useRecipeForm(), {
        wrapper: createWrapper(db),
      });

      act(() => {
        result.current.addInstruction();
      });

      expect(result.current.instructionFields).toHaveLength(2);
    });

    it("keeps at least one instruction field", () => {
      const { result } = renderHook(() => useRecipeForm(), {
        wrapper: createWrapper(db),
      });

      act(() => {
        result.current.removeInstruction(0);
      });

      expect(result.current.instructionFields).toHaveLength(1);
    });
  });

  describe("change tracking", () => {
    it("reports no changes on fresh form", () => {
      const { result } = renderHook(() => useRecipeForm(), {
        wrapper: createWrapper(db),
      });

      expect(result.current.hasChanges).toBe(false);
    });

    it("reports changes when a field is modified", () => {
      const { result } = renderHook(() => useRecipeForm(), {
        wrapper: createWrapper(db),
      });

      act(() => {
        result.current.setField("title", "Tacos");
      });

      expect(result.current.hasChanges).toBe(true);
    });
  });

  describe("save filters empty fields", () => {
    it("ignores empty ingredient and instruction fields", async () => {
      const { result } = renderHook(() => useRecipeForm(), {
        wrapper: createWrapper(db),
      });

      act(() => {
        result.current.setField("title", "Tacos");
        result.current.updateIngredient(0, "1 lb beef");
        result.current.addIngredient();
        result.current.updateInstruction(0, "Cook it.");
        result.current.addInstruction();
      });

      await act(async () => {
        await result.current.save();
      });

      const recipes = await db.get("recipes").query().fetch();
      const ingredients = await db.get("ingredients").query().fetch();
      const steps = await db.get("steps").query().fetch();

      expect(recipes).toHaveLength(1);
      expect(ingredients).toHaveLength(1);
      expect(steps).toHaveLength(1);
    });
  });
});
