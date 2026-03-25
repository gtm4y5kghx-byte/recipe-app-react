import { SourceType } from "./enums";

export type Ingredient = {
  id: string;
  quantity: string;
  unit: string;
  item: string;
  preparation: string;
  section: string;
  order: number;
};

export type Step = {
  id: string;
  order: number;
  instruction: string;
  timerDuration: number | null;
};

export type NutritionInfo = {
  id: string;
  calories: number | null;
  carbohydrates: number | null;
  protein: number | null;
  fat: number | null;
  fiber: number | null;
  sodium: number | null;
  sugar: number | null;
};

export type Recipe = {
  id: string;
  title: string;
  sourceType: SourceType;
  servings: number | null;
  prepTime: number | null;
  cookTime: number | null;
  cuisine: string;
  timesCooked: number;
  userTags: string[];
  notes: string;
  sourceURL: string;
  imageURL: string | null;
  dateAdded: Date;
  lastModified: Date;
  lastMade: Date | null;
  isFavorite: boolean;
  summary: string;
  ingredients: Ingredient[];
  instructions: Step[];
  nutrition: NutritionInfo | null;
};
