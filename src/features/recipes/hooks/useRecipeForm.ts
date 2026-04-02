import { useState, useMemo, useCallback } from "react";
import { useDatabase } from "@nozbe/watermelondb/react";
import {
  createRecipeService,
  RecipeInput,
} from "@/shared/services/createRecipeService";
import { RecipeModel } from "@/shared/models/db/RecipeModel";
import { IngredientModel } from "@/shared/models/db/IngredientModel";
import { StepModel } from "@/shared/models/db/StepModel";
import { NutritionInfoModel } from "@/shared/models/db/NutritionInfoModel";

export type FormFields = {
  title: string;
  cuisine: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  notes: string;
  tagInput: string;
};

type ExistingData = {
  recipe: RecipeModel;
  ingredients: IngredientModel[];
  steps: StepModel[];
  nutrition: NutritionInfoModel | null;
};

type NutritionFields = {
  calories: string;
  protein: string;
  carbohydrates: string;
  fat: string;
  fiber: string;
  sodium: string;
  sugar: string;
};

const emptyNutrition: NutritionFields = {
  calories: "",
  protein: "",
  carbohydrates: "",
  fat: "",
  fiber: "",
  sodium: "",
  sugar: "",
};

const emptyFields: FormFields = {
  title: "",
  cuisine: "",
  servings: "",
  prepTime: "",
  cookTime: "",
  notes: "",
  tagInput: "",
};

const buildRecipeInput = (
  fields: FormFields,
  ingredientFields: string[],
  instructionFields: string[],
  nutritionFields: NutritionFields,
): RecipeInput => {
  const parseNumber = (value: string): number | null => {
    const n = parseInt(value, 10);
    return isNaN(n) ? null : n;
  };

  const tags = fields.tagInput
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const ingredients = ingredientFields
    .filter((f) => f.trim() !== "")
    .map((f, i) => ({
      quantity: "",
      unit: "",
      item: f.trim(),
      preparation: "",
      section: "",
      order: i,
    }));

  const instructions = instructionFields
    .filter((f) => f.trim() !== "")
    .map((f, i) => ({
      order: i,
      instruction: f.trim(),
    }));

  const hasNutrition = Object.values(nutritionFields).some(
    (v) => v.trim() !== "",
  );
  const nutrition = hasNutrition
    ? {
        calories: parseNumber(nutritionFields.calories),
        protein: parseNumber(nutritionFields.protein),
        carbohydrates: parseNumber(nutritionFields.carbohydrates),
        fat: parseNumber(nutritionFields.fat),
        fiber: parseNumber(nutritionFields.fiber),
        sodium: parseNumber(nutritionFields.sodium),
        sugar: parseNumber(nutritionFields.sugar),
      }
    : null;

  return {
    title: fields.title.trim(),
    sourceType: "manual",
    cuisine: fields.cuisine.trim(),
    servings: parseNumber(fields.servings),
    prepTime: parseNumber(fields.prepTime),
    cookTime: parseNumber(fields.cookTime),
    notes: fields.notes.trim(),
    userTags: tags,
    ingredients,
    instructions,
    nutrition,
  };
};

export const useRecipeForm = (existing?: ExistingData) => {
  const database = useDatabase();
  const service = useMemo(() => createRecipeService(database), [database]);

  const [fields, setFields] = useState<FormFields>(() => {
    if (!existing) return emptyFields;
    const { recipe } = existing;
    return {
      title: recipe.title,
      cuisine: recipe.cuisine,
      servings: recipe.servings?.toString() ?? "",
      prepTime: recipe.prepTime?.toString() ?? "",
      cookTime: recipe.cookTime?.toString() ?? "",
      notes: recipe.notes,
      tagInput: recipe.userTags.join(", "),
    };
  });

  const [ingredientFields, setIngredientFields] = useState<string[]>(() => {
    if (!existing?.ingredients.length) return [""];
    return existing.ingredients.map((i) =>
      [i.quantity, i.unit, i.item, i.preparation].filter(Boolean).join(" "),
    );
  });

  const [instructionFields, setInstructionFields] = useState<string[]>(() => {
    if (!existing?.steps.length) return [""];
    return existing.steps.map((s) => s.instruction);
  });

  const [nutritionFields, setNutritionFields] = useState<NutritionFields>(
    () => {
      if (!existing?.nutrition) return emptyNutrition;
      const n = existing.nutrition;
      return {
        calories: n.calories?.toString() ?? "",
        protein: n.protein?.toString() ?? "",
        carbohydrates: n.carbohydrates?.toString() ?? "",
        fat: n.fat?.toString() ?? "",
        fiber: n.fiber?.toString() ?? "",
        sodium: n.sodium?.toString() ?? "",
        sugar: n.sugar?.toString() ?? "",
      };
    },
  );

  const setNutritionField = useCallback(
    (key: keyof NutritionFields, value: string) => {
      setNutritionFields((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setField = useCallback((key: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateIngredient = useCallback((index: number, value: string) => {
    setIngredientFields((prev) =>
      prev.map((v, i) => (i === index ? value : v)),
    );
  }, []);

  const addIngredient = useCallback(() => {
    setIngredientFields((prev) => [...prev, ""]);
  }, []);

  const removeIngredient = useCallback((index: number) => {
    setIngredientFields((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, i) => i !== index),
    );
  }, []);

  const updateInstruction = useCallback((index: number, value: string) => {
    setInstructionFields((prev) =>
      prev.map((v, i) => (i === index ? value : v)),
    );
  }, []);

  const addInstruction = useCallback(() => {
    setInstructionFields((prev) => [...prev, ""]);
  }, []);

  const removeInstruction = useCallback((index: number) => {
    setInstructionFields((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, i) => i !== index),
    );
  }, []);

  const canSave = fields.title.trim().length > 0;

  const hasChanges = useMemo(() => {
    if (!existing) {
      return (
        Object.values(fields).some((v) => v.trim() !== "") ||
        ingredientFields.some((v) => v.trim() !== "") ||
        instructionFields.some((v) => v.trim() !== "")
      );
    }
    // Edit mode: compare against original
    const { recipe } = existing;
    return (
      fields.title !== recipe.title ||
      fields.cuisine !== recipe.cuisine ||
      fields.servings !== (recipe.servings?.toString() ?? "") ||
      fields.prepTime !== (recipe.prepTime?.toString() ?? "") ||
      fields.cookTime !== (recipe.cookTime?.toString() ?? "") ||
      fields.notes !== recipe.notes ||
      fields.tagInput !== recipe.userTags.join(", ")
    );
  }, [fields, ingredientFields, instructionFields, existing]);

  const save = useCallback(async () => {
    if (!canSave) return;
    await service.create(
      buildRecipeInput(
        fields,
        ingredientFields,
        instructionFields,
        nutritionFields,
      ),
    );
  }, [canSave, fields, ingredientFields, instructionFields, service]);

  return {
    fields,
    setField,
    ingredientFields,
    addIngredient,
    removeIngredient,
    updateIngredient,
    instructionFields,
    addInstruction,
    removeInstruction,
    updateInstruction,
    nutritionFields,
    setNutritionField,
    canSave,
    hasChanges,
    save,
  };
};
