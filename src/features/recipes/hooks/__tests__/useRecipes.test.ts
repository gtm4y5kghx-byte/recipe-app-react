import { renderHook, act, waitFor } from "@testing-library/react-native";
import { createTestDatabase } from "@/shared/test/setupDatabase";
import { createWrapper } from "@/shared/test/TestWrapper";
import { seedTestRecipe } from "@/shared/test/seedTestData";
import { Database } from "@nozbe/watermelondb";
import { useRecipes } from "../useRecipes";

let db: Database;

beforeEach(async () => {
  db = createTestDatabase();
});

describe("useRecipes", () => {
  describe("fetching", () => {
    it("returns all recipes by default", async () => {
      await seedTestRecipe(db, { title: "Tacos" });
      await seedTestRecipe(db, { title: "Pasta" });

      const { result } = renderHook(() => useRecipes(), {
        wrapper: createWrapper(db),
      });

      await waitFor(() => {
        expect(result.current.recipes).toHaveLength(2);
      });
    });

    it("updates when a recipe is added", async () => {
      const { result } = renderHook(() => useRecipes(), {
        wrapper: createWrapper(db),
      });

      await waitFor(() => {
        expect(result.current.recipes).toHaveLength(0);
      });

      await seedTestRecipe(db, { title: "New Recipe" });

      await waitFor(() => {
        expect(result.current.recipes).toHaveLength(1);
      });
    });
  });

  describe("search", () => {
    it("filters recipes by title", async () => {
      await seedTestRecipe(db, { title: "Chicken Tacos" });
      await seedTestRecipe(db, { title: "Beef Pasta" });
      await seedTestRecipe(db, { title: "Chicken Stir Fry" });

      const { result } = renderHook(() => useRecipes(), {
        wrapper: createWrapper(db),
      });

      act(() => {
        result.current.setSearchQuery("chicken");
      });

      await waitFor(() => {
        expect(result.current.recipes).toHaveLength(2);
      });
    });

    it("clears results when search is emptied", async () => {
      await seedTestRecipe(db, { title: "Chicken Tacos" });
      await seedTestRecipe(db, { title: "Beef Pasta" });

      const { result } = renderHook(() => useRecipes(), {
        wrapper: createWrapper(db),
      });

      act(() => {
        result.current.setSearchQuery("chicken");
      });

      await waitFor(() => {
        expect(result.current.recipes).toHaveLength(1);
      });

      act(() => {
        result.current.setSearchQuery("");
      });

      await waitFor(() => {
        expect(result.current.recipes).toHaveLength(2);
      });
    });
  });

  describe("filtering", () => {
    it("filters to favorites only", async () => {
      await seedTestRecipe(db, { title: "Tacos", isFavorite: true });
      await seedTestRecipe(db, { title: "Pasta", isFavorite: false });
      await seedTestRecipe(db, { title: "Curry", isFavorite: true });

      const { result } = renderHook(() => useRecipes(), {
        wrapper: createWrapper(db),
      });

      act(() => {
        result.current.setSection("favorites");
      });

      await waitFor(() => {
        expect(result.current.recipes).toHaveLength(2);
      });
    });

    it("returns all when filter is reset", async () => {
      await seedTestRecipe(db, { title: "Tacos", isFavorite: true });
      await seedTestRecipe(db, { title: "Pasta", isFavorite: false });

      const { result } = renderHook(() => useRecipes(), {
        wrapper: createWrapper(db),
      });

      act(() => {
        result.current.setSection("favorites");
      });

      await waitFor(() => {
        expect(result.current.recipes).toHaveLength(1);
      });

      act(() => {
        result.current.setSection("all");
      });

      await waitFor(() => {
        expect(result.current.recipes).toHaveLength(2);
      });
    });
  });
});
