import { Text } from "react-native";
import { SemanticColor } from "@/shared/components/atoms/types";

type LabelStyle =
  | "largeTitle"
  | "title1"
  | "title2"
  | "title3"
  | "headline"
  | "body"
  | "callout"
  | "subheadline"
  | "footnote"
  | "caption1"
  | "caption2"
  | "recipeTitle"
  | "sectionHeader"
  | "ingredientText"
  | "instructionText"
  | "metadata"
  | "tag"
  | "buttonLabel";

type LabelColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "accent"
  | "brand"
  | "success"
  | "warning"
  | "error"
  | "white";

type LabelAlignment = "left" | "center" | "right";

type DSLabelProps = {
  text: string;
  style?: LabelStyle;
  color?: SemanticColor;
  alignment?: LabelAlignment;
};

const styleClasses: Record<LabelStyle, string> = {
  largeTitle: "text-largeTitle font-bold",
  title1: "text-title1 font-bold",
  title2: "text-title2 font-bold",
  title3: "text-title3 font-semibold",
  headline: "text-headline font-semibold",
  body: "text-body",
  callout: "text-callout",
  subheadline: "text-subheadline",
  footnote: "text-footnote",
  caption1: "text-caption1",
  caption2: "text-caption2",
  // Semantic aliases
  recipeTitle: "text-title1 font-bold",
  sectionHeader: "text-title3 font-semibold",
  ingredientText: "text-body",
  instructionText: "text-body",
  metadata: "text-caption1",
  tag: "text-caption1",
  buttonLabel: "text-headline font-semibold",
};

const colorClasses: Record<LabelColor, string> = {
  primary: "text-content-primary",
  secondary: "text-content-secondary",
  tertiary: "text-content-tertiary",
  accent: "text-accent",
  brand: "text-primary",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  white: "text-white",
};

const alignmentClasses: Record<LabelAlignment, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const DSLabel = ({
  text,
  style = "body",
  color = "primary",
  alignment = "left",
}: DSLabelProps) => {
  return (
    <Text
      className={`${styleClasses[style]} ${colorClasses[color]} ${alignmentClasses[alignment]}`}
    >
      {text}
    </Text>
  );
};
