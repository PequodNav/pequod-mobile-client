const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const POINTS = createRequestTypes('POINTS');

export const ERROR = 'ERROR';
export const SET_REGION = 'SET_REGION';
export const REGION_UPDATE = 'REGION_UPDATE';
export const LOCATION_UPDATE = 'LOCATION_UPDATE';
export const LOAD_REQUEST = 'LOAD_REQUEST';
export const CLEAR_POINTS = 'CLEAR_POINTS';

function action(type, payload = {}) {
  return { type, ...payload };
}

export const points = {
  request: () => action(POINTS[REQUEST]),
  success: points => action(POINTS[SUCCESS], { points }),
  failure: error => action(POINTS[FAILURE], { error }),
}

export const error = message => action(ERROR, { message });
export const setRegion = (location, region) => action(SET_REGION, { location, region });
export const regionUpdate = region => action(REGION_UPDATE, { region });
export const locationUpdate = location => action(LOCATION_UPDATE, { location });
export const loadRequest = () => action(LOAD_REQUEST);
export const clearPoints = () => action(CLEAR_POINTS);
