import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { Location, Permissions } from 'expo';
import { GRANTED, PERMISSION_ERROR, ERROR, LOCATION, REGION_UPDATE_COMPLETE, POINT_DATA } from '../constants';

const BASE_URL = 'http://pequod.us-east-1.elasticbeanstalk.com';
const EARTH_RADIUS = 3959;

function* getLocation() {
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

function* updateRegion(action) {
  try {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = yield select(state => state.region);
    const distance = 2 * Math.max(latitudeDelta, longitudeDelta) * EARTH_RADIUS;
    const response = yield call(fetch, `${BASE_URL}/points?lat=${latitude}&lng=${longitude}&distance=${distance}&limit=500`);
    const points = yield call(response.json, null);
    yield put({ type: POINT_DATA, points });
  } catch (error) {
    console.error('failed point fetch', error);
  }
}

function* watchRegion() {
  yield takeLatest(REGION_UPDATE_COMPLETE, updateRegion);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    getLocation(),
    watchRegion(),
  ])
}
