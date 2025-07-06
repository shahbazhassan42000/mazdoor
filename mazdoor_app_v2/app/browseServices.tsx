// Native Imports
import React, { FC, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
// 3rd Party Imports
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import {
  Button,
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

// Constants
const CORE_VALUES = {
  cardPadding: 16,
  cardMargin: 10,
  borderRadius: 12,
  iconSize: 48,
  iconRadius: 24,
  iconImageSize: 24,
  sectionPadding: 16,
  headerPadding: 20,
};

const BrowseServices: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    dispatch(LaborActionCreator.fetchLabors());
  }, []);

  // Redux state
  const error = useAppSelector((state) => state.laborSlice.error);
  const labors = useAppSelector((state) => state.laborSlice.labors);
  const laborTypes = useAppSelector((state) => state.laborSlice.laborTypes);
  const isLoading = useAppSelector((state) => state.laborSlice.isLoading);

  // Filtered labors based on selected category
  const filteredLabors = selectedCategory
    ? labors.filter((labor) => labor.type === selectedCategory)
    : labors;

  /**
   * Handle back button press
   */
  const handleBackPress = (): void => {
    router.back();
  };

  /**
   * Handle pull to refresh
   */
  const handleRefresh = (): void => {
    setRefreshing(true);
    dispatch(LaborActionCreator.fetchLabors());
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  /**
   * Handle retry action on error
   */
  const handleRetry = (): void => {
    dispatch(LaborActionCreator.fetchLabors());
  };

  /**
   * Format category name for display
   * @param categoryType - The category type to format
   * @returns Formatted category name
   */
  const formatCategoryName = (categoryType: string): string => {
    return categoryType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  /**
   * Get appropriate icon for category type
   * @param categoryType - The category type
   * @returns Icon name for the category
   */
  const getCategoryIcon = (categoryType: string): string => {
    const lowerCaseType = categoryType.toLowerCase();

    if (
      lowerCaseType.includes("construction") ||
      lowerCaseType.includes("builder")
    ) {
      return "hammer-outline";
    } else if (
      lowerCaseType.includes("electric") ||
      lowerCaseType.includes("electrical")
    ) {
      return "flash-outline";
    } else if (
      lowerCaseType.includes("plumb") ||
      lowerCaseType.includes("water")
    ) {
      return "water-outline";
    } else if (
      lowerCaseType.includes("paint") ||
      lowerCaseType.includes("decorator")
    ) {
      return "brush-outline";
    } else if (
      lowerCaseType.includes("garden") ||
      lowerCaseType.includes("landscap")
    ) {
      return "leaf-outline";
    } else if (
      lowerCaseType.includes("clean") ||
      lowerCaseType.includes("maid")
    ) {
      return "sparkles-outline";
    } else if (
      lowerCaseType.includes("mechanic") ||
      lowerCaseType.includes("repair")
    ) {
      return "build-outline";
    } else if (
      lowerCaseType.includes("driver") ||
      lowerCaseType.includes("transport")
    ) {
      return "car-outline";
    } else if (
      lowerCaseType.includes("cook") ||
      lowerCaseType.includes("chef")
    ) {
      return "restaurant-outline";
    } else if (
      lowerCaseType.includes("security") ||
      lowerCaseType.includes("guard")
    ) {
      return "shield-outline";
    } else {
      return "construct-outline";
    }
  };

  /**
   * Get labor count for a specific category
   * @param categoryType - The category type to count
   * @returns The number of labors in that category
   */
  const getLaborCountByCategory = (categoryType: string): number => {
    return labors.filter((labor) => labor.type === categoryType).length;
  };

  /**
   * Handle category card press
   * @param categoryType - The selected category type
   */
  const handleCategoryPress = (categoryType: string): void => {
    setSelectedCategory(categoryType);
  };

  /**
   * Handle view mode toggle
   */
  const handleViewModeToggle = (): void => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  /**
   * Handle clear filter
   */
  const handleClearFilter = (): void => {
    setSelectedCategory(null);
  };

  /**
   * Render labor card for list view
   * @param labor - The labor data
   * @returns JSX element for labor card
   */
  const renderLaborCard = (labor: any): React.JSX.Element => {
    return (
      <TouchableOpacity
        key={labor.id}
        style={styles.laborerCard}
        activeOpacity={0.8}
      >
        <View style={styles.laborerHeader}>
          <Avatar.Image
            size={56}
            source={{ uri: labor.image || "https://via.placeholder.com/56" }}
            style={styles.laborerAvatar}
          />
          <View style={styles.laborerInfo}>
            <Text variant="titleMedium" style={styles.laborerName}>
              {labor.name}
            </Text>
            <Text variant="bodyMedium" style={styles.laborerCategory}>
              {formatCategoryName(labor.type)}
            </Text>
            <Text variant="bodySmall" style={styles.laborerArea}>
              {labor.area}, {labor.city}
            </Text>
          </View>
          <View style={styles.laborerRating}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={Colors.yellow} />
              <Text style={styles.ratingText}>{labor.rating.toFixed(1)}</Text>
            </View>
            <View style={[styles.availabilityBadge, styles.availableBadge]}>
              <Text style={[styles.availabilityText, styles.availableText]}>
                Available
              </Text>
            </View>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.laborerDetails}>
          <Text style={styles.experienceText}>Starting from</Text>
          <Text style={styles.hourlyRate}>${labor.startingWage}/hour</Text>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * Render labor card for grid view
   * @param labor - The labor data
   * @returns JSX element for labor grid card
   */
  const renderLaborGridCard = (labor: any): React.JSX.Element => {
    return (
      <TouchableOpacity
        key={labor.id}
        style={styles.laborGridCard}
        activeOpacity={0.8}
      >
        <Avatar.Image
          size={48}
          source={{ uri: labor.image || "https://via.placeholder.com/48" }}
          style={styles.laborGridAvatar}
        />
        <Text variant="titleSmall" style={styles.laborGridName}>
          {labor.name}
        </Text>
        <Text variant="bodySmall" style={styles.laborGridCategory}>
          {formatCategoryName(labor.type)}
        </Text>
        <View style={styles.laborGridRating}>
          <Ionicons name="star" size={12} color={Colors.yellow} />
          <Text style={styles.laborGridRatingText}>
            {labor.rating.toFixed(1)}
          </Text>
        </View>
        <Text style={styles.laborGridRate}>${labor.startingWage}/hr</Text>
      </TouchableOpacity>
    );
  };

  /**
   * Render category card
   * @param categoryType - The category type to render
   * @param index - The index of the category
   * @returns JSX element for the category card
   */
  const renderCategoryCard = (
    categoryType: string,
    index: number
  ): React.JSX.Element => {
    const laborCount = getLaborCountByCategory(categoryType);
    const cardColors = [
      Colors.primary,
      Colors.secondary,
      Colors.orange,
      Colors.yellow,
    ];
    const cardColor = cardColors[index % cardColors.length];
    const iconName = getCategoryIcon(categoryType);

    return (
      <TouchableOpacity
        key={categoryType}
        style={[
          styles.categoryCard,
          {
            borderLeftWidth: 4,
            borderLeftColor: cardColor,
            backgroundColor: Colors.white,
          },
        ]}
        onPress={() => handleCategoryPress(categoryType)}
        activeOpacity={0.85}
        delayPressIn={0}
        delayPressOut={100}
      >
        <View
          style={[
            styles.categoryIconContainer,
            {
              backgroundColor: cardColor,
              shadowColor: cardColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            },
          ]}
        >
          <Ionicons
            name={iconName as any}
            size={CORE_VALUES.iconImageSize}
            color={Colors.white}
          />
        </View>

        <View style={styles.categoryCardContent}>
          <Text variant="titleMedium" style={styles.categoryTitle}>
            {formatCategoryName(categoryType)}
          </Text>

          <View style={styles.categoryCountContainer}>
            <Text variant="bodySmall" style={styles.categoryCount}>
              {laborCount} {laborCount === 1 ? "Labor" : "Labors"} Available
            </Text>
            <View
              style={[styles.countBadge, { backgroundColor: `${cardColor}20` }]}
            >
              <Text style={[styles.countBadgeText, { color: cardColor }]}>
                {laborCount}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Surface style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBackPress} />
        <Appbar.Content title={t("browse_services_title")} />
        {selectedCategory && (
          <Appbar.Action
            icon={viewMode === "list" ? "view-grid" : "view-list"}
            onPress={handleViewModeToggle}
          />
        )}
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
          {!selectedCategory ? (
            // Categories View
            <>
              {/* Header Section */}
              <View style={styles.headerSection}>
                <Text variant="headlineSmall" style={styles.title}>
                  {t("browse_services_title")}
                </Text>
                <Text variant="bodyMedium" style={styles.subtitle}>
                  {t("find_perfect_labor")}
                </Text>
              </View>

              {/* Categories Section */}
              <ScrollView
                style={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[Colors.primary]}
                    tintColor={Colors.primary}
                  />
                }
              >
                <View style={styles.categoriesSection}>
                  {isLoading && laborTypes.length === 0 ? (
                    <View style={styles.categoryLoadingContainer}>
                      <ActivityIndicator size="large" color={Colors.primary} />
                      <Text variant="bodyMedium" style={styles.loadingText}>
                        Loading categories...
                      </Text>
                    </View>
                  ) : laborTypes.length > 0 ? (
                    <View style={styles.categoryCardsContainer}>
                      {laborTypes.map((categoryType, index) =>
                        renderCategoryCard(categoryType, index)
                      )}
                    </View>
                  ) : (
                    <View style={styles.emptyState}>
                      <Ionicons
                        name="construct-outline"
                        size={64}
                        color={Colors.textGray}
                      />
                      <Text variant="titleMedium" style={styles.emptyTitle}>
                        No Categories Available
                      </Text>
                      <Text variant="bodyMedium" style={styles.emptySubtitle}>
                        Categories will appear here when they are loaded
                      </Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            </>
          ) : (
            // Filtered Results View
            <>
              {/* Applied Filter Section */}
              <View style={styles.filterSection}>
                <View style={styles.appliedFilterContainer}>
                  <Text variant="titleMedium" style={styles.appliedFilterTitle}>
                    Applied Filter:
                  </Text>
                  <Chip
                    selected
                    style={styles.appliedFilterChip}
                    textStyle={styles.appliedFilterText}
                    icon={getCategoryIcon(selectedCategory)}
                    onClose={handleClearFilter}
                    closeIcon="close"
                  >
                    {formatCategoryName(selectedCategory)}
                  </Chip>
                </View>
                <Text variant="bodyMedium" style={styles.resultsCount}>
                  {filteredLabors.length}{" "}
                  {filteredLabors.length === 1 ? "Labor" : "Labors"} Found
                </Text>
              </View>

              {/* Results Section */}
              <ScrollView
                style={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[Colors.primary]}
                    tintColor={Colors.primary}
                  />
                }
              >
                {filteredLabors.length > 0 ? (
                  viewMode === "list" ? (
                    <View style={styles.laborersListContainer}>
                      {filteredLabors.map((labor) => renderLaborCard(labor))}
                    </View>
                  ) : (
                    <View style={styles.laborersGridContainer}>
                      {filteredLabors.map((labor) =>
                        renderLaborGridCard(labor)
                      )}
                    </View>
                  )
                ) : (
                  <View style={styles.emptyState}>
                    <Ionicons
                      name="people-outline"
                      size={64}
                      color={Colors.textGray}
                    />
                    <Text variant="titleMedium" style={styles.emptyTitle}>
                      No Labors Found
                    </Text>
                    <Text variant="bodyMedium" style={styles.emptySubtitle}>
                      No labors available in the selected category
                    </Text>
                  </View>
                )}
              </ScrollView>
            </>
          )}
        </View>
      )}
    </Surface>
  );
};

