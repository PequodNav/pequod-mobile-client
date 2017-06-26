import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import MapView from '../components/MapView';
import Error from '../components/Error';
import Loading from '../components/Loading';
import ClearPoints from '../components/ClearPoints';
import LoadPoints from '../components/LoadPoints';
import { regionUpdate, loadRequest, clearPoints } from '../actions';

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
        <View style={styles.buttonContainer}>
          <LoadPoints
            handleLoad={() => dispatch(loadRequest())}
            pointsLoading={pointsLoading}
          />
          <ClearPoints
            handleClear={() => dispatch(clearPoints())}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 10,
    left: 10,
    right: 10,
    justifyContent: 'space-between',
  },
});

// for now, we want it all!
const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(Pequod);
