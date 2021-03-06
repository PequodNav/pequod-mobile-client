import React from 'react';
import { Button } from 'react-native';

export default ({ handleLoad, pointsLoading, pointsLoadingError }) =>
  <Button
    onPress={handleLoad}
    title={pointsLoadingError || (pointsLoading ? 'Loading...' : 'Load Points')}
  />;
