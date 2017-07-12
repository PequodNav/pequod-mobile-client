import { Platform } from 'react-native';
import { Location, Permissions } from 'expo';

/** Minimum time to wait between each update in milliseconds */
const TIME_INTERVAL = 1000;
/** Receive updates only when the location has changed by at least this distance in meters. */
const DISTANCE_INTERVAL = 1;

/**
 * Async func resolves with the users location;
 */
export const getLocation = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    throw { errorMessage: 'Permission to access location was denied' };
  }
  if (Platform.OS === 'android' && !Constants.isDevice) {
    throw { errorMessage: 'This will not work on Sketch in an Android emulator. Try it on your device!' };
  }
  return await Location.getCurrentPositionAsync({});
}

export const watchLocation = (subscriberFunc) =>
  Location.watchPositionAsync({
    timeInterval: TIME_INTERVAL,
    distanceInterval: DISTANCE_INTERVAL,
  }, subscriberFunc);
