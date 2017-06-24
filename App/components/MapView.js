import React from 'react';
import { MapView } from 'expo';

export default ({ points, region, onRegionChange, onRegionChangeComplete }) => (
  <MapView
    style={{ flex: 1 }}
    region={region}
    onRegionChange={region => onRegionChange(region)}
    onRegionChangeComplete={() => onRegionChangeComplete()}
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
        title={point.aidName}
        description={`${point.summary} (${point.type}, ${point.lnmSource})`}
      />
    ))}
  </MapView>
);
