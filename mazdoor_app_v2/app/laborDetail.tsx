// Native Imports
import React, { FC, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Pressable,
  Alert,
  Image,
} from "react-native";
// 3rd Party Imports
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import {
  Button,
  Text,
  Appbar,
  Surface,
  Avatar,
  Divider,
  ActivityIndicator,
  Card,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
// Alias Imports
import Colors from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { LaborActionCreator } from "@/store/reducers";
import { Labor, Gig } from "@/models/interfaces";

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

const LaborDetail: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [gigsViewMode, setGigsViewMode] = useState<"list" | "grid">("list");
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [isGigModalVisible, setIsGigModalVisible] = useState(false);

  // Redux state
  const labors = useAppSelector((state) => state.laborSlice.labors);
  const selectedLabor = useAppSelector(
    (state) => state.laborSlice.selectedLabor
  );
  const isLoading = useAppSelector((state) => state.laborSlice.isLoading);
  const error = useAppSelector((state) => state.laborSlice.error);

  console.log("Selected labor from Redux:", selectedLabor);

  // Generate gigs data from selectedLabor.gigs array
  const getGigsData = (): Gig[] => {
    if (!selectedLabor || !selectedLabor.gigs) return [];

    console.log("LABOR GIGS:", selectedLabor.gigs);

    return selectedLabor.gigs;
  };

  const gigsData = getGigsData();

  useEffect(() => {
    console.log(
      "Effect running - selectedLabor:",
      selectedLabor,
      "labors length:",
      labors.length
    );
    if (!labors.length || !selectedLabor) {
      // If no labors loaded or no labor selected, fetch labors
      console.log("Fetching labors...");
      dispatch(LaborActionCreator.fetchLabors());
    }
  }, [selectedLabor, dispatch, labors.length]);

  // Clear selected labor when component unmounts
  useEffect(() => {
    return () => {
      dispatch(LaborActionCreator.clearSelectedLabor());
    };
  }, [dispatch]);

  /**
   * Handle back button press
   */
  const handleBackPress = (): void => {
    // Clear the selected labor from Redux
    dispatch(LaborActionCreator.clearSelectedLabor());
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
   * Handle contact me button press
   * @param laborUsername - The username of the labor
   */
  const handleContactMe = (laborUsername: string): void => {
    Alert.alert(t("contact"), `${t("button_clicked_with")} ${laborUsername}`);
  };

  /**
   * Format date to readable format
   * @param dateString - The date string to format
   * @returns Formatted date string
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
   * Handle gigs view mode toggle
   */
  const handleGigsViewModeToggle = (): void => {
    setGigsViewMode(gigsViewMode === "list" ? "grid" : "list");
  };

  /**
   * Handle gig card press to open modal
   * @param gig - The selected gig data
   */
  const handleGigPress = (gig: Gig): void => {
    setSelectedGig(gig);
    setIsGigModalVisible(true);
  };

  /**
   * Handle gig modal close
   */
  const handleGigModalClose = (): void => {
    setIsGigModalVisible(false);
    setSelectedGig(null);
  };

  /**
   * Handle let's discuss button press
   * @param gigTitle - The title of the gig
   */
  const handleLetsDiscuss = (gigTitle: string): void => {
    Alert.alert(t("lets_discuss"), `${t("interested_in_gig")} "${gigTitle}"`);
    handleGigModalClose();
  };

  /**
   * Render gig card for list view
   * @param gig - The gig data
   * @returns JSX element for gig card
   */
  const renderGigCard = (gig: Gig): React.JSX.Element => {
    return (
      <TouchableOpacity
        style={styles.gigCard}
        activeOpacity={0.8}
        onPress={() => handleGigPress(gig)}
      >
        <View style={styles.gigImageContainer}>
          <Image
            source={{ uri: gig.image }}
            style={styles.gigImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.gigInfo}>
          <Text variant="titleMedium" style={styles.gigTitle} numberOfLines={2}>
            {gig.title}
          </Text>
          <Text style={styles.gigPrice}>
            {t("starting_price")}: ${gig.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * Render gig card for grid view
   * @param gig - The gig data
   * @returns JSX element for gig grid card
   */
  const renderGigGridCard = (gig: Gig): React.JSX.Element => {
    return (
      <TouchableOpacity
        style={styles.gigGridCard}
        activeOpacity={0.8}
        onPress={() => handleGigPress(gig)}
      >
        <View style={styles.gigGridImageContainer}>
          <Image
            source={{ uri: gig.image }}
            style={styles.gigGridImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.gigGridContent}>
          <Text
            variant="titleSmall"
            style={styles.gigGridTitle}
            numberOfLines={2}
          >
            {gig.title}
          </Text>
          <Text style={styles.gigGridPrice}>
            {t("starting_price")}: ${gig.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * Render gig detail modal
   * @returns JSX element for gig detail modal
   */
  const renderGigDetailModal = (): React.JSX.Element => {
    if (!selectedGig) return <></>;

    return (
      <Modal
        visible={isGigModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleGigModalClose}
        presentationStyle="overFullScreen"
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={handleGigModalClose}
          />
          <View style={styles.modalContainer}>
            {/* Drag Handle */}
            <View style={styles.modalDragHandle} />

            <View style={styles.modalHeader}>
              <Text variant="headlineSmall" style={styles.modalTitle}>
                {t("gig_details")}
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={handleGigModalClose}
              >
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={styles.modalContentContainer}
              showsVerticalScrollIndicator={true}
              bounces={true}
              alwaysBounceVertical={false}
              keyboardShouldPersistTaps="handled"
              scrollEventThrottle={16}
            >
              <View style={styles.modalImageContainer}>
                <Image
                  source={{ uri: selectedGig.image }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.modalInfo}>
                <Text variant="headlineSmall" style={styles.modalGigTitle}>
                  {selectedGig.title}
                </Text>

                <View style={styles.modalPriceContainer}>
                  <Text variant="titleLarge" style={styles.modalPrice}>
                    ${selectedGig.price}
                  </Text>
                  <Text variant="bodyMedium" style={styles.modalPriceLabel}>
                    {t("starting_price")}
                  </Text>
                </View>

                <View style={styles.modalSection}>
                  <Text variant="titleMedium" style={styles.modalSectionTitle}>
                    {t("description")}
                  </Text>
                  <Text variant="bodyMedium" style={styles.modalDescription}>
                    {selectedGig.description}
                  </Text>
                </View>

                <View style={styles.modalSection}>
                  <Text variant="titleMedium" style={styles.modalSectionTitle}>
                    {t("delivery_time")}
                  </Text>
                  <View style={styles.modalDeliveryTimeContainer}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={Colors.primary}
                    />
                    <Text variant="bodyMedium" style={styles.modalDeliveryTime}>
                      {selectedGig.deliveryTime} {t("days")}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text variant="titleMedium" style={styles.modalSectionTitle}>
                    {t("category")}
                  </Text>
                  <View style={styles.modalCategoryContainer}>
                    <Ionicons
                      name="folder-outline"
                      size={16}
                      color={Colors.primary}
                    />
                    <Text variant="bodyMedium" style={styles.modalCategoryText}>
                      {selectedGig.category}
                    </Text>
                  </View>
                </View>

                {/* Extra spacing to ensure scrolling works */}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <Button
                mode="contained"
                style={styles.discussButton}
                buttonColor={Colors.primary}
                textColor={Colors.white}
                onPress={() => handleLetsDiscuss(selectedGig.title)}
                icon="chat-outline"
              >
                {t("lets_discuss")}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <Surface style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={handleBackPress} />
          <Appbar.Content title={t("labor_detail")} />
        </Appbar.Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text variant="bodyMedium" style={styles.loadingText}>
            {t("loading")}
          </Text>
        </View>
      </Surface>
    );
  }

  // Error state or labor not found
  if (error || !selectedLabor) {
    return (
      <Surface style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={handleBackPress} />
          <Appbar.Content title={t("labor_detail")} />
        </Appbar.Header>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={Colors.red} />
          <Text variant="titleMedium" style={styles.errorTitle}>
            {t("error_labor_not_found")}
          </Text>
          <Text variant="bodyMedium" style={styles.errorText}>
            {error || t("labor_not_found_description")}
          </Text>
          <Button
            mode="contained"
            onPress={handleBackPress}
            style={styles.backButton}
            buttonColor={Colors.primary}
            textColor={Colors.white}
          >
            {t("go_back")}
          </Button>
        </View>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBackPress} />
        <Appbar.Content title={t("labor_detail")} />
      </Appbar.Header>

      <ScrollView
        style={styles.content}
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
        {/* Labor Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Avatar.Image
              size={80}
              source={{
                uri: selectedLabor.image || "https://via.placeholder.com/80",
              }}
              style={styles.profileAvatar}
            />
            <View style={styles.profileInfo}>
              <Text variant="headlineSmall" style={styles.profileName}>
                {selectedLabor.name}
              </Text>
              <Text variant="bodyLarge" style={styles.profileUsername}>
                @{selectedLabor.username}
              </Text>
              <View style={styles.profileRating}>
                <Ionicons name="star" size={20} color={Colors.yellow} />
                <Text style={styles.profileRatingText}>
                  {selectedLabor.rating.toFixed(1)}
                </Text>
              </View>
            </View>
          </View>

          {/* Contact Me Button */}
          <Button
            mode="contained"
            style={styles.contactButton}
            buttonColor={Colors.primary}
            textColor={Colors.white}
            onPress={() => handleContactMe(selectedLabor.username)}
            icon="message-outline"
          >
            {t("contact_me")}
          </Button>
        </View>

        <Divider style={styles.sectionDivider} />

        {/* Labor Information Section */}
        <View style={styles.informationSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            {t("labor_information")}
          </Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.infoContent}>
                <Text variant="bodySmall" style={styles.infoLabel}>
                  {t("from")}
                </Text>
                <Text variant="bodyLarge" style={styles.infoValue}>
                  {selectedLabor.area}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name="hammer-outline"
                  size={20}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.infoContent}>
                <Text variant="bodySmall" style={styles.infoLabel}>
                  {t("category")}
                </Text>
                <Text variant="bodyLarge" style={styles.infoValue}>
                  {formatCategoryName(selectedLabor.type)}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.infoContent}>
                <Text variant="bodySmall" style={styles.infoLabel}>
                  {t("member_since")}
                </Text>
                <Text variant="bodyLarge" style={styles.infoValue}>
                  {formatDate(selectedLabor.createdAt)}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.infoContent}>
                <Text variant="bodySmall" style={styles.infoLabel}>
                  {t("avg_response_time")}
                </Text>
                <Text variant="bodyLarge" style={styles.infoValue}>
                  {t("two_hours")}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.infoContent}>
                <Text variant="bodySmall" style={styles.infoLabel}>
                  {t("last_delivery")}
                </Text>
                <Text variant="bodyLarge" style={styles.infoValue}>
                  {t("twenty_three_hours")}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name="cash-outline"
                  size={20}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.infoContent}>
                <Text variant="bodySmall" style={styles.infoLabel}>
                  {t("starting_rate")}
                </Text>
                <Text variant="bodyLarge" style={styles.infoValue}>
                  ${selectedLabor.startingWage}/{t("hour")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Divider style={styles.sectionDivider} />

        {/* Gigs Section */}
        <View style={styles.gigsSection}>
          <View style={styles.gigsSectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              {t("gigs")} ({gigsData.length})
            </Text>
            <TouchableOpacity
              style={styles.viewToggleButton}
              onPress={handleGigsViewModeToggle}
            >
              <Ionicons
                name={gigsViewMode === "list" ? "grid-outline" : "list-outline"}
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.gigsContainer}>
            {gigsData.length > 0 ? (
              gigsViewMode === "list" ? (
                <View style={styles.gigsListContainer}>
                  {gigsData.map((gig: Gig, index: number) => (
                    <View key={index} style={styles.gigItemWrapper}>
                      {renderGigCard(gig)}
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.gigsGridContainer}>
                  {gigsData.map((gig: Gig, index: number) => (
                    <View key={index} style={styles.gigGridItemWrapper}>
                      {renderGigGridCard(gig)}
                    </View>
                  ))}
                </View>
              )
            ) : (
              <View style={styles.emptyGigsContainer}>
                <Ionicons
                  name="briefcase-outline"
                  size={64}
                  color={Colors.textGray}
                />
                <Text variant="titleMedium" style={styles.emptyGigsTitle}>
                  {t("no_gigs_available")}
                </Text>
                <Text variant="bodyMedium" style={styles.emptyGigsText}>
                  {t("no_gigs_description")}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Gig Detail Modal */}
      {renderGigDetailModal()}
    </Surface>
  );
};

export default LaborDetail;

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
  backButton: {
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: CORE_VALUES.headerPadding,
    paddingVertical: 24,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileAvatar: {
    marginRight: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 0,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: Colors.textGray,
    marginBottom: 12,
  },
  profileRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileRatingText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginLeft: 6,
  },
  contactButton: {
    paddingVertical: 8,
    borderRadius: 12,
  },
  sectionDivider: {
    height: 8,
    backgroundColor: Colors.background,
  },
  informationSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: CORE_VALUES.headerPadding,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 20,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background2,
    borderRadius: 12,
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textGray,
    marginBottom: 4,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  gigsSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: CORE_VALUES.headerPadding,
    paddingVertical: 24,
  },
  gigsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  viewToggleButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.background2,
  },
  gigsContainer: {
    flex: 1,
  },
  gigsListContainer: {
    gap: 12,
  },
  gigItemWrapper: {
    marginBottom: 4,
  },
  gigsGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  gigGridItemWrapper: {
    width: "47%",
  },
  gigCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    elevation: 2,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "column",
    overflow: "hidden",
  },
  gigImageContainer: {
    width: "100%",
    height: 160,
    backgroundColor: Colors.background2,
  },
  gigImageWrapper: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.background2,
  },
  gigImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background2,
  },
  gigInfo: {
    padding: 16,
    alignItems: "flex-start",
  },
  gigTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
    lineHeight: 22,
  },
  gigPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  gigGridCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    elevation: 2,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "column",
    overflow: "hidden",
  },
  gigGridImageContainer: {
    width: "100%",
    height: 120,
    backgroundColor: Colors.background2,
  },
  gigGridImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background2,
  },
  gigGridContent: {
    padding: 12,
    alignItems: "flex-start",
  },
  gigGridTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  gigGridPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "85%",
    overflow: "hidden",
    elevation: 10,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "column",
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.textGray,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
    opacity: 0.3,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background2,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },
  modalCloseButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.background2,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  modalContentContainer: {
    flexGrow: 1,
  },
  modalImageContainer: {
    width: "100%",
    height: 180,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.background2,
  },
  modalImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background2,
  },
  modalInfo: {
    width: "100%",
    alignItems: "stretch",
  },
  modalGigTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 26,
  },
  modalPriceContainer: {
    alignItems: "center",
    marginBottom: 20,
    padding: 12,
    backgroundColor: Colors.background2,
    borderRadius: 12,
    width: "100%",
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.primary,
    marginBottom: 4,
  },
  modalPriceLabel: {
    fontSize: 12,
    color: Colors.textGray,
    fontWeight: "500",
  },
  modalSection: {
    width: "100%",
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: Colors.textGray,
    lineHeight: 20,
    textAlign: "left",
    paddingHorizontal: 4,
  },
  modalDeliveryTime: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    marginLeft: 6,
  },
  modalDeliveryTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  modalCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  modalCategoryText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    marginLeft: 6,
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.background2,
    backgroundColor: Colors.white,
  },
  discussButton: {
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  emptyGigsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyGigsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyGigsText: {
    fontSize: 14,
    color: Colors.textGray,
    textAlign: "center",
    lineHeight: 20,
  },
});
