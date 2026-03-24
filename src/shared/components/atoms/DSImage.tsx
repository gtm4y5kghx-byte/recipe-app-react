import { useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { DSImagePlaceholder } from "@/shared/components/atoms/DSImagePlaceholder";
import { CornerRadius, radiusStyles } from "@/shared/components/atoms/types";

type DSImageProps = {
  url?: string | null;
  height?: number;
  aspectRatio?: "cover" | "contain";
  cornerRadius?: CornerRadius;
};

type ImageState = "loading" | "success" | "error";

export const DSImage = ({
  url,
  height = 200,
  aspectRatio = "cover",
  cornerRadius = "md",
}: DSImageProps) => {
  const [state, setState] = useState<ImageState>(url ? "loading" : "error");

  if (!url) {
    return <DSImagePlaceholder height={height} cornerRadius={cornerRadius} />;
  }

  return (
    <View
      style={{ height }}
      className={`w-full overflow-hidden ${radiusStyles[cornerRadius]}`}
    >
      {state === "loading" && (
        <View className="absolute inset-0 items-center justify-center bg-background-dark">
          <ActivityIndicator />
        </View>
      )}

      <Image
        source={{ uri: url }}
        style={{
          height,
          resizeMode: aspectRatio === "cover" ? "cover" : "contain",
        }}
        className="w-full"
        onLoad={() => setState("success")}
        onError={() => setState("error")}
      />

      {state === "error" && (
        <View className="absolute inset-0">
          <DSImagePlaceholder height={height} cornerRadius={cornerRadius} />
        </View>
      )}
    </View>
  );
};
