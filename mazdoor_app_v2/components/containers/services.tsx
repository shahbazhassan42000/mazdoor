// Native Imports
import { StyleSheet, Image } from "react-native";
// 3rd Party Imports
import { useTranslation } from "react-i18next";
// Alias Imports
import Colors from "@/constants/Colors";
import { IMAGES } from "@/constants/images";
import { Text, View } from "@/components/Themed";

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
      <Image source={IMAGES.services_2} style={styles.service_2} />
      {/* Service 3 */}
      <Text style={[styles.typography2, styles.title]}>
        {t("free_of_cost")}
      </Text>
      <Text style={[styles.typography3, styles.description]}>
        {t("free_of_cost_desc_1")}
        {"\n"}
        {t("free_of_cost_desc_2")}
      </Text>
      <Image source={IMAGES.services_3} style={styles.servicesImg} />
      {/* Service 4 */}
      <Text style={[styles.typography2, styles.title]}>
        {t("best_quality")}
      </Text>
      <Text style={[styles.typography3, styles.description]}>
        {t("best_quality_desc_1")}
        {"\n"}
        {t("best_quality_desc_2")}
      </Text>
      <Image source={IMAGES.services_4} style={styles.service_4} />
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
    marginTop: 10,
    textAlign: "center",
  },
  description: {
    marginTop: 5,
    textAlign: "center",
  },
  service_2: {
    width: 118,
    height: 118,
    marginTop: 33,
  },
  service_4: {
    width: 152,
    height: 234,
    marginTop: 33,
    alignSelf: "flex-end",
    marginRight: 40,
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
