import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Constants } from 'expo';

const Error = ({ message }) =>
  <View style={styles.container}>
    <Text style={styles.paragraph}>{message}</Text>
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Error;
