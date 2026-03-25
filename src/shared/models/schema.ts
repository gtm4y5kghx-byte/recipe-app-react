import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "recipes",
      columns: [
        { name: "title", type: "string" },
        { name: "source_type", type: "string" },
        { name: "servings", type: "number", isOptional: true },
        { name: "prep_time", type: "number", isOptional: true },
        { name: "cook_time", type: "number", isOptional: true },
        { name: "cuisine", type: "string" },
        { name: "times_cooked", type: "number" },
        { name: "user_tags", type: "string" },
        { name: "notes", type: "string" },
        { name: "source_url", type: "string" },
        { name: "image_url", type: "string", isOptional: true },
        { name: "date_added", type: "number" },
        { name: "last_modified", type: "number" },
        { name: "last_made", type: "number", isOptional: true },
        { name: "is_favorite", type: "boolean" },
        { name: "summary", type: "string" },
      ],
    }),
    tableSchema({
      name: "ingredients",
      columns: [
        { name: "recipe_id", type: "string", isIndexed: true },
        { name: "quantity", type: "string" },
        { name: "unit", type: "string" },
        { name: "item", type: "string" },
        { name: "preparation", type: "string" },
        { name: "section", type: "string" },
        { name: "order", type: "number" },
      ],
    }),
    tableSchema({
      name: "steps",
      columns: [
        { name: "recipe_id", type: "string", isIndexed: true },
        { name: "order", type: "number" },
        { name: "instruction", type: "string" },
        { name: "timer_duration", type: "number", isOptional: true },
      ],
    }),
    tableSchema({
      name: "nutrition_info",
      columns: [
        { name: "recipe_id", type: "string", isIndexed: true },
        { name: "calories", type: "number", isOptional: true },
        { name: "carbohydrates", type: "number", isOptional: true },
        { name: "protein", type: "number", isOptional: true },
        { name: "fat", type: "number", isOptional: true },
        { name: "fiber", type: "number", isOptional: true },
        { name: "sodium", type: "number", isOptional: true },
        { name: "sugar", type: "number", isOptional: true },
      ],
    }),
    tableSchema({
      name: "meal_plan_entries",
      columns: [
        { name: "date", type: "number" }, // timestamp
        { name: "meal_type", type: "string" },
        { name: "recipe_id", type: "string", isIndexed: true },
        { name: "date_added", type: "number" },
      ],
    }),
    tableSchema({
      name: "shopping_lists",
      columns: [
        { name: "date_created", type: "number" },
        { name: "date_modified", type: "number" },
      ],
    }),
    tableSchema({
      name: "shopping_list_items",
      columns: [
        { name: "shopping_list_id", type: "string", isIndexed: true },
        { name: "item", type: "string" },
        { name: "quantity", type: "string" },
        { name: "unit", type: "string" },
        { name: "preparation", type: "string" },
        { name: "is_checked", type: "boolean" },
        { name: "order", type: "number" },
        { name: "date_added", type: "number" },
        { name: "source_recipe_ids", type: "string" },
      ],
    }),
  ],
});
