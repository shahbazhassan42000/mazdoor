// Native Imports
import React, { FC } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
// Alias Imports
import Colors from "@/constants/Colors";
import { Labor } from "@/models/interfaces";

interface LaborCardProps {
  labor: Labor;
  onPress?: () => void;
}

const LaborCardSquare: FC<LaborCardProps> = ({ labor, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.top}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: labor.image }} style={styles.image} />
        </View>
      </View>
      <View style={styles.middle}>
        <Text numberOfLines={1} style={styles.name}>
          {labor.name}
        </Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.ratingHeader}>
          <Text style={styles.label}>Rating</Text>
          <Text style={styles.label}>{labor.rating}%</Text>
        </View>
        <View style={styles.ratingBar}>
          <View style={[styles.ratingFill, { width: `${labor.rating}%` }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LaborCardSquare;

const styles = StyleSheet.create({
  card: {
    width: 189,
    height: 215,
    padding: 15,
    marginRight: 10,
    borderRadius: 20,
    marginBottom: 10,
    justifyContent: "space-between",
    backgroundColor: Colors.background,
  },
  top: {
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    width: 85,
    height: 85,
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 42.5,
    borderColor: Colors.primary,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 42.5,
  },
  middle: {
    height: "25%",
    justifyContent: "center",
  },
  name: {
    color: Colors.textGray,
    fontSize: 19,
    textAlign: "center",
    fontWeight: "bold",
  },
  bottom: {
    height: "15%",
    justifyContent: "center",
  },
  ratingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: "#7E7E7E",
    fontSize: 10,
    fontWeight: "600",
  },
  ratingBar: {
    width: "100%",
    height: 6.65,
    marginTop: 4,
    borderRadius: 100,
    backgroundColor: Colors.white,
  },
  ratingFill: {
    height: 6.65,
    borderRadius: 100,
    backgroundColor: Colors.primary,
  },
});
