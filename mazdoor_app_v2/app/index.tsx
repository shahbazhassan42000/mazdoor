// Native Imports
import React, { FC, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
// 3rd Party Imports
import { router } from "expo-router";
import { Text } from "react-native-paper";
// Alias Imports
import Colors from "@/constants/Colors";
import { isAuthenticated } from "@/utils/authStorage";
import {
  Home,
  Hero,
  AboutUs,
  Services,
  TeamCarousel,
  LaborCarousel,
  Footer,
} from "@/components/containers";

const Index: FC = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showHomeContent, setShowHomeContent] = useState(false);

  /**
   * Check authentication status and redirect accordingly
   */
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const authenticated = await isAuthenticated();

        if (authenticated) {
          // User is authenticated, redirect to dashboard
          router.replace("/dashboard");
        } else {
          // User is not authenticated, show home content
          setShowHomeContent(true);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        // On error, show home content as fallback
        setShowHomeContent(true);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthAndRedirect();
  }, []);

  /**
   * Render loading state while checking authentication
   */
  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text variant="bodyMedium" style={styles.loadingText}>
        Loading...
      </Text>
    </View>
  );

  /**
   * Render home content for unauthenticated users
   */
  const renderHomeContent = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Home />
      <Services />
      <LaborCarousel />
      <TeamCarousel />
      <AboutUs />
      <Hero />
      <Footer />
    </ScrollView>
  );

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return renderLoadingState();
  }

  // Show home content only for unauthenticated users
  if (showHomeContent) {
    return renderHomeContent();
  }

  // Return null if redirecting (should not be visible)
  return null;
};

export default Index;

const styles = StyleSheet.create({
  container: {
    textAlign: "left",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textGray,
    textAlign: "center",
  },
});
