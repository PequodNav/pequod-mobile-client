import * as ActionTypes from '../actions';

const initialState = {
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
      return Object.assign({}, state, {
        points: action.points,
      });

    default:
      return state;
  }
}
