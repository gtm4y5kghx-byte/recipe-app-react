import { useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { useThemeColors } from "@/shared/hooks/useThemeColors";

type FieldState = "normal" | "error" | "success" | "disabled";

type DSTextFieldProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: string;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  state?: FieldState;
  helperText?: string;
  accessibilityLabel?: string;
};

const borderStyles: Record<FieldState, { default: string; focused: string }> = {
  normal: { default: "border-border", focused: "border-primary" },
  error: { default: "border-error", focused: "border-error" },
  success: { default: "border-success", focused: "border-success" },
  disabled: { default: "border-border", focused: "border-border" },
};

const helperTextColor: Record<
  FieldState,
  "secondary" | "error" | "success" | "tertiary"
> = {
  normal: "secondary",
  error: "error",
  success: "success",
  disabled: "tertiary",
};

const iconColor: Record<FieldState, { default: string; focused: string }> = {
  normal: { default: "secondary", focused: "brand" },
  error: { default: "error", focused: "error" },
  success: { default: "success", focused: "success" },
  disabled: { default: "tertiary", focused: "tertiary" },
};

export const DSTextField = ({
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType,
  autoCapitalize = "sentences",
  state = "normal",
  helperText,
  accessibilityLabel,
}: DSTextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const themeColors = useThemeColors();

  const borders = borderStyles[state];
  const borderColor = isFocused ? borders.focused : borders.default;
  const borderWidth = isFocused ? "border-2" : "border";
  const iconState = iconColor[state];
  const currentIconColor = isFocused ? iconState.focused : iconState.default;

  const isDisabled = state === "disabled";

  return (
    <View className="w-full">
      <View
        className={`flex-row items-center rounded-md px-md py-sm
          ${borderWidth} ${borderColor}
          ${isDisabled ? "bg-background-dark" : "bg-background-light"}`}
      >
        {icon && (
          <View className="mr-sm">
            <DSIcon name={icon} size="medium" color={currentIconColor as any} />
          </View>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={themeColors.text.tertiary}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!isDisabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={accessibilityLabel ?? placeholder}
          className="flex-1 text-body text-content-primary"
        />
      </View>
      {helperText && (
        <View className="mt-xs px-xs">
          <DSLabel
            text={helperText}
            style="caption1"
            color={helperTextColor[state]}
          />
        </View>
      )}
    </View>
  );
};
