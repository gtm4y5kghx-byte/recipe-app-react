import { createRecipeService } from "./createRecipeService";
import { database } from "@/shared/models/db/database";

export const recipeService = createRecipeService(database);
