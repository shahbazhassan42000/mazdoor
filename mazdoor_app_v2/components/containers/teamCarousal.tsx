// Native Imports
import { StyleSheet, View, Text } from "react-native";
// 3rd Party Imports
import PagerView from "react-native-pager-view";
import { useTranslation } from "react-i18next";
// Alias Imports
import Colors from "@/constants/Colors";
import { useEffect } from "react";
import { LaborActionCreator } from "@/store/reducers";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { TeamCard } from "@/components/molecules";

const TeamCarousel = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(LaborActionCreator.fetchTeam());
  }, []);
  const team = useAppSelector((state) => state.laborSlice.team);

  if (!team || !team.length) return <></>;

  return (
    <View style={styles.container}>
      <Text
        style={[styles.typography1, styles.primaryFont, styles.serviceTitle]}
      >
        {t("our_team")}
      </Text>
      <Text style={[styles.typography2, styles.title]}>
        {t("meet_our_team")}
      </Text>
      <PagerView style={styles.carousal} initialPage={0}>
        {team.map((admin, index) => (
          <View style={styles.page} key={index}>
            <TeamCard member={admin} />
          </View>
        ))}
      </PagerView>
    </View>
  );
};
export default TeamCarousel;

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
