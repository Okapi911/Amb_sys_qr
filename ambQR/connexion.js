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
import {HomeScreen} from './App.js';
import {Auth} from './Auth.js';
import {Account} from './Account.js';
import {ConnexionPage} from './page_connexion.js'


export function Connexion() {
    return (
    <SafeAreaProvider>
      <ConnexionPage />
    </SafeAreaProvider>
    );
}