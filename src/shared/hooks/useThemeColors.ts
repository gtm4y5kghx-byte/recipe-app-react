import { useColorScheme } from "react-native";
import { colors } from "../../theme/colors";

export const useThemeColors = () => {
  const scheme = useColorScheme();
  return scheme === "dark" ? colors.dark : colors.light;
};
