import { renderHook, act } from "@testing-library/react-native";
import { createTestDatabase } from "@/shared/test/setupDatabase";
import { createWrapper } from "@/shared/test/TestWrapper";
import { createRecipeService } from "@/shared/services/createRecipeService";
import { Database } from "@nozbe/watermelondb";
import { useRecipeActions } from "../useRecipeActions";

let db: Database;
let service: ReturnType<typeof createRecipeService>;

beforeEach(() => {
  db = createTestDatabase();
  service = createRecipeService(db);
});

describe("useRecipeActions", () => {
  it("toggles favorite", async () => {
    const recipe = await service.create({
      title: "Tacos",
      sourceType: "manual",
    });

    expect(recipe.isFavorite).toBe(false);

    const { result } = renderHook(() => useRecipeActions(), {
      wrapper: createWrapper(db),
    });

    await act(async () => {
      await result.current.toggleFavorite(recipe);
    });

    expect(recipe.isFavorite).toBe(true);
  });

  it("marks as cooked", async () => {
    const recipe = await service.create({
      title: "Tacos",
      sourceType: "manual",
    });

    expect(recipe.timesCooked).toBe(0);

    const { result } = renderHook(() => useRecipeActions(), {
      wrapper: createWrapper(db),
    });

    await act(async () => {
      await result.current.markAsCooked(recipe);
    });

    expect(recipe.timesCooked).toBe(1);
    expect(recipe.lastMade).toBeInstanceOf(Date);
  });

  it("deletes recipe", async () => {
    const recipe = await service.create({
      title: "Tacos",
      sourceType: "manual",
    });

    const { result } = renderHook(() => useRecipeActions(), {
      wrapper: createWrapper(db),
    });

    await act(async () => {
      await result.current.deleteRecipe(recipe);
    });

    const remaining = await db.get("recipes").query().fetchCount();
    expect(remaining).toBe(0);
  });
});
