import { View } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSDivider } from "@/shared/components/atoms/DSDivider";
import { DSSection } from "@/shared/components/molecules/DSSection";
import { StepModel } from "@/shared/models/db/StepModel";

type RecipeDetailInstructionsProps = {
  steps: StepModel[];
};

export const RecipeDetailInstructions = ({
  steps,
}: RecipeDetailInstructionsProps) => {
  if (steps.length === 0) return null;

  return (
    <DSSection title="Instructions" titleColor="brand">
      {steps.map((step, index) => (
        <View key={step.id}>
          <DSLabel text={step.instruction} style="body" color="primary" />
          {index < steps.length - 1 && (
            <DSDivider thickness="thin" color="subtle" spacing="compact" />
          )}
        </View>
      ))}
    </DSSection>
  );
};
