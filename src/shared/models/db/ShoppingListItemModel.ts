import { Model, Relation } from "@nozbe/watermelondb";
import {
  field,
  text,
  date,
  json,
  relation,
} from "@nozbe/watermelondb/decorators";
import { ShoppingListModel } from "./ShoppingListModel";

const sanitizeStringArray = (raw: any) => (Array.isArray(raw) ? raw : []);

export class ShoppingListItemModel extends Model {
  static table = "shopping_list_items";

  static associations = {
    shopping_lists: { type: "belongs_to" as const, key: "shopping_list_id" },
  };

  @text("item") item!: string;
  @text("quantity") quantity!: string;
  @text("unit") unit!: string;
  @text("preparation") preparation!: string;
  @field("is_checked") isChecked!: boolean;
  @field("order") order!: number;
  @date("date_added") dateAdded!: Date;
  @json("source_recipe_ids", sanitizeStringArray) sourceRecipeIds!: string[];
  @relation("shopping_lists", "shopping_list_id")
  shoppingList!: Relation<ShoppingListModel>;
}
