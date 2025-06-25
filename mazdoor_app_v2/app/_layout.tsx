// Native Imports
import { useEffect } from "react";
// 3rd Party Imports
import "react-native-reanimated";
import { Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider } from "react-native-paper";
// Alias Imports
import "@/i18n/index";
import { store } from "@/store";
import Colors from "@/constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
};

export default RootLayout;

const RootLayoutNav = () => {
  const paperTheme = {
    colors: {
      primary: Colors.primary,
      secondary: Colors.secondary,
      background: Colors.white,
      surface: Colors.white,
      text: Colors.text,
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={paperTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </PaperProvider>
    </Provider>
  );
};
