import { useState, useEffect, useMemo } from "react";
import { useDatabase } from "@nozbe/watermelondb/react";
import { RecipeModel } from "@/shared/models/db/RecipeModel";

export const useRecipes = () => {
  const database = useDatabase();
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [section, setSection] = useState<string>("all");

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

  return {
    recipes: filteredRecipes,
    searchQuery,
    setSearchQuery,
    section,
    setSection,
  };
};
