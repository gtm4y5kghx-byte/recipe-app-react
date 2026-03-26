import { useState, useEffect, useCallback, useMemo } from "react";
import { useDatabase } from "@nozbe/watermelondb/react";
import { RecipeModel } from "@/shared/models/db/RecipeModel";
import { IngredientModel } from "@/shared/models/db/IngredientModel";
import { StepModel } from "@/shared/models/db/StepModel";
import { NutritionInfoModel } from "@/shared/models/db/NutritionInfoModel";
import { createRecipeService } from "@/shared/services/createRecipeService";

export const useRecipeDetail = (id: string) => {
  const database = useDatabase();
  const service = useMemo(() => createRecipeService(database), [database]);
  const [recipe, setRecipe] = useState<RecipeModel | null>(null);
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);
  const [steps, setSteps] = useState<StepModel[]>([]);
  const [nutrition, setNutrition] = useState<NutritionInfoModel | null>(null);

  useEffect(() => {
    const record = database.get<RecipeModel>("recipes");

    const subscription = record
      .findAndObserve(id)
      .subscribe((r) => setRecipe(r));

    return () => subscription.unsubscribe();
  }, [database, id]);

  useEffect(() => {
    if (!recipe) return;

    const ingredientsSub = recipe.ingredients
      .observe()
      .subscribe((results) => {
        setIngredients(results.sort((a, b) => a.order - b.order));
      });

    const stepsSub = recipe.steps.observe().subscribe((results) => {
      setSteps(results.sort((a, b) => a.order - b.order));
    });

    const nutritionSub = recipe.nutrition.observe().subscribe((results) => {
      setNutrition(results.length > 0 ? results[0] : null);
    });

    return () => {
      ingredientsSub.unsubscribe();
      stepsSub.unsubscribe();
      nutritionSub.unsubscribe();
    };
  }, [recipe]);

  const toggleFavorite = useCallback(async () => {
    if (recipe) await service.toggleFavorite(recipe);
  }, [recipe, service]);

  const markAsCooked = useCallback(async () => {
    if (recipe) await service.markAsCooked(recipe);
  }, [recipe, service]);

  const deleteRecipe = useCallback(async () => {
    if (recipe) await service.deleteRecipe(recipe);
  }, [recipe, service]);

  return {
    recipe,
    ingredients,
    steps,
    nutrition,
    toggleFavorite,
    markAsCooked,
    deleteRecipe,
  };
};
