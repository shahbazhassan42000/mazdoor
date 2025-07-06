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
import {
  fetchLaborersWithTypes,
  selectLaborTypes,
  selectLaborCategories,
  selectTransformedLaborers,
  selectLaborLoading,
  selectLaborError,
} from "@/store/reducers";

// UI interfaces for display
interface LaborCategory {
  id: string;
  name: string;
  nameKey: string;
  description: string;
  descriptionKey: string;
  icon: string;
  color: string;
  laborCount: number;
}

interface Laborer {
  id: string;
  name: string;
  categoryId: string;
  category: string;
  image: string;
  age: number;
  cnic: string;
  area: string;
  phone: string;
  rating: number;
  experience: string;
  hourlyRate: number;
  isAvailable: boolean;
  skills: string[];
}

type SortOption = "rating_high" | "rating_low" | "price_low" | "price_high";

const BrowseServices: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Redux state
  const laborTypes = useAppSelector(selectLaborTypes);
  const laborCategories = useAppSelector(selectLaborCategories);
  const allLaborers = useAppSelector(selectTransformedLaborers);
  const isLoading = useAppSelector(selectLaborLoading);
  const error = useAppSelector(selectLaborError);

  // Local state for UI controls
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("rating_high");
  const [filteredLaborers, setFilteredLaborers] = useState<Laborer[]>([]);

  /**
   * Load all data on component mount using Redux
   */
  useEffect(() => {
    dispatch(fetchLaborersWithTypes());
  }, [dispatch]);

  /**
   * Filter and sort laborers based on search, category, and sort options
   */
  useEffect(() => {
    let filtered = [...allLaborers];

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (laborer) =>
          laborer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          laborer.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          laborer.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
          laborer.skills.some((skill: string) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (laborer) => laborer.categoryId === selectedCategory
      );
    }

    // Only show filtered results if there's a search query or selected category
    if (!searchQuery.trim() && !selectedCategory) {
      setFilteredLaborers([]);
      return;
    }

    // Sort laborers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating_high":
          return b.rating - a.rating;
        case "rating_low":
          return a.rating - b.rating;
        case "price_low":
          return a.hourlyRate - b.hourlyRate;
        case "price_high":
          return b.hourlyRate - a.hourlyRate;
        default:
          return 0;
      }
    });

    setFilteredLaborers(filtered);
  }, [searchQuery, selectedCategory, sortBy, allLaborers]);

  /**
   * Handle retry loading data
   */
  const handleRetry = (): void => {
    dispatch(fetchLaborersWithTypes());
  };

  /**
   * Handle back button press
   */
  const handleBackPress = (): void => {
    router.back();
  };

  /**
   * Handle category selection
   * @param categoryId - The ID of the selected category
   */
  const handleCategorySelect = (categoryId: string): void => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  /**
   * Handle laborer contact
   * @param laborer - The laborer to contact
   */
  const handleContactLaborer = (laborer: Laborer): void => {
    // TODO: Implement contact functionality
    console.log("Contact laborer:", laborer.name);
  };

  /**
   * Handle view laborer profile
   * @param laborer - The laborer whose profile to view
   */
  const handleViewProfile = (laborer: Laborer): void => {
    // TODO: Implement profile view functionality
    console.log("View profile:", laborer.name);
  };

  /**
   * Get icon name for category
   * @param iconName - The icon name from data
   * @returns Ionicon name
   */
  const getIconName = (iconName: string): any => {
    const iconMap: Record<string, any> = {
      hammer: "hammer-outline",
      tools: "build-outline",
      water: "water-outline",
      flash: "flash-outline",
      brush: "brush-outline",
      broom: "broom-outline",
    };
    return iconMap[iconName] || "person-outline";
  };

  /**
   * Render category grid
   * @returns JSX element containing category grid
   */
  const renderCategoryGrid = () => (
    <View style={styles.categoryGridContainer}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        {t("all_categories")}
      </Text>

      <View style={styles.categoryGrid}>
        {laborCategories.map((category: LaborCategory) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryGridItem,
              { backgroundColor: category.color + "20" },
              selectedCategory === category.id &&
                styles.categoryGridItemSelected,
            ]}
            onPress={() => handleCategorySelect(category.id)}
          >
            <View
              style={[
                styles.categoryIconContainer,
                { backgroundColor: category.color },
              ]}
            >
              <Ionicons
                name={getIconName(category.icon)}
                size={24}
                color={Colors.white}
              />
            </View>

            <Text variant="titleSmall" style={styles.categoryGridTitle}>
              {t(category.nameKey)}
            </Text>

            <Text variant="bodySmall" style={styles.categoryGridDescription}>
              {t(category.descriptionKey)}
            </Text>

            <Text variant="bodySmall" style={styles.categoryGridCount}>
              {category.laborCount} {t("laborers_available")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  /**
   * Render category chips
   * @returns JSX element containing category chips
   */
  const renderCategoryChips = () => (
    <View style={styles.categoryContainer}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        {t("filter_by_category")}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipScrollContainer}
      >
        <Chip
          selected={selectedCategory === null}
          onPress={() => setSelectedCategory(null)}
          style={[
            styles.categoryChip,
            selectedCategory === null && styles.categoryChipSelected,
          ]}
          textStyle={[
            styles.chipText,
            selectedCategory === null && styles.chipTextSelected,
          ]}
        >
          {t("all_categories")}
        </Chip>

        {laborCategories.map((category: LaborCategory) => (
          <Chip
            key={category.id}
            selected={selectedCategory === category.id}
            onPress={() => handleCategorySelect(category.id)}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipSelected,
            ]}
            textStyle={[
              styles.chipText,
              selectedCategory === category.id && styles.chipTextSelected,
            ]}
          >
            {t(category.nameKey)}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );

  /**
   * Render sort options
   * @returns JSX element containing sort options
   */
  const renderSortOptions = () => (
    <View style={styles.sortContainer}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        {t("sort_by")}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipScrollContainer}
      >
        {[
          { key: "rating_high", label: t("sort_rating_high") },
          { key: "rating_low", label: t("sort_rating_low") },
          { key: "price_low", label: t("sort_price_low") },
          { key: "price_high", label: t("sort_price_high") },
        ].map((option) => (
          <Chip
            key={option.key}
            selected={sortBy === option.key}
            onPress={() => setSortBy(option.key as SortOption)}
            style={[
              styles.sortChip,
              sortBy === option.key && styles.sortChipSelected,
            ]}
            textStyle={[
              styles.chipText,
              sortBy === option.key && styles.chipTextSelected,
            ]}
          >
            {option.label}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );

  /**
   * Render laborer card
   * @param laborer - The laborer data
   * @returns JSX element containing laborer card
   */
  const renderLaborerCard = ({ item: laborer }: { item: Laborer }) => (
    <Card style={styles.laborerCard}>
      <Card.Content>
        <View style={styles.laborerHeader}>
          <Avatar.Image
            size={60}
            source={{ uri: laborer.image }}
            style={styles.laborerAvatar}
          />

          <View style={styles.laborerInfo}>
            <Text variant="titleMedium" style={styles.laborerName}>
              {laborer.name}
            </Text>

            <Text variant="bodyMedium" style={styles.laborerCategory}>
              {t(
                laborCategories.find(
                  (c: LaborCategory) => c.id === laborer.categoryId
                )?.nameKey || ""
              )}
            </Text>

            <Text variant="bodySmall" style={styles.laborerArea}>
              📍 {laborer.area}
            </Text>
          </View>

          <View style={styles.laborerRating}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={Colors.yellow} />
              <Text style={styles.ratingText}>{laborer.rating}</Text>
            </View>

            <View
              style={[
                styles.availabilityBadge,
                laborer.isAvailable
                  ? styles.availableBadge
                  : styles.unavailableBadge,
              ]}
            >
              <Text
                style={[
                  styles.availabilityText,
                  laborer.isAvailable
                    ? styles.availableText
                    : styles.unavailableText,
                ]}
              >
                {laborer.isAvailable ? t("available") : t("not_available")}
              </Text>
            </View>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.laborerDetails}>
          <Text variant="bodySmall" style={styles.experienceText}>
            {laborer.experience} {t("years_experience")}
          </Text>

          <Text variant="titleSmall" style={styles.hourlyRate}>
            Rs. {laborer.hourlyRate} {t("per_hour")}
          </Text>
        </View>

        <View style={styles.skillsContainer}>
          {laborer.skills.slice(0, 3).map((skill, index) => (
            <Chip
              key={index}
              style={styles.skillChip}
              textStyle={styles.skillText}
            >
              {skill}
            </Chip>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            style={styles.actionButton}
            onPress={() => handleViewProfile(laborer)}
            textColor={Colors.primary}
          >
            {t("view_profile")}
          </Button>

          <Button
            mode="contained"
            style={styles.actionButton}
            onPress={() => handleContactLaborer(laborer)}
            buttonColor={Colors.primary}
            textColor={Colors.white}
            disabled={!laborer.isAvailable}
          >
            {t("contact_laborer")}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  /**
   * Render empty state
   * @returns JSX element for empty state
   */
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="search-outline" size={64} color={Colors.textGray} />
      <Text variant="titleMedium" style={styles.emptyTitle}>
        {t("no_laborers_found")}
      </Text>
      <Text variant="bodyMedium" style={styles.emptySubtitle}>
        {t("try_different_search")}
      </Text>
    </View>
  );

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
            <TextInput
              placeholder={t("search_laborers")}
              value={searchQuery}
              onChangeText={setSearchQuery}
              mode="outlined"
              style={styles.searchInput}
              left={<TextInput.Icon icon="magnify" />}
              theme={{ colors: { primary: Colors.primary } }}
            />
          </View>

          {/* Filters and Content */}
          <ScrollView
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Show category grid when no search or filters */}
            {!searchQuery && !selectedCategory && renderCategoryGrid()}

            {/* Show filters when searching or category selected */}
            {(searchQuery || selectedCategory) && (
              <>
                {renderCategoryChips()}
                {renderSortOptions()}
              </>
            )}

            {/* Results Section - only show when searching or category selected */}
            {(searchQuery || selectedCategory) && (
              <View style={styles.resultsSection}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  {filteredLaborers.length} {t("laborers_available")}
                </Text>

                {filteredLaborers.length > 0 ? (
                  <FlatList
                    data={filteredLaborers}
                    renderItem={renderLaborerCard}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    contentContainerStyle={styles.laborersListContainer}
                  />
                ) : (
                  renderEmptyState()
                )}
              </View>
            )}
          </ScrollView>
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
