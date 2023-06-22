import React, { useState, useEffect, useCallback } from "react";
import { loadAsync } from "expo-font";
import Navigator from "@config/navigator";
import {
  IBMPlexMono_400Regular,
  IBMPlexMono_700Bold,
} from "@expo-google-fonts/ibm-plex-mono";
import * as SplashScreen from "expo-splash-screen";
import { SettingsProvider } from "@contexts/settings/settingsContext";

SplashScreen.preventAutoHideAsync();
SplashScreen.hideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await loadAsync({
          IBMPlexMono_400Regular,
          IBMPlexMono_700Bold,
        } as any);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SettingsProvider>
      {/* <View onLayout={onLayoutRootView}> */}
      <Navigator />
    </SettingsProvider>
  );
}
