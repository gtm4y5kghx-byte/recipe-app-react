import { useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import {
  FieldState,
  fieldBorderStyles,
  fieldHelperTextColor,
  fieldIconColor,
} from "./types";
import { DSIconButton } from "./DSIconButton";

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
  secure?: boolean;
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
  secure,
}: DSTextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const themeColors = useThemeColors();

  const borders = fieldBorderStyles[state];
  const borderColor = isFocused ? borders.focused : borders.default;
  const borderWidth = isFocused ? "border-2" : "border";
  const iconState = fieldIconColor[state];
  const currentIconColor = isFocused ? iconState.focused : iconState.default;

  const isDisabled = state === "disabled";
  const resolvedIcon = icon ?? (secure ? "lock-closed-outline" : undefined);

  return (
    <View className="w-full">
      <View
        className={`flex-row items-center rounded-md px-md py-sm
          ${borderWidth} ${borderColor}
          ${isDisabled ? "bg-background-dark" : "bg-background-light"}`}
      >
        {resolvedIcon && (
          <View className="mr-sm">
            <DSIcon
              name={resolvedIcon}
              size="medium"
              color={currentIconColor as any}
            />
          </View>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={themeColors.text.tertiary}
          secureTextEntry={secure && !isVisible}
          keyboardType={keyboardType}
          autoCapitalize={secure ? "none" : autoCapitalize}
          editable={!isDisabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={accessibilityLabel ?? placeholder}
          className="flex-1 text-body text-content-primary"
        />
        {secure && (
          <DSIconButton
            icon={isVisible ? "eye-off-outline" : "eye-outline"}
            size="small"
            color="tertiary"
            accessibilityLabel={isVisible ? "Hide password" : "Show password"}
            onPress={() => setIsVisible(!isVisible)}
          />
        )}
      </View>
      {helperText && (
        <View className="mt-xs px-xs">
          <DSLabel
            text={helperText}
            style="caption1"
            color={fieldHelperTextColor[state]}
          />
        </View>
      )}
    </View>
  );
};
