import { colors } from "@/theme/colors";

type ThemeColors = typeof colors.light | typeof colors.dark;

export const resolveColor = (
  themeColors: ThemeColors,
  colorKey: string,
): string => {
  const parts = colorKey.split(".");
  let value: any = themeColors;
  for (const part of parts) {
    value = value[part];
  }
  return value as string;
};
