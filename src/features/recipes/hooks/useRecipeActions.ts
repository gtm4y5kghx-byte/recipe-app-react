import { useMemo } from "react";
import { useDatabase } from "@nozbe/watermelondb/react";
import { createRecipeService } from "@/shared/services/createRecipeService";
import { RecipeModel } from "@/shared/models/db/RecipeModel";

export const useRecipeActions = () => {
  const database = useDatabase();
  const service = useMemo(() => createRecipeService(database), [database]);

  return {
    toggleFavorite: (recipe: RecipeModel) => service.toggleFavorite(recipe),
    markAsCooked: (recipe: RecipeModel) => service.markAsCooked(recipe),
    deleteRecipe: (recipe: RecipeModel) => service.deleteRecipe(recipe),
  };
};
