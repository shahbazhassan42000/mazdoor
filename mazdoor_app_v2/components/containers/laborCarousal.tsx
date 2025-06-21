// Native Imports
import { StyleSheet, View, Text } from "react-native";
// 3rd Party Imports
import PagerView from "react-native-pager-view";
import { useTranslation } from "react-i18next";
// Alias Imports
import Colors from "@/constants/Colors";
import { useEffect } from "react";
import { LaborCardSquare } from "@/components/molecules";
import { LaborActionCreator } from "@/store/reducers";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";

const LaborCarousel = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(LaborActionCreator.fetchLabors());
  }, []);
  const labors = useAppSelector((state) => state.laborSlice.labors);

  if (!labors || !labors.length) return <></>;

  return (
    <View style={styles.container}>
      <Text
        style={[styles.typography1, styles.primaryFont, styles.serviceTitle]}
      >
        {t("mazdoors")}
      </Text>
      <Text style={[styles.typography2, styles.title]}>
        {t("labor_that_is_always")}
        {"\n"}
        {t("available_for_you")}
      </Text>
      <PagerView style={styles.carousal} initialPage={0}>
        {labors.map((labor, index) => (
          <View style={styles.page} key={index}>
            <LaborCardSquare
              labor={labor}
              onPress={() => {
                console.log("Labor pressed: ", labor.name);
              }}
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};
export default LaborCarousel;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
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
  title: {
    marginTop: 10,
    textAlign: "center",
  },
  carousal: {
    padding: 110,
    marginTop: 20,
  },
  page: {
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTitle: {
    textAlign: "center",
  },
  primaryFont: {
    color: Colors.primary,
  },
});
