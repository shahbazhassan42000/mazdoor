// Native Imports
import { ImageBackgroundComponent, StyleSheet, Image } from "react-native";
// 3rd Party Imports
import { useTranslation } from "react-i18next";
// Alias Imports
import { View, Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { IMAGES } from "@/constants/images";

const Services = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text
        style={[styles.typography1, styles.primaryFont, styles.serviceTitle]}
      >
        {t("what_we_serve")}
      </Text>
      {/* Service 1 */}
      <Text style={[styles.typography2, styles.title]}>
        {t("your_favorite_labor")}
        {"\n"}
        {t("finding_partner")}
      </Text>
      <Image source={IMAGES.services_1} style={styles.servicesImg} />
      {/* Service 2 */}
      <Text style={[styles.typography2, styles.title]}>
        {t("easy_to_access")}
      </Text>
      <Text style={[styles.typography3, styles.description]}>
        {t("easy_to_access_desc_1")}
        {"\n"}
        {t("easy_to_access_desc_2")}
      </Text>
      <Image source={IMAGES.services_2} style={styles.servicesImg} />
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    paddingTop: 141,
    alignItems: "center",
  },
  serviceTitle: {
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    marginTop: 10,
  },
  description: {
    marginTop: 5,
  },
  servicesImg: {
    width: 200,
    height: 214.5,
    marginTop: 33,
  },
  typography1: {
    fontSize: 18,
    lineHeight: 22.4,
    fontWeight: 700,
    fontFamily: "poppins",
  },
  typography2: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: 900,
    fontFamily: "poppins",
  },
  typography3: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: 500,
    fontFamily: "poppins",
  },
  primaryFont: {
    color: Colors.primary,
  },
});
