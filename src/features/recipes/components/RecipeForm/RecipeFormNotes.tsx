import { DSFormField } from "@/shared/components/molecules/DSFormField";
import { DSSection } from "@/shared/components/molecules/DSSection";

type RecipeFormNotesProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export const RecipeFormNotes = ({
  value,
  onChangeText,
}: RecipeFormNotesProps) => {
  return (
    <DSSection title="Notes" titleColor="brand">
      <DSFormField
        label="Notes"
        placeholder="Any tips or variations..."
        value={value}
        onChangeText={onChangeText}
      />
    </DSSection>
  );
};
