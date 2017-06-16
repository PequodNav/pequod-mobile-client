import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View} from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class App extends Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  state = {
    errorMessage: null,
    location: null,
    region: {
      latitude: null,
      longitude: null,
      latitudeDelta: null,
      longitudeDelta: null,
    },
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      location,
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    });
  };

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    if (!this.state.region.longitude && !this.state.region.latitude) {
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>{this.state.errorMessage || 'Loading...'}</Text>
        </View>
      );
    }

    return (
      <MapView
        style={{ flex: 1 }}
        region={this.state.region}
        onRegionChange={region => this.onRegionChange(region)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
