import { View } from "react-native";
import { DSTextField } from "@/shared/components/atoms/DSTextField";
import { DSIconButton } from "@/shared/components/atoms/DSIconButton";
import { DSSection } from "@/shared/components/molecules/DSSection";

type RecipeFormIngredientsProps = {
  fields: string[];
  onUpdate: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

export const RecipeFormIngredients = ({
  fields,
  onUpdate,
  onAdd,
  onRemove,
}: RecipeFormIngredientsProps) => {
  return (
    <DSSection title="Ingredients" titleColor="brand">
      <View className="gap-sm">
        {fields.map((value, index) => (
          <View key={index} className="flex-row items-center gap-sm">
            <View className="flex-1">
              <DSTextField
                placeholder="Enter ingredient"
                value={value}
                onChangeText={(v) => onUpdate(index, v)}
              />
            </View>
            {fields.length > 1 && (
              <DSIconButton
                icon="remove-circle"
                size="medium"
                color="brand"
                accessibilityLabel="Remove ingredient"
                onPress={() => onRemove(index)}
              />
            )}
          </View>
        ))}
        <DSIconButton
          icon="add-circle"
          size="medium"
          color="brand"
          accessibilityLabel="Add ingredient"
          onPress={onAdd}
        />
      </View>
    </DSSection>
  );
};
