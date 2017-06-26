const API_ROOT = 'http://pequod.us-east-1.elasticbeanstalk.com/';

function callApi(endpoint) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    }).then(
      response => ({response}),
      error => ({error: error.message || 'Something bad happened'})
    );
}

// api services
export const fetchPoints = ({ latitude, longitude, distance, limit = 500 }) =>
  callApi(`points?lat=${latitude}&lng=${longitude}&distance=${distance}&limit=${limit}`);
