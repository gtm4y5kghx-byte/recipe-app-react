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

  let domain = sourceURL;
  try {
    domain = new URL(sourceURL).hostname.replace("www.", "");
  } catch {}

  return (
    <DSSection>
      <View className="flex-row items-center gap-xs">
        <DSLabel text="Source:" style="subheadline" color="primary" />
        <DSLabel text={domain} style="subheadline" color="brand" />
      </View>
    </DSSection>
  );
};
