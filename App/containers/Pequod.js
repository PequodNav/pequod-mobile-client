import React from 'react';
import { connect } from 'react-redux';
import MapView from '../components/MapView';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { REGION_UPDATE, REGION_UPDATE_COMPLETE } from '../constants';

const Pequod = ({ dispatch, errorMessage, location, points, region }) => {
  if (errorMessage) {
    return <Error message={errorMessage} />;
  } else if (location) {
    return (
      <MapView
        points={points}
        region={region}
        onRegionChange={region => dispatch({ type: REGION_UPDATE, region })}
        onRegionChangeComplete={() => dispatch({ type: REGION_UPDATE_COMPLETE })}
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