export default BrowseServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background2,
  },
  header: {
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: Colors.background2,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: Colors.textGray,
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: Colors.background2,
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
    paddingHorizontal: CORE_VALUES.headerPadding,
    paddingVertical: CORE_VALUES.cardPadding,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textGray,
    lineHeight: 22,
  },
  searchInput: {
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  scrollContent: {
    flex: 1,
    backgroundColor: Colors.background2,
  },
  categoryIconContainer: {
    width: CORE_VALUES.iconSize,
    height: CORE_VALUES.iconSize,
    borderRadius: CORE_VALUES.iconRadius,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryLoadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  categoryCardsContainer: {
    paddingHorizontal: 8,
  },
  laborersListContainer: {
    paddingHorizontal: CORE_VALUES.cardPadding,
    paddingVertical: 8,
  },
  laborerCard: {
    marginBottom: 12,
    marginHorizontal: 4,
    backgroundColor: Colors.white,
    borderRadius: CORE_VALUES.borderRadius,
    padding: CORE_VALUES.cardPadding,
    elevation: 2,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    paddingVertical: 60,
    paddingHorizontal: CORE_VALUES.headerPadding,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.textGray,
    textAlign: "center",
    lineHeight: 24,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: CORE_VALUES.cardPadding,
    marginHorizontal: CORE_VALUES.cardPadding,
    marginBottom: CORE_VALUES.cardMargin,
    borderRadius: CORE_VALUES.borderRadius,
    elevation: 3,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: Colors.white,
  },
  categoryCardContent: {
    flex: 1,
    marginLeft: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
    textTransform: "capitalize",
  },
  categoryCount: {
    fontSize: 12,
    color: Colors.textGray,
    fontWeight: "500",
  },
  categoryCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  categoriesSection: {
    paddingTop: 8,
    paddingBottom: CORE_VALUES.cardPadding,
  },
  // Filter Section Styles
  filterSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: CORE_VALUES.headerPadding,
    paddingVertical: CORE_VALUES.cardPadding,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  appliedFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  appliedFilterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginRight: 12,
  },
  appliedFilterChip: {
    backgroundColor: Colors.primary,
  },
  appliedFilterText: {
    color: Colors.white,
    fontWeight: "600",
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.textGray,
    fontWeight: "500",
  },
  // Grid View Styles
  laborersGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: CORE_VALUES.cardPadding,
    paddingVertical: 8,
  },
  laborGridCard: {
    width: "48%",
    backgroundColor: Colors.white,
    borderRadius: CORE_VALUES.borderRadius,
    padding: CORE_VALUES.cardPadding,
    marginBottom: CORE_VALUES.cardMargin,
    alignItems: "center",
    elevation: 2,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  laborGridAvatar: {
    marginBottom: 8,
  },
  laborGridName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 4,
  },
  laborGridCategory: {
    fontSize: 12,
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 6,
  },
  laborGridRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  laborGridRatingText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text,
    marginLeft: 4,
  },
  laborGridRate: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "center",
  },
});
