import React from 'react';
import { Button } from 'react-native';

export default ({ handleClear }) =>
  <Button
    onPress={handleClear}
    title="Clear Points"
  />;
