// Native Imports
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
// Alias Imports
import Colors from "@/constants/Colors";
import { IMAGES } from "@/constants/images";

const AboutUs = () => {
  const { t } = useTranslation();
  //
  return (
    <View style={styles.container}>
      <Text style={[styles.typography1, styles.primaryFont]}>
        {t("about_us")}
      </Text>
      <Text style={styles.typography2}>
        {t("know_about")}
        {"\n"}
        {t("mazdoor")}
      </Text>
      <Text style={styles.typography3}>
        {t("about_us_1")}
        {"\n"}
        {t("about_us_2")}
        {"\n"}
        {t("about_us_3")}
      </Text>
      <Image source={IMAGES.about_us} style={styles.img} />
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 30,
    marginTop: 50,
    borderRadius: 30,
    backgroundColor: Colors.peachLight,
    marginHorizontal: 20,
  },
  typography1: {
    fontSize: 18,
    lineHeight: 22.4,
    fontWeight: 700,
    fontFamily: "poppins",
  },
  typography2: {
    fontSize: 22,
    textAlign: "center",
    lineHeight: 32,
    fontWeight: 900,
    fontFamily: "poppins",
  },
  typography3: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 30,
    fontWeight: 500,
    fontFamily: "poppins",
  },
  primaryFont: {
    color: Colors.primary,
    textAlign: "center",
  },
  img: {
    width: 296,
    height: 334,
    marginTop: 33,
    transform: [{ scaleX: -1 }],
    alignSelf: "flex-end",
  },
});
