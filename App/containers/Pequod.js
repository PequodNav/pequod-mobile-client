import React from 'react';
import { connect } from 'react-redux';
import MapView from '../components/MapView';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { regionUpdate, regionUpdateComplete } from '../actions';

const Pequod = ({ dispatch, errorMessage, points, region }) => {
  if (errorMessage) {
    return <Error message={errorMessage} />;
  } else if (region && region.latitude && region.longitude) {
    return (
      <MapView
        points={points}
        region={region}
        onRegionChange={region => dispatch(regionUpdate(region))}
        onRegionChangeComplete={() => dispatch(regionUpdateComplete())}
      />
    );
  } else {
    return <Loading />
  }
};

// for now, we want it all!
const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(Pequod);
