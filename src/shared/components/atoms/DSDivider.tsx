import { View } from "react-native";

type DividerThickness = "thin" | "medium" | "thick";
type DividerColor = "subtle" | "standard" | "prominent";
type DividerSpacing = "none" | "compact" | "standard" | "loose";

type DSDividerProps = {
  thickness?: DividerThickness;
  color?: DividerColor;
  spacing?: DividerSpacing;
};

const thicknessStyles: Record<DividerThickness, string> = {
  thin: "h-[1px]",
  medium: "h-[2px]",
  thick: "h-[4px]",
};

const colorStyles: Record<DividerColor, string> = {
  subtle: "bg-border",
  standard: "bg-divider",
  prominent: "bg-content-tertiary/30",
};

const spacingStyles: Record<DividerSpacing, string> = {
  none: "",
  compact: "my-sm",
  standard: "my-md",
  loose: "my-lg",
};

export const DSDivider = ({
  thickness = "thin",
  color = "standard",
  spacing = "standard",
}: DSDividerProps) => {
  return (
    <View
      className={`w-full ${thicknessStyles[thickness]} ${colorStyles[color]} ${spacingStyles[spacing]}`}
    />
  );
};
