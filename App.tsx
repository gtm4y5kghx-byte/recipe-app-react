import "./global.css";

import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { RootNavigator } from "@/navigation/RootNavigator";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
