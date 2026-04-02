import { DSFormField } from "@/shared/components/molecules/DSFormField";
import { DSSection } from "@/shared/components/molecules/DSSection";

type RecipeFormTagsProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export const RecipeFormTags = ({
  value,
  onChangeText,
}: RecipeFormTagsProps) => {
  return (
    <DSSection title="Tags" titleColor="brand">
      <DSFormField
        label="Tags"
        placeholder="e.g. dinner, quick, healthy"
        value={value}
        onChangeText={onChangeText}
        helperText="Separate tags with commas"
      />
    </DSSection>
  );
};
