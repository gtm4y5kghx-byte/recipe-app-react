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

export enum MenuSection {
  All = "all",
  RecentlyAdded = "recently_added",
  RecentlyCooked = "recently_cooked",
  Favorites = "favorites",
  Uncategorized = "uncategorized",
}

export enum SearchScope {
  All = "all",
  Title = "title",
  Cuisine = "cuisine",
  Ingredients = "ingredients",
  Instructions = "instructions",
  Notes = "notes",
}
