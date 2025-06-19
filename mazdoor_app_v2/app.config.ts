export default {
  expo: {
    name: "Mazdoor",
    slug: "mazdoor",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/mazdoor.png",
    scheme: "mazdoor",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/mazdoor.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.shahbaz.mazdoor",
      adaptiveIcon: {
        foregroundImage: "./assets/images/mazdoor.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/mazdoor.png",
    },
    plugins: ["expo-router", "expo-localization"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      BASE_URL: process.env.BASE_URL || "http://localhost:8080/api",
      NODE_ENV: process.env.NODE_ENV || "development",
      router: {},
      eas: {
        projectId: "c0cad60b-38a1-4876-bf57-1fa99f4dbda1",
      },
    },
  },
};
