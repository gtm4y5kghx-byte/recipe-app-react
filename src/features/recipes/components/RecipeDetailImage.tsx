import { DSImage } from "@/shared/components/atoms/DSImage";
import { DSImagePlaceholder } from "@/shared/components/atoms/DSImagePlaceholder";

type RecipeDetailImageProps = {
  imageURL?: string | null;
};

export const RecipeDetailImage = ({ imageURL }: RecipeDetailImageProps) => {
  if (imageURL) {
    return <DSImage url={imageURL} height={300} cornerRadius="md" />;
  }
  return <DSImagePlaceholder height={300} />;
};
