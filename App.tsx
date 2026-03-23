import './global.css';

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-text-primary text-lg">Recipe App</Text>
      <Text className="text-text-secondary mt-sm">Theme tokens working</Text>
      <StatusBar style="auto" />
    </View>
  );
}
