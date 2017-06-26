import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { Location, Permissions } from 'expo';
import { api } from '../services';
import { points, error, setRegion, REGION_UPDATE_COMPLETE } from '../actions';
import { getRegion } from '../reducers/selectors';

const EARTH_RADIUS = 3959;

/**
 * Get the users location and set the region based on it
 */
function* getLocation() {
  const { status } = yield call(Permissions.askAsync, Permissions.LOCATION);
  if (status !== 'granted') {
    yield put(error('Permission to access location was denied'));
  }

  const userLocation = yield call(Location.getCurrentPositionAsync, {});
  yield put(setRegion({
    latitude: userLocation.coords.latitude,
    longitude: userLocation.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }));
}

/**
 * fetch subroutine for getting points. can eventually be abstracted, probably.
 */
function* fetchPoints(apiArgs) {
  yield put(points.request());
  const { response, error } = yield call(api.fetchPoints, apiArgs);
  if (response) {
    yield put(points.success(response));
  } else {
    yield put(points.failure(error));
  }
}

/**
 * function generator for getting points
 */
function* getPoints(action) {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = yield select(getRegion);
  const distance = 2 * Math.max(latitudeDelta, longitudeDelta) * EARTH_RADIUS;
  yield call(fetchPoints, { latitude, longitude, distance });
}

/**
 * When the region update completes, fetch points for the current region
 */
function* watchRegion() {
  yield takeLatest(REGION_UPDATE_COMPLETE, getPoints);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    getLocation(),
    watchRegion(),
  ])
}
