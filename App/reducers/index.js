import * as ActionTypes from '../actions';

const initialState = {
  errorMessage: null,
  location: null,
  points: [],
  pointsCache: {},
  region: {
    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null,
  },
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ERROR:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });

    case ActionTypes.SET_REGION:
      return Object.assign({}, state, {
        region: action.region,
      });

    case ActionTypes.REGION_UPDATE:
      return Object.assign({}, state, {
        region: action.region,
      });

    case ActionTypes.POINTS.SUCCESS:
      const newPointsCache = Object.assign({}, state.pointsCache);
      action.points.forEach(point => {
        newPointsCache[point._id] = point;
      });
      return Object.assign({}, state, {
        pointsCache: newPointsCache,
        points: Object.keys(newPointsCache).map(pointId => newPointsCache[pointId]),
      });

    default:
      return state;
  }
}
