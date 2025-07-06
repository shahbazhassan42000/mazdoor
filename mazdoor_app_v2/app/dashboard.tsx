// Native Imports
import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
// 3rd Party Imports
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Card,
  Text,
  Appbar,
  Button,
  Surface,
  ActivityIndicator,
} from "react-native-paper";
// Alias Imports
import Colors from "@/constants/Colors";
import { AuthAPI } from "@/store/api";
import { isAuthenticated } from "@/utils/authStorage";

const Dashboard: FC = () => {
  const { t } = useTranslation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  /**
   * Check if user is authenticated on component mount
   */
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
          router.replace("/login");
          return;
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        router.replace("/login");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <Surface style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text variant="bodyMedium" style={styles.loadingText}>
            {t("loading")}...
          </Text>
        </View>
      </Surface>
    );
  }

  /**
   * Handle logout navigation
   */
  const handleLogout = async (): Promise<void> => {
    try {
      const result = await AuthAPI.logoutUser();
      if (result.success) {
        router.replace("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Still navigate to home even if logout fails
      router.replace("/");
    }
  };

  /**
   * Render the dashboard content
   * @returns JSX element containing the dashboard content
   */
  const renderDashboardContent = () => (
    <View style={styles.contentContainer}>
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            {t("welcome_to_dashboard")}
          </Text>

          <Text variant="bodyMedium" style={styles.subtitle}>
            {t("dashboard_subtitle")}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            {t("quick_actions")}
          </Text>

          <View style={styles.actionButtonsContainer}>
            <Button
              mode="contained"
              style={styles.actionButton}
              buttonColor={Colors.primary}
              textColor={Colors.white}
              contentStyle={styles.buttonContent}
              onPress={() => router.push("/browseServices")}
            >
              {t("browse_services")}
            </Button>

            <Button
              mode="outlined"
              style={styles.actionButton}
              textColor={Colors.primary}
              contentStyle={styles.buttonContent}
              onPress={() => console.log("My Orders")}
            >
              {t("my_orders")}
            </Button>

            <Button
              mode="outlined"
              style={styles.actionButton}
              textColor={Colors.primary}
              contentStyle={styles.buttonContent}
              onPress={() => console.log("Profile")}
            >
              {t("profile")}
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            {t("recent_activity")}
          </Text>

          <Text variant="bodyMedium" style={styles.noActivityText}>
            {t("no_recent_activity")}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <Surface style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={t("dashboard")} />
        <Appbar.Action
          icon="logout"
          onPress={handleLogout}
          iconColor={Colors.primary}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderDashboardContent()}
      </ScrollView>
    </Surface>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.white,
    elevation: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textGray,
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  contentContainer: {
    gap: 20,
  },
  welcomeCard: {
    backgroundColor: Colors.white,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textGray,
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.white,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  actionButtonsContainer: {
    gap: 12,
  },
  actionButton: {
    minHeight: 48,
  },
  buttonContent: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  noActivityText: {
    fontSize: 14,
    color: Colors.textGray,
    textAlign: "center",
    fontStyle: "italic",
  },
});
