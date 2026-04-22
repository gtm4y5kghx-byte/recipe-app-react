export enum SourceType {
  Manual = "manual",
  WebImported = "web_imported",
  AIGenerated = "ai_generated",
}

export enum MealType {
  Breakfast = "breakfast",
  Lunch = "lunch",
  Dinner = "dinner",
}

export type MenuSection =
  | "all"
  | "recently_added"
  | "recently_cooked"
  | "favorites"
  | "uncategorized"
  | { tag: string };

export type MenuOption = {
  id: string;
  title: string;
  icon: string;  // Ionicons name
  count?: number;
};

export enum SearchScope {
  All = "all",
  Title = "title",
  Cuisine = "cuisine",
  Ingredients = "ingredients",
  Instructions = "instructions",
  Notes = "notes",
}
