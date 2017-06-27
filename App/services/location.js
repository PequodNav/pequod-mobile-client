import { Location, Permissions } from 'expo';

export const getLocation = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    throw { errorMessage: 'Permission to access location was denied' };
  }
  return await Location.getCurrentPositionAsync({});
}
