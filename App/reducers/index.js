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
    default:
      return state;
  }
}
