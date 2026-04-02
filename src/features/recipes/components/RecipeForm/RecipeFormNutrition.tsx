import { View } from "react-native";
import { DSFormField } from "@/shared/components/molecules/DSFormField";
import { DSSection } from "@/shared/components/molecules/DSSection";

type NutritionFields = {
  calories: string;
  protein: string;
  carbohydrates: string;
  fat: string;
  fiber: string;
  sodium: string;
  sugar: string;
};

type RecipeFormNutritionProps = {
  fields: NutritionFields;
  setField: (key: keyof NutritionFields, value: string) => void;
};

export const RecipeFormNutrition = ({
  fields,
  setField,
}: RecipeFormNutritionProps) => {
  return (
    <DSSection title="Nutrition (per serving)" titleColor="brand">
      <View className="gap-md">
        <DSFormField
          label="Calories"
          placeholder="0"
          value={fields.calories}
          onChangeText={(v) => setField("calories", v)}
          keyboardType="numeric"
        />
        <View className="flex-row gap-md">
          <View className="flex-1">
            <DSFormField
              label="Protein (g)"
              placeholder="0"
              value={fields.protein}
              onChangeText={(v) => setField("protein", v)}
              keyboardType="numeric"
            />
          </View>
          <View className="flex-1">
            <DSFormField
              label="Carbs (g)"
              placeholder="0"
              value={fields.carbohydrates}
              onChangeText={(v) => setField("carbohydrates", v)}
              keyboardType="numeric"
            />
          </View>
          <View className="flex-1">
            <DSFormField
              label="Fat (g)"
              placeholder="0"
              value={fields.fat}
              onChangeText={(v) => setField("fat", v)}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View className="flex-row gap-md">
          <View className="flex-1">
            <DSFormField
              label="Fiber (g)"
              placeholder="0"
              value={fields.fiber}
              onChangeText={(v) => setField("fiber", v)}
              keyboardType="numeric"
            />
          </View>
          <View className="flex-1">
            <DSFormField
              label="Sodium (mg)"
              placeholder="0"
              value={fields.sodium}
              onChangeText={(v) => setField("sodium", v)}
              keyboardType="numeric"
            />
          </View>
          <View className="flex-1">
            <DSFormField
              label="Sugar (g)"
              placeholder="0"
              value={fields.sugar}
              onChangeText={(v) => setField("sugar", v)}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </DSSection>
  );
};
