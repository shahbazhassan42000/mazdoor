// Native Imports
import { StyleSheet } from "react-native";
// Alias Imports
import { Text, View } from "@/components/Themed";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { LaborActionCreator } from "@/store/reducers";

const LaborCarousel = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(LaborActionCreator.fetchLabors());
  }, []);
  const labors = useAppSelector((state) => state.laborSlice.labors);
  return (
    <View style={styles.container}>
      <Text>Labors</Text>
      <Text>{labors[1]} abc</Text>
    </View>
  );
};
export default LaborCarousel;

const styles = StyleSheet.create({
  container: {
    paddingTop: 141,
    paddingBottom: 100,
  },
});
