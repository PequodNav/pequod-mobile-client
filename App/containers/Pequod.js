import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import MapView from '../components/MapView';
import Error from '../components/Error';
import Loading from '../components/Loading';
import LoadPoints from '../components/LoadPoints';
import { regionUpdate, loadRequest } from '../actions';

const Pequod = ({ dispatch, errorMessage, points, pointsLoading, region }) => {
  if (errorMessage) {
    return <Error message={errorMessage} />;
  } else if (!region || !region.latitude || !region.longitude) {
    return <Loading />
  } else {
    return (
      <View style={styles.container}>
        <MapView
          points={points}
          region={region}
          onRegionChange={region => dispatch(regionUpdate(region))}
        />
        <LoadPoints
          handleLoad={() => dispatch(loadRequest())}
          pointsLoading={pointsLoading}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// for now, we want it all!
const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(Pequod);
