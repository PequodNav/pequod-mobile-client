import { ERROR, LOCATION, REGION_UPDATE, POINT_DATA } from '../constants';

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
    case ERROR:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });

    case LOCATION:
      return Object.assign({}, state, {
        location: action.location,
        region: action.region,
      });

    case REGION_UPDATE:
      return Object.assign({}, state, {
        region: action.region,
      });

    case POINT_DATA:
      return Object.assign({}, state, {
        points: action.points,
      });

    default:
      return state;
  }
}
