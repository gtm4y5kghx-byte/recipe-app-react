import { View } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSDivider } from "@/shared/components/atoms/DSDivider";
import { DSSection } from "@/shared/components/molecules/DSSection";
import { NutritionInfoModel } from "@/shared/models/db/NutritionInfoModel";

type RecipeDetailNutritionProps = {
  nutrition: NutritionInfoModel | null;
};

type NutritionItem = {
  label: string;
  value: string;
};

const buildNutritionItems = (n: NutritionInfoModel): NutritionItem[] => {
  const items: NutritionItem[] = [];
  if (n.calories != null)
    items.push({ label: "Calories", value: `${n.calories}` });
  if (n.carbohydrates != null)
    items.push({ label: "Carbs", value: `${n.carbohydrates}g` });
  if (n.protein != null)
    items.push({ label: "Protein", value: `${n.protein}g` });
  if (n.fat != null) items.push({ label: "Fat", value: `${n.fat}g` });
  if (n.fiber != null) items.push({ label: "Fiber", value: `${n.fiber}g` });
  if (n.sodium != null) items.push({ label: "Sodium", value: `${n.sodium}mg` });
  if (n.sugar != null) items.push({ label: "Sugar", value: `${n.sugar}g` });
  return items;
};

export const RecipeDetailNutrition = ({
  nutrition,
}: RecipeDetailNutritionProps) => {
  if (!nutrition) return null;

  const items = buildNutritionItems(nutrition);
  if (items.length === 0) return null;

  return (
    <DSSection title="Nutrition" titleColor="brand">
      {items.map((item, index) => (
        <View key={item.label}>
          <View className="flex-row justify-between py-xs">
            <DSLabel text={item.label} style="body" color="secondary" />
            <DSLabel text={item.value} style="headline" color="primary" />
          </View>
          {index < items.length - 1 && (
            <DSDivider thickness="thin" color="subtle" spacing="none" />
          )}
        </View>
      ))}
    </DSSection>
  );
};
