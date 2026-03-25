import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DatabaseProvider } from "@nozbe/watermelondb/react";
import { StatusBar } from "expo-status-bar";
import { RootNavigator } from "@/navigation/RootNavigator";
import { database } from "@/shared/models/db/database";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <DatabaseProvider database={database}>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
}
