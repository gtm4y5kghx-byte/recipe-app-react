import { View } from "react-native";
import { DSFormField } from "@/shared/components/molecules/DSFormField";
import { FormFields } from "../../hooks/useRecipeForm";

type RecipeFormBasicInfoProps = {
  fields: {
    title: string;
    cuisine: string;
    servings: string;
    prepTime: string;
    cookTime: string;
  };
  setField: (key: keyof FormFields, value: string) => void;
};

export const RecipeFormBasicInfo = ({
  fields,
  setField,
}: RecipeFormBasicInfoProps) => {
  return (
    <View className="gap-md">
      <DSFormField
        label="Title"
        placeholder="Recipe name"
        value={fields.title}
        onChangeText={(v) => setField("title", v)}
        isRequired
      />
      <DSFormField
        label="Cuisine"
        placeholder="e.g. Italian, Mexican"
        value={fields.cuisine}
        onChangeText={(v) => setField("cuisine", v)}
      />
      <View className="flex-row gap-md">
        <View className="flex-1">
          <DSFormField
            label="Servings"
            placeholder="0"
            value={fields.servings}
            onChangeText={(v) => setField("servings", v)}
            keyboardType="numeric"
          />
        </View>
        <View className="flex-1">
          <DSFormField
            label="Prep Time"
            placeholder="min"
            value={fields.prepTime}
            onChangeText={(v) => setField("prepTime", v)}
            keyboardType="numeric"
          />
        </View>
        <View className="flex-1">
          <DSFormField
            label="Cook Time"
            placeholder="min"
            value={fields.cookTime}
            onChangeText={(v) => setField("cookTime", v)}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};
