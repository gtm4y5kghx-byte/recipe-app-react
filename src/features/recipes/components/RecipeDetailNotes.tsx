import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSSection } from "@/shared/components/molecules/DSSection";

type RecipeDetailNotesProps = {
  notes?: string;
};

export const RecipeDetailNotes = ({ notes }: RecipeDetailNotesProps) => {
  if (!notes) return null;

  return (
    <DSSection title="Notes" titleColor="brand">
      <DSLabel text={notes} style="body" color="primary" />
    </DSSection>
  );
};
