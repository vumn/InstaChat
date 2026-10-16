import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // TODO: replace with real auth state
  const isSignedIn = false;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Protected guard={!isSignedIn}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
          <Stack.Protected guard={isSignedIn}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="chat/[id]" options={{animation: "slide_from_right"}}/>
          </Stack.Protected>
        </Stack>
        <StatusBar style="dark"/>
    </GestureHandlerRootView>
  );
}
