import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Appearance, useColorScheme, Button } from 'react-native';
import { A, Nav } from '@expo/html-elements';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Inscription } from './inscription.js';
import { Connexion } from './connexion.js';

const Stack = createStackNavigator();

function HookComponent() {
  const insets = useSafeAreaInsets();

  return <View style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
    <Text>Bottom safe area padding: {insets.bottom}</Text>
  </View>;
}

function Header_Accueil() {
  return (
    <View style={[styles.container2, { height: 100, width:"100%", marginTop : "-40%" }]}>
      <Image source={require('./assets/icon2.png')} style={styles.logo} />
      <Text style={[styles.courseName, {textAlign:"center", width:"85%", fontSize:24}]}>Ambiant Systems</Text>
    </View>
  );
} 

export function HomeScreen() {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleButtonPress_connexion = () => {
    navigation.navigate('Connexion'); // Remplacez 'NomDeLaPage' par le nom de votre page de destination
  };

  const handleButtonPress_inscription = () => {
    navigation.navigate('Inscription'); // Remplacez 'NomDeLaPage' par le nom de votre page de destination
  };

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <Header_Accueil style={{marginTop:-50, paddingTOP:-250, width:200}}/>
        <Text style={[styles.title,{ fontFamily: 'Inter-Black', marginTop:"35%", marginBottom:"0%",fontSize: 30, backgroundColor: '#ffa000', width:300, textAlign : "center", paddingTop:"5%", paddingBottom:"5%"}]}>QR TAG Deluxe</Text>
        <View style={[styles.buttonDiv, { paddingBottom: Math.max(insets.bottom, 20), marginTop:"35%" }]}>
      <Button title="Me Connecter à mon compte" onPress={handleButtonPress_connexion} style={[styles.logo, {marginBottom:"15%", marginTop:"0",paddingLeft:"10%"}]} />
      <View style={{ height: Dimensions.get('window').height * 0.05 }} />
      <Button title="M'Inscrire sur QR TAG" onPress={handleButtonPress_inscription} style={[styles.logo, {marginBottom:"15%", paddingLeft:"10%"}]} />
    </View>  
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}

//Waiting for Font.loadAsync to complete before using fonts

const AccueilScreen = () => {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),});
  const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);
    SplashScreen.hideAsync();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Accueil" component={AccueilScreen} />
      <Stack.Screen name="Inscription" component={Inscription} />
      <Stack.Screen name="Connexion" component={Connexion} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  buttonDiv: { 
    marginTop:200,
  },

  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  courseName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
  },
});
