import { faker } from "@faker-js/faker";
import { createRecipeService } from "./createRecipeService";
import { SourceType } from "@/shared/models";
import { database } from "@/shared/models/db/database";

const recipeService = createRecipeService(database);

const generateRecipe = () => ({
  title: faker.food.dish(),
  sourceType: SourceType.Manual,
  servings: faker.number.int({ min: 1, max: 8 }),
  prepTime: faker.number.int({ min: 5, max: 30 }),
  cookTime: faker.datatype.boolean()
    ? faker.number.int({ min: 10, max: 60 })
    : null,
  cuisine: faker.food.ethnicCategory(),
  isFavorite: faker.datatype.boolean({ probability: 0.3 }),
  userTags: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
    faker.food.adjective(),
  ),
  summary: faker.food.description(),
  ingredients: Array.from(
    { length: faker.number.int({ min: 3, max: 8 }) },
    (_, i) => ({
      quantity: String(faker.number.int({ min: 1, max: 4 })),
      unit: faker.food.spice(),
      item: faker.food.ingredient(),
      preparation: faker.datatype.boolean() ? faker.food.adjective() : "",
      section: "",
      order: i,
    }),
  ),
  instructions: Array.from(
    { length: faker.number.int({ min: 3, max: 6 }) },
    (_, i) => ({
      order: i,
      instruction: faker.lorem.sentence(),
      timerDuration: faker.datatype.boolean({ probability: 0.3 })
        ? faker.number.int({ min: 60, max: 3600 })
        : null,
    }),
  ),
  nutrition: faker.datatype.boolean({ probability: 0.6 })
    ? {
        calories: faker.number.int({ min: 100, max: 800 }),
        protein: faker.number.int({ min: 2, max: 50 }),
        carbohydrates: faker.number.int({ min: 5, max: 80 }),
        fat: faker.number.int({ min: 2, max: 40 }),
        fiber: faker.number.int({ min: 0, max: 15 }),
        sodium: faker.number.int({ min: 50, max: 1200 }),
        sugar: faker.number.int({ min: 0, max: 40 }),
      }
    : null,
});

export const seedData = {
  async load(count: number = 6): Promise<void> {
    for (let i = 0; i < count; i++) {
      await recipeService.create(generateRecipe());
    }
  },

  async clear(): Promise<void> {
    await database.write(async () => {
      await database.unsafeResetDatabase();
    });
  },
};
