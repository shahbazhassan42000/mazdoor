// Native Imports
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
// Alias Imports
import Colors from "@/constants/Colors";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.bottom}>
        <Text style={styles.typography3}>{t("footer_text")}</Text>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: Colors.peachLight2,
    alignItems: "center",
  },
  typography1: {
    fontSize: 20,
    lineHeight: 22.4,
    fontWeight: "700",
    fontFamily: "poppins",
  },
  typography3: {
    fontSize: 11,
    lineHeight: 22.4,
    fontWeight: "900",
    fontFamily: "poppins",
  },
});
