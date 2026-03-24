import { View } from "react-native";
import { DSImage } from "../../atoms/DSImage";
import { DSImagePlaceholder } from "../../atoms/DSImagePlaceholder";

type ThumbnailProps = {
  imageURL?: string | null;
};

export const Thumbnail = ({ imageURL }: ThumbnailProps) => {
  return (
    <View className="w-[80px] h-[80px] rounded-sm overflow-hidden">
      {imageURL ? (
        <DSImage url={imageURL} height={80} cornerRadius="sm" />
      ) : (
        <DSImagePlaceholder height={80} cornerRadius="sm" />
      )}
    </View>
  );
};
