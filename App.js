import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View} from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

const BASE_URL = 'http://pequod.us-east-1.elasticbeanstalk.com';
const EARTH_RADIUS = 3959;

const PLATFORM_ERROR = 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!';
const PERMISSION_ERROR = 'Permission to access location was denied';

export default class App extends Component {
  pointCache = {};
  state = {
    errorMessage: null,
    location: null,
    points: [],
    region: {
      latitude: null,
      longitude: null,
      latitudeDelta: null,
      longitudeDelta: null,
    },
  };

  /** When we mount, get location unless we're simulating android */
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({ errorMessage: PLATFORM_ERROR });
    } else {
      this._getLocationAsync();
    }
  }

  /** set the location and region from the user's location */
  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ errorMessage: PERMISSION_ERROR });
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

  /** fetch points based on the current region */
  _getPointsAsync = async () => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.region;
    const distance = 2 * Math.max(latitudeDelta, longitudeDelta) * EARTH_RADIUS;
    const response = await fetch(`${BASE_URL}/points?lat=${latitude}&lng=${longitude}&distance=${distance}&limit=500`);
    const points = await response.json();
    this._addPoints(points || []);
  }

  /** add new points to our cache and then the map */
  _addPoints(points = []) {
    points.forEach(point => {
      this.pointCache[point._id] = point;
    });
    this.setState({
      points: Object.keys(this.pointCache).map(pointID => this.pointCache[pointID]),
    });
  }

  /** control the region in state */
  onRegionChange(region) {
    this.setState({ region });
  }

  /** when the region changed, fetch new points */
  onRegionChangeComplete() {
    if (this.state.location) {
      this._getPointsAsync();
    }
  }

  render() {
    if (!this.state.location) {
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
        onRegionChangeComplete={() => this.onRegionChangeComplete()}
        showsUserLocation={true}
        showsTraffic={false}
      >
        {this.state.points.map(point => (
          <MapView.Marker
            key={point._id}
            coordinate={{
              latitude: point.loc.coordinates[1],
              longitude: point.loc.coordinates[0]
            }}
            title={point.aidName}
            description={`${point.summary} (${point.type}, ${point.lnmSource})`}
          />
        ))}
      </MapView>
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
