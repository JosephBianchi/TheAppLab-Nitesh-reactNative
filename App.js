import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ImageBackground } from 'react-native';

import ListItem from './components/ListItem/ListItem';

export default class App extends React.Component {
  state = {
    restaurantsNearby: []
  }

  _keyExtractor = (item, index) => item.id;


  getLocation = () => {
    return new Promise( ( resolve, reject ) => {
        navigator.geolocation.getCurrentPosition( ( position ) => {

          let latitude  = position.coords.latitude;
          let longitude = position.coords.longitude;

          resolve( { latitude, longitude } );

        }, () => { reject( 'We could not get your location.' ); } );
      });
  };



  getRestaurantsNearby = () => {
    this.getLocation()
    .then ( (coordinates) => {
      return fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, {
        method: 'GET',
        headers: {
          'user-key': 'b940819ac7177d3e49e11839969394a8'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState( () => {
          return {restaurantsNearby: responseJson.nearby_restaurants}
        })
        console.log('x',this.state.restaurantsNearby);
      })
      .catch ( ( error ) => {
        console.error(error);
      })
    })
    .catch( (error ) => {
      console.error(error);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonNearMe}>
          <Button title="Restaurants Near Me" onPress={this.getRestaurantsNearby} />
        </View>
        <FlatList
          data={this.state.restaurantsNearby}
          renderItem={(info) => (
            <ListItem
              restaurantName={info.item.restaurant.name}
              placeImage={{uri: `${info.item.restaurant.featured_image}`}}
              aggregateRating={info.item.restaurant.user_rating.aggregate_rating}
            />
          )}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B0C4DE"
  },
  buttonNearMe: {
    margin: 25,
    backgroundColor: "#00FF00",
    borderRadius: 500,
    borderColor: "black",
    borderWidth: 3
  }

});
