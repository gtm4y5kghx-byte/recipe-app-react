import { colors } from "@/theme/colors";

type ThemeColors = typeof colors.light | typeof colors.dark;

export const resolveColor = (
  themeColors: ThemeColors,
  colorKey: string,
): string => {
  const parts = colorKey.split(".");
  let value: unknown = themeColors;
  for (const part of parts) {
    value = (value as Record<string, unknown>)[part];
  }
  return value as string;
};
