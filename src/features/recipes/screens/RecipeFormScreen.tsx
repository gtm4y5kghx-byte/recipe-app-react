import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RecipesStackParams } from "@/navigation/types";
import { useRecipeForm } from "../hooks/useRecipeForm";
import { DSButton } from "@/shared/components/atoms/DSButton";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import {
  RecipeFormBasicInfo,
  RecipeFormIngredients,
  RecipeFormInstructions,
  RecipeFormTags,
  RecipeFormNotes,
  RecipeFormNutrition,
} from "../components/RecipeForm";
import { DSToast } from "@/shared/components/molecules/DSToast";

type RouteProps = RouteProp<RecipesStackParams, "RecipeForm">;

export const RecipeFormScreen = () => {
  const { params } = useRoute<RouteProps>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RecipesStackParams>>();
  const {
    fields,
    setField,
    ingredientFields,
    addIngredient,
    removeIngredient,
    updateIngredient,
    instructionFields,
    addInstruction,
    removeInstruction,
    updateInstruction,
    nutritionFields,
    setNutritionField,
    error,
    clearError,
    canSave,
    save,
  } = useRecipeForm();

  const handleSave = async () => {
    const success = await save();
    if (success) navigation.goBack()
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-md py-sm">
        <DSButton
          title="Cancel"
          style="tertiary"
          size="small"
          fullWidth={false}
          onPress={() => navigation.goBack()}
        />
        <DSLabel
          text={params.id ? "Edit Recipe" : "New Recipe"}
          style="headline"
          color="primary"
        />
        <DSButton
          title="Save"
          style="primary"
          size="small"
          fullWidth={false}
          disabled={!canSave}
          onPress={handleSave}
        />
      </View>

      <ScrollView className="flex-1">
        <RecipeFormBasicInfo fields={fields} setField={setField} />
        <RecipeFormIngredients
          fields={ingredientFields}
          onUpdate={updateIngredient}
          onAdd={addIngredient}
          onRemove={removeIngredient}
        />
        <RecipeFormInstructions
          fields={instructionFields}
          onUpdate={updateInstruction}
          onAdd={addInstruction}
          onRemove={removeInstruction}
        />
        <RecipeFormTags
          value={fields.tagInput}
          onChangeText={(v) => setField("tagInput", v)}
        />
        <RecipeFormNotes
          value={fields.notes}
          onChangeText={(v) => setField("notes", v)}
        />
        <RecipeFormNutrition
          fields={nutritionFields}
          setField={setNutritionField}
        />
      </ScrollView>
      <DSToast
        message={error?.message ?? ""}
        style="error"
        visible={error !== null}
        onDismiss={clearError}
      />
    </SafeAreaView>
  );
};
