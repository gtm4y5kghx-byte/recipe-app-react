import { useMemo, useState, useCallback } from "react";
import { useDatabase } from "@nozbe/watermelondb/react";
import { createRecipeService } from "@/shared/services/createRecipeService";
import { RecipeModel } from "@/shared/models/db/RecipeModel";
import { AppError, toAppError } from "@/shared/models/errors";

export const useRecipeActions = () => {
  const database = useDatabase();
  const service = useMemo(() => createRecipeService(database), [database]);
  const [error, setError] = useState<AppError | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const toggleFavorite = useCallback(
    async (recipe: RecipeModel) => {
      try {
        await service.toggleFavorite(recipe);
      } catch (e) {
        setError(toAppError(e));
      }
    },
    [service],
  );

  const markAsCooked = useCallback(
    async (recipe: RecipeModel) => {
      try {
        await service.markAsCooked(recipe);
      } catch (e) {
        setError(toAppError(e));
      }
    },
    [service],
  );

  const deleteRecipe = useCallback(
    async (recipe: RecipeModel) => {
      try {
        await service.deleteRecipe(recipe);
      } catch (e) {
        setError(toAppError(e));
      }
    },
    [service],
  );

  return {
    toggleFavorite,
    markAsCooked,
    deleteRecipe,
    error,
    clearError,
  };
};
