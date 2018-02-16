import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const listItem = (props) => (
  <View style={styles.listItem}>
    <Text>{props.restaurantName}</Text>
    <Image
      resizeMode="cover"
      source={props.placeImage}
      style={styles.placeImage}
    />
    <Text style={styles.rating}>Rating: {props.aggregateRating}</Text>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#20B2AA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#6495ED"
  },
  placeImage: {
      marginLeft: 15,
      marginRight: 15,
      height: 30,
      width: 30
  },
  rating: {
    color: "#DAA520"
  }
});

export default listItem;
