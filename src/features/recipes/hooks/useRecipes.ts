import { useState, useEffect, useMemo } from "react";
import { useDatabase } from "@nozbe/watermelondb/react";
import { RecipeModel } from "@/shared/models/db/RecipeModel";
import { MenuOption, MenuSection } from "@/shared/models";

export const useRecipes = () => {
  const database = useDatabase();
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [section, setSection] = useState<MenuSection>("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const collection = database.get<RecipeModel>("recipes");
    const query = collection.query();
    const subscription = query.observe().subscribe((results) => {
      setRecipes(results);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    if (section === "favorites") {
      filtered = filtered.filter((r) => r.isFavorite);
    } else if (section === "recently_added") {
      filtered = [...filtered].sort(
        (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime(),
      );
    } else if (section === "recently_cooked") {
      filtered = filtered
        .filter((r) => r.lastMade !== null)
        .sort((a, b) => b.lastMade!.getTime() - a.lastMade!.getTime());
    }

    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter((r) => r.title.toLowerCase().includes(query));
    }

    return filtered;
  }, [recipes, section, debouncedQuery]);

  const filterOptions: MenuOption[] = useMemo(() => [
    { id: "all", title: "All", icon: "book-outline", count: recipes.length },
    { id: "recently_added", title: "Recently Added", icon: "time-outline" },
    {
      id: "recently_cooked",
      title: "Recently Cooked",
      icon: "flame-outline",
      count: recipes.filter((r) => r.lastMade !== null).length,
    },
    {
      id: "favorites",
      title: "Favorites",
      icon: "heart",
      count: recipes.filter((r) => r.isFavorite).length,
    },
    {
      id: "uncategorized",
      title: "Uncategorized",
      icon: "folder-open-outline",
      count: recipes.filter((r) => r.userTags.length === 0).length,
    },
  ], [recipes]);

  const tagOptions: MenuOption[] = useMemo(() => {
    const tagCounts = new Map<string, number>();
    for (const recipe of recipes) {
      for (const tag of recipe.userTags) {
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({
        id: `tag-${tag}`,
        title: tag,
        icon: "pricetag-outline",
        count,
      }));
  }, [recipes]);

  return {
    recipes: filteredRecipes,
    searchQuery,
    setSearchQuery,
    section,
    setSection,
  };
};
