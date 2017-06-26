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
        description={point.source.indexOf('weekly') > -1 ?
          `c:${point.characteristic}, h:${point.height}, rng:${point.range}, s:${point.structure}, rmx:${point.remarks}` :
          `${point.summary} (${point.type}, ${point.source})`
        }
      />
    ))}
  </MapView>
);
