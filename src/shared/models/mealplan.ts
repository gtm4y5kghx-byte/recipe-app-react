import { MealType } from "./enums";

export type MealPlanEntry = {
  id: string;
  date: Date;
  mealType: MealType;
  recipeId: string;
  dateAdded: Date;
};
