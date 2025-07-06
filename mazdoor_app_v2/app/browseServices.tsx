// Native Imports
import React, { FC, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
// 3rd Party Imports
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import {
  TextInput,
  Button,
  Card,
  Text,
  Appbar,
  Surface,
  Chip,
  Avatar,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
// Alias Imports
import Colors from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { LaborActionCreator } from "@/store/reducers";

const BrowseServices: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(LaborActionCreator.fetchLabors());
  }, []);

  // Redux state
  const error = useAppSelector((state) => state.laborSlice.error);
  const labors = useAppSelector((state) => state.laborSlice.labors);
  const laborTypes = useAppSelector((state) => state.laborSlice.laborTypes);
  const isLoading = useAppSelector((state) => state.laborSlice.isLoading);

  /**
   * Handle back button press
   */
  const handleBackPress = (): void => {
    router.back();
  };

  /**
   * Handle retry action on error
   */

  const handleRetry = (): void => {
    dispatch(LaborActionCreator.fetchLabors());
  };

  return (
    <Surface style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBackPress} />
        <Appbar.Content title={t("browse_services_title")} />
      </Appbar.Header>

      {/* Loading State */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text variant="bodyMedium" style={styles.loadingText}>
            {t("loading_services")}
          </Text>
        </View>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={Colors.red} />
          <Text variant="titleMedium" style={styles.errorTitle}>
            {t("error_loading_services")}
          </Text>
          <Text variant="bodyMedium" style={styles.errorText}>
            {error}
          </Text>
          <Button
            mode="contained"
            onPress={handleRetry}
            style={styles.retryButton}
            buttonColor={Colors.primary}
            textColor={Colors.white}
          >
            {t("retry")}
          </Button>
        </View>
      )}

      {/* Main Content - only show when not loading and no error */}
      {!isLoading && !error && (
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text variant="headlineSmall" style={styles.title}>
              {t("browse_services_title")}
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {t("find_perfect_labor")}
            </Text>

            {/* Search Bar */}
          </View>

          {/* Filters and Content */}
        </View>
      )}
    </Surface>
  );
};

export default BrowseServices;

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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  errorText: {
    fontSize: 14,
    color: Colors.textGray,
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
  },
  headerSection: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textGray,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  scrollContent: {
    flex: 1,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryGridContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryGridItem: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  categoryGridItemSelected: {
    borderColor: Colors.primary,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryGridTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  categoryGridDescription: {
    fontSize: 12,
    color: Colors.textGray,
    marginBottom: 4,
  },
  categoryGridCount: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: "500",
  },
  sortContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  chipScrollContainer: {
    paddingRight: 16,
  },
  categoryChip: {
    marginRight: 8,
    backgroundColor: Colors.background,
  },
  categoryChipSelected: {
    backgroundColor: Colors.primary,
  },
  sortChip: {
    marginRight: 8,
    backgroundColor: Colors.background,
  },
  sortChipSelected: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: 12,
    color: Colors.text,
  },
  chipTextSelected: {
    color: Colors.white,
  },
  resultsSection: {
    padding: 16,
  },
  laborersListContainer: {
    paddingTop: 8,
  },
  laborerCard: {
    marginBottom: 16,
    backgroundColor: Colors.white,
    elevation: 2,
  },
  laborerHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  laborerAvatar: {
    marginRight: 12,
  },
  laborerInfo: {
    flex: 1,
  },
  laborerName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 2,
  },
  laborerCategory: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 2,
  },
  laborerArea: {
    fontSize: 12,
    color: Colors.textGray,
  },
  laborerRating: {
    alignItems: "flex-end",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginLeft: 4,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: Colors.yellow,
  },
  unavailableBadge: {
    backgroundColor: Colors.red,
  },
  availabilityText: {
    fontSize: 10,
    fontWeight: "600",
  },
  availableText: {
    color: Colors.white,
  },
  unavailableText: {
    color: Colors.white,
  },
  divider: {
    marginVertical: 12,
  },
  laborerDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  experienceText: {
    fontSize: 12,
    color: Colors.textGray,
  },
  hourlyRate: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  skillChip: {
    marginRight: 6,
    marginBottom: 4,
    backgroundColor: Colors.peachLight,
  },
  skillText: {
    fontSize: 10,
    color: Colors.text,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minHeight: 40,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textGray,
    textAlign: "center",
  },
});
