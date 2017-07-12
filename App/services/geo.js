import { getDistance } from 'geolib';

/**
 * Given a location, an array of points, and a radius, return an array of all
 * points that collide.
 * Location is an object containing latitude and longitude keys.
 * Points is an array of points containing latidue and longitude keys.
 * Radius is a number in meters.
 */
export const findCollisions = (location, points, radius) =>
  points.filter(point => getDistance(location, point) < radius);
