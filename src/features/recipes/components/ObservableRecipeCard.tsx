import { withObservables } from "@nozbe/watermelondb/react";
import { RecipeModel } from "@/shared/models/db/RecipeModel";
import { DSRecipeCard } from "@/shared/components/molecules/RecipeCard";
import { useRecipeActions } from "../hooks/useRecipeActions";

type Props = {
  recipe: RecipeModel;
  onPress: (recipe: RecipeModel) => void;
};

const RecipeCard = ({ recipe, onPress }: Props) => {
  const { toggleFavorite } = useRecipeActions();

  return (
    <DSRecipeCard
      title={recipe.title}
      imageURL={recipe.imageURL}
      cuisine={recipe.cuisine}
      prepTime={recipe.prepTime ?? undefined}
      cookTime={recipe.cookTime ?? undefined}
      servings={recipe.servings ?? undefined}
      tags={recipe.userTags}
      action={{
        type: "favorite",
        isFavorite: recipe.isFavorite,
        onTap: () => toggleFavorite(recipe),
      }}
      onPress={() => onPress(recipe)}
    />
  );
};

const enhance = withObservables(
  ["recipe"],
  ({ recipe }: { recipe: RecipeModel }) => ({
    recipe,
  }),
);

export const ObservableRecipeCard = enhance(RecipeCard);
