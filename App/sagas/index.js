import { call, put, all } from 'redux-saga/effects';
import { Location, Permissions } from 'expo';
import { GRANTED, PERMISSION_ERROR, ERROR, LOCATION } from '../constants';

export function* getLocationSaga() {
  const { status } = yield call(Permissions.askAsync, Permissions.LOCATION);
  if (status !== GRANTED) {
    yield put({ type: ERROR, message: PERMISSION_ERROR });
  }

  const location = yield call(Location.getCurrentPositionAsync, {});
  yield put({ type: LOCATION, location, region: {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }});
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    getLocationSaga(),
  ])
}
