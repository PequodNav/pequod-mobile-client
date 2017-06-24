import { ERROR, LOCATION } from '../constants';

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

    default:
      return state;
  }
}
