import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import { withObservables } from "@nozbe/watermelondb/react";
import { useDatabase } from "@nozbe/watermelondb/react";
import { RecipesStackParams } from "@/navigation/types";
import { RecipeModel } from "@/shared/models/db/RecipeModel";
import { IngredientModel } from "@/shared/models/db/IngredientModel";
import { StepModel } from "@/shared/models/db/StepModel";
import { NutritionInfoModel } from "@/shared/models/db/NutritionInfoModel";
import { DSLoadingSpinner } from "@/shared/components/molecules/DSLoadingSpinner";
import { useRecipeActions } from "../hooks/useRecipeActions";
import { RecipeDetailHeader } from "../components/RecipeDetailHeader";
import { RecipeDetailImage } from "../components/RecipeDetailImage";
import { RecipeDetailMetadata } from "../components/RecipeDetailMetaData";
import { RecipeDetailTags } from "../components/RecipeDetailTags";
import { RecipeDetailSources } from "../components/RecipeDetailSources";
import { RecipeDetailIngredients } from "../components/RecipeDetailIngredients";
import { RecipeDetailInstructions } from "../components/RecipeDetailInstructions";
import { RecipeDetailNotes } from "../components/RecipeDetailNotes";
import { RecipeDetailNutrition } from "../components/RecipeDetailNutrition";

type RecipeDetailProps = {
  recipe: RecipeModel;
  ingredients: IngredientModel[];
  steps: StepModel[];
  nutrition: NutritionInfoModel[];
};

const RecipeDetail = ({
  recipe,
  ingredients,
  steps,
  nutrition,
}: RecipeDetailProps) => {
  const { toggleFavorite } = useRecipeActions();
  const sortedIngredients = ingredients.sort((a, b) => a.order - b.order);
  const sortedSteps = steps.sort((a, b) => a.order - b.order);
  const nutritionInfo = nutrition.length > 0 ? nutrition[0] : null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        <RecipeDetailHeader
          title={recipe.title}
          isFavorite={recipe.isFavorite}
          onFavoriteTap={() => toggleFavorite(recipe)}
        />
        <RecipeDetailImage imageURL={recipe.imageURL} />
        <RecipeDetailMetadata
          totalTime={recipe.totalTime}
          servings={recipe.servings}
          cuisine={recipe.cuisine}
        />
        <RecipeDetailTags tags={recipe.userTags} />
        <RecipeDetailSources sourceURL={recipe.sourceURL} />
        <RecipeDetailIngredients ingredients={sortedIngredients} />
        <RecipeDetailInstructions steps={sortedSteps} />
        <RecipeDetailNotes notes={recipe.notes} />
        <RecipeDetailNutrition nutrition={nutritionInfo} />
      </ScrollView>
    </SafeAreaView>
  );
};

const enhance = withObservables(
  ["recipe"],
  ({ recipe }: { recipe: RecipeModel }) => ({
    recipe,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    nutrition: recipe.nutrition,
  }),
);

const EnhancedRecipeDetail = enhance(RecipeDetail);

type RouteProps = RouteProp<RecipesStackParams, "RecipeDetail">;

export const RecipeDetailScreen = () => {
  const { params } = useRoute<RouteProps>();
  const database = useDatabase();
  const [recipe, setRecipe] = useState<RecipeModel | null>(null);

  useEffect(() => {
    database.get<RecipeModel>("recipes").find(params.id).then(setRecipe);
  }, [database, params.id]);

  if (!recipe) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <DSLoadingSpinner message="Loading recipe..." />
      </SafeAreaView>
    );
  }

  return <EnhancedRecipeDetail recipe={recipe} />;
};
