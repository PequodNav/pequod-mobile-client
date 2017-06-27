import { delay } from 'redux-saga';
import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { api, location } from '../services';
import { points, error, setRegion, LOAD_REQUEST } from '../actions';
import { getRegion } from '../reducers/selectors';

/**
 * Get the users location and set the region based on it
 */
function* getLocation() {
  try {
    const userLocation = yield call(location.getLocation);
    yield put(setRegion({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }));
  } catch ({ errorMessage }) {
    yield put(error('Permission to access location was denied'));
  }
}

/**
 * fetch subroutine for getting points. can eventually be abstracted, probably.
 */
function* fetchPoints(apiArgs) {
  yield put(points.request());
  const { response, error } = yield call(api.fetchPointsWithin, apiArgs);
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
  const { latitude: lat, longitude: lon, latitudeDelta: latD, longitudeDelta: lonD } = yield select(getRegion);
  // build our coordinates area specifying what area we want points in. start at the
  // top left corner and work our way around making sure to end where we started to
  // close off the polygon.
  const left = lon - lonD / 2, right  = lon + lonD / 2;
  const top  = lat - latD / 2, bottom = lat + latD / 2;
  const coordinates = [
    [ [left, top], [right, top], [right, bottom], [left, bottom], [left, top]]
  ];
  yield call(fetchPoints, { coordinates });
}

/**
 * When the region update completes, fetch points for the current region
 */
function* watchLoadRequest() {
  yield takeLatest(LOAD_REQUEST, getPoints);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    getLocation(),
    watchLoadRequest(),
  ])
}
