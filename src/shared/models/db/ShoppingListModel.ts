import { Model, Query } from "@nozbe/watermelondb";
import { date, children } from "@nozbe/watermelondb/decorators";
import { ShoppingListItemModel } from "./ShoppingListItemModel";

export class ShoppingListModel extends Model {
  static table = "shopping_lists";

  static associations = {
    shopping_list_items: {
      type: "has_many" as const,
      foreignKey: "shopping_list_id",
    },
  };

  @date("date_created") dateCreated!: Date;
  @date("date_modified") dateModified!: Date;
  @children("shopping_list_items") items!: Query<ShoppingListItemModel>;
}
