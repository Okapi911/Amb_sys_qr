import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function HookComponent() {
  const insets = useSafeAreaInsets();

  return <View style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
    <Text>Bottom safe area padding: {insets.bottom}</Text>
  </View>;
}

function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container}>
        <Text>My App</Text>
        <Text>Cool</Text>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}


export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
      <HookComponent />
    </SafeAreaProvider>
  );
}

/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
*/ 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
