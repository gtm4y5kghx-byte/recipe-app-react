import { View } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { SemanticColor } from "@/shared/components/atoms/types";

type DSSectionProps = {
  title?: string;
  titleColor?: SemanticColor;
  children: React.ReactNode;
};

export const DSSection = ({
  title,
  titleColor = "primary",
  children,
}: DSSectionProps) => {
  return (
    <View className="px-md py-sm">
      {title && (
        <View className="mb-sm">
          <DSLabel text={title} style="sectionHeader" color={titleColor} />
        </View>
      )}
      {children}
    </View>
  );
};
