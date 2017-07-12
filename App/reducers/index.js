import * as ActionTypes from '../actions';

const initialState = {
  errorMessage: null,
  location: null,

  pointsLoading: false,
  points: [],
  pointsCache: {},
  pointsLoadingErrorMessage: '',

  location: {},
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
        location: action.location,
      });

    case ActionTypes.REGION_UPDATE:
      return Object.assign({}, state, {
        region: action.region,
      });

    case ActionTypes.LOCATION_UPDATE:
      return Object.assign({}, state, {
        location: Object.assign({}, state.location, action.location),
      });

    case ActionTypes.POINTS.REQUEST:
      return Object.assign({}, state, {
        pointsLoading: true,
        pointsLoadingErrorMessage: '',
      });

    case ActionTypes.POINTS.SUCCESS:
      if (action.points && action.points.length) {
        const newPointsCache = Object.assign({}, state.pointsCache);
        action.points.forEach(point => {
          newPointsCache[point._id] = point;
        });
        return Object.assign({}, state, {
          pointsCache: newPointsCache,
          points: Object.keys(newPointsCache).map(pointId => newPointsCache[pointId]),
          pointsLoading: false,
          pointsLoadingErrorMessage: '',
        });
      }
      return state;

    case ActionTypes.POINTS.FAILURE:
      return Object.assign({}, state, {
        pointsLoading: false,
        pointsLoadingErrorMessage: typeof action.error === 'string' ? action.error : 'Failed loading points',
      });

    case ActionTypes.CLEAR_POINTS:
      return Object.assign({}, state, {
        pointsCache: {},
        points: [],
        pointsLoading: false,
        pointsLoadingErrorMessage: '',
      });

    default:
      return state;
  }
}
