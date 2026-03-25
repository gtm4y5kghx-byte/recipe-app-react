export type ShoppingListItem = {
  id: string;
  item: string;
  quantity: string;
  unit: string;
  preparation: string;
  isChecked: boolean;
  order: number;
  dateAdded: Date;
  sourceRecipeIds: string[];
};

export type ShoppingList = {
  id: string;
  dateCreated: Date;
  dateModified: Date;
  items: ShoppingListItem[];
};
