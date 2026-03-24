import { View } from "react-native";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSTextField } from "@/shared/components/atoms/DSTextField";
import { FieldState } from "@/shared/components/atoms/types";
import { TextInputProps } from "react-native";

type DSFormFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: string;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  isRequired?: boolean;
  helperText?: string;
  errorText?: string;
  secure?: boolean;
};

export const DSFormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType,
  autoCapitalize,
  isRequired = false,
  helperText,
  errorText,
  secure = false,
}: DSFormFieldProps) => {
  const fieldState: FieldState = errorText ? "error" : "normal";
  const displayHelperText = errorText ?? helperText;

  return (
    <View className="w-full gap-xs">
      <View className="flex-row">
        <DSLabel text={label} style="subheadline" color="primary" />
        {isRequired && <DSLabel text=" *" style="subheadline" color="error" />}
      </View>
      <DSTextField
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        icon={icon}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        state={fieldState}
        helperText={displayHelperText}
        secure={secure}
      />
    </View>
  );
};
