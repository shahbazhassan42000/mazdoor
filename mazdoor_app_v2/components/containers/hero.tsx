// Native Imports
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
// Alias Imports
import { IMAGES } from "@/constants/images";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Image style={styles.main_image} source={IMAGES.mazdoor_full_name} />
      <Text style={styles.typography3}>
        {t("hero_1")}
        {"\n"}
        {t("hero_2")}
        {"\n"}
        {t("hero_3")}
      </Text>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  container: {
    marginVertical: 100,
  },
  main_image: {
    width: 251,
    height: 48,
    marginTop: 60,
    alignSelf: "center",
    marginBottom: 53,
  },
  typography3: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 30,
    fontWeight: 500,
    fontFamily: "poppins",
  },
});
