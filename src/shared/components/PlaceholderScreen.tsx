import { View } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";

type PlaceholderScreenProps = {
  name: string;
};

export const PlaceholderScreen = ({ name }: PlaceholderScreenProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <DSLabel text={name} style="title3" color="primary" alignment="center" />
    </View>
  );
};
