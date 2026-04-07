import { View } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSSection } from "@/shared/components/molecules/DSSection";

type RecipeDetailSourcesProps = {
  sourceURL?: string;
};

export const RecipeDetailSources = ({
  sourceURL,
}: RecipeDetailSourcesProps) => {
  if (!sourceURL) return null;

  const getDomain = (url: string): string => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };


  return (
    <DSSection>
      <View className="flex-row items-center gap-xs">
        <DSLabel text="Source:" style="subheadline" color="primary" />
        <DSLabel text={getDomain(sourceURL)} style="subheadline" color="brand" />
      </View>
    </DSSection>
  );
};
