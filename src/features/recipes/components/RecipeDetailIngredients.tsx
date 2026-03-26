import { View } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSDivider } from "@/shared/components/atoms/DSDivider";
import { DSSection } from "@/shared/components/molecules/DSSection";
import { IngredientModel } from "@/shared/models/db/IngredientModel";

type RecipeDetailIngredientsProps = {
  ingredients: IngredientModel[];
};

const formatIngredient = (ing: IngredientModel): string => {
  const parts = [ing.quantity, ing.unit, ing.item].filter(Boolean).join(" ");
  return ing.preparation ? `${parts}, ${ing.preparation}` : parts;
};

export const RecipeDetailIngredients = ({
  ingredients,
}: RecipeDetailIngredientsProps) => {
  if (ingredients.length === 0) return null;

  return (
    <DSSection title="Ingredients" titleColor="brand">
      {ingredients.map((ing, index) => (
        <View key={ing.id}>
          <DSLabel text={formatIngredient(ing)} style="body" color="primary" />
          {index < ingredients.length - 1 && (
            <DSDivider thickness="thin" color="subtle" spacing="compact" />
          )}
        </View>
      ))}
    </DSSection>
  );
};
