// Native Imports
import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";
// 3rd Party Imports
import { useTranslation } from "react-i18next";
// Alias Imports
import Colors from "@/constants/Colors";
import { IMAGES } from "@/constants/images";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Mazdoor Full Name Image */}
      <Image style={styles.main_image} source={IMAGES.mazdoor_full_name} />
      {/* Main Text */}
      <View style={styles.textContainer}>
        <Text style={styles.typography1}>
          {t("be_the_fastest")}
          {"\n"}
          {t("in_getting")}
          {"\n"}
          {t("mazdoor_at")}
        </Text>
        <View style={styles.doorstepWrapper}>
          <Text style={[styles.primaryFont, styles.typography1]}>
            {t("doorstep")}
          </Text>
          <View style={styles.circle} />
        </View>
        {/* Login/Signup Button */}
        <TouchableOpacity
          style={[styles.primaryButton, styles.signinBtn]}
          onPress={() => console.log("Login/Signup Pressed")}
        >
          <Text style={[styles.typography2, styles.whiteFont]}>
            Find Mazdoor
          </Text>
        </TouchableOpacity>
        <Image source={IMAGES.labor1} style={styles.labor1} />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  labor1: {
    position: "absolute",
    right: 0,
    zIndex: 1,
    top: 100,
  },
  textContainer: {
    marginLeft: 31,
    position: "relative",
    zIndex: 2,
  },
  signinBtn: {
    marginTop: 22,
    zIndex: 2,
  },
  primaryButton: {
    display: "flex",
    alignSelf: "flex-start",
    borderRadius: 50,
    paddingVertical: 14,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
  },
  circle: {
    top: 7,
    left: 10,
    width: 10,
    height: 10,
    position: "absolute",
    borderRadius: 50,
    backgroundColor: Colors.secondary,
  },
  doorstepWrapper: {
    position: "relative",
  },
  typography1: {
    zIndex: 2,
    fontSize: 33,
    lineHeight: 48,
    fontWeight: 700,
    fontFamily: "poppins",
  },
  typography2: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 22.4,
    fontFamily: "poppins",
  },
  primaryFont: {
    color: Colors.primary,
  },
  whiteFont: {
    color: Colors.white,
  },
  main_image: {
    width: "80%",
    height: 52,
    marginTop: 60,
    alignSelf: "center",
    marginBottom: 53,
  },
});
