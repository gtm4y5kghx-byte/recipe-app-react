import { renderHook, act, waitFor } from "@testing-library/react-native";
import { createTestDatabase } from "@/shared/test/setupDatabase";
import { createWrapper } from "@/shared/test/TestWrapper";
import { createRecipeService } from "@/shared/services/createRecipeService";
import { Database } from "@nozbe/watermelondb";
import { useRecipeDetail } from "../useRecipeDetail";

let db: Database;
let service: ReturnType<typeof createRecipeService>;

beforeEach(() => {
  db = createTestDatabase();
  service = createRecipeService(db);
});

describe("useRecipeDetail", () => {
  describe("fetching", () => {
    it("returns the recipe by id", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
        cuisine: "Mexican",
      });

      const { result } = renderHook(() => useRecipeDetail(recipe.id), {
        wrapper: createWrapper(db),
      });

      await waitFor(() => {
        expect(result.current.recipe).not.toBeNull();
        expect(result.current.recipe?.title).toBe("Tacos");
      });
    });

    it("fetches ingredients sorted by order", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
        ingredients: [
          {
            quantity: "8",
            unit: "",
            item: "tortillas",
            preparation: "",
            section: "",
            order: 1,
          },
          {
            quantity: "1",
            unit: "lb",
            item: "beef",
            preparation: "ground",
            section: "",
            order: 0,
          },
        ],
      });

      const { result } = renderHook(() => useRecipeDetail(recipe.id), {
        wrapper: createWrapper(db),
      });

      await waitFor(() => {
        expect(result.current.ingredients).toHaveLength(2);
        expect(result.current.ingredients[0].item).toBe("beef");
        expect(result.current.ingredients[1].item).toBe("tortillas");
      });
    });

    it("fetches steps sorted by order", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
        instructions: [
          { order: 1, instruction: "Warm tortillas." },
          { order: 0, instruction: "Brown the beef." },
        ],
      });

      const { result } = renderHook(() => useRecipeDetail(recipe.id), {
        wrapper: createWrapper(db),
      });

      await waitFor(() => {
        expect(result.current.steps).toHaveLength(2);
        expect(result.current.steps[0].instruction).toBe("Brown the beef.");
      });
    });

    it("fetches nutrition", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
        nutrition: { calories: 350, protein: 25 },
      });

      const { result } = renderHook(() => useRecipeDetail(recipe.id), {
        wrapper: createWrapper(db),
      });

      await waitFor(() => {
        expect(result.current.nutrition).not.toBeNull();
        expect(result.current.nutrition?.calories).toBe(350);
      });
    });

    it("returns null nutrition when none exists", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
      });

      const { result } = renderHook(() => useRecipeDetail(recipe.id), {
        wrapper: createWrapper(db),
      });

      await waitFor(() => {
        expect(result.current.recipe).not.toBeNull();
        expect(result.current.nutrition).toBeNull();
      });
    });
  });

  describe("actions", () => {
    it("toggles favorite", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
      });

      const { result } = renderHook(() => useRecipeDetail(recipe.id), {
        wrapper: createWrapper(db),
      });

      await waitFor(() => {
        expect(result.current.recipe?.isFavorite).toBe(false);
      });

      await act(async () => {
        await result.current.toggleFavorite();
      });

      await waitFor(() => {
        expect(result.current.recipe?.isFavorite).toBe(true);
      });
    });

    it("marks as cooked", async () => {
      const recipe = await service.create({
        title: "Tacos",
        sourceType: "manual",
      });

      const { result } = renderHook(() => useRecipeDetail(recipe.id), {
        wrapper: createWrapper(db),
      });

      await waitFor(() => {
        expect(result.current.recipe?.timesCooked).toBe(0);
      });

      await act(async () => {
        await result.current.markAsCooked();
      });

      await waitFor(() => {
        expect(result.current.recipe?.timesCooked).toBe(1);
      });
    });
  });
});
