import React from 'react';
import { MapView } from 'expo';
import PointTooltip from './PointTooltip';

export default ({ points, region, onRegionChange }) => (
  <MapView
    style={{ flex: 1 }}
    region={region}
    onRegionChange={region => onRegionChange(region)}
    showsUserLocation={true}
    showsTraffic={false}
  >
    {points.map(point => (
      <MapView.Marker
        key={point._id}
        coordinate={{
          latitude: point.loc.coordinates[1],
          longitude: point.loc.coordinates[0]
        }}
      >
        <MapView.Callout tooltip={false}>
          <PointTooltip {...point} />
        </MapView.Callout>
      </MapView.Marker>
    ))}
  </MapView>
);
