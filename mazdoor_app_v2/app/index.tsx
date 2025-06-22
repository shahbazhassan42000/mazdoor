// Native Imports
import { ScrollView, StyleSheet } from "react-native";
// Alias Imports
import Colors from "@/constants/Colors";
import { Home, Services, LaborCarousel, TeamCarousel } from "@/components/containers";

const Index = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Home />
      <Services />
      <LaborCarousel />
      <TeamCarousel />
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    textAlign: "left",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});
