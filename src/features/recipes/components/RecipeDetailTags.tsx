import { View } from "react-native";
import { DSTag } from "@/shared/components/atoms/DSTag";
import { DSSection } from "@/shared/components/molecules/DSSection";

type RecipeDetailTagsProps = {
  tags: string[];
};

export const RecipeDetailTags = ({ tags }: RecipeDetailTagsProps) => {
  if (tags.length === 0) return null;

  return (
    <DSSection>
      <View className="flex-row flex-wrap gap-sm">
        {tags.map((tag) => (
          <DSTag key={tag} text={tag} style="secondary" size="medium" />
        ))}
      </View>
    </DSSection>
  );
};
