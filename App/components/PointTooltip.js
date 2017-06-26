import React from 'react';
import { View, Text } from 'react-native';

export default ({ aidName, source, summary, type, characteristic, height, range, structure, lightListNumber }) =>
  <View>
    <Text>{aidName}</Text>
    {source ? <Text>{`source: ${source}`}</Text> : null}
    {summary ? <Text>{`summary: ${summary}`}</Text> : null}
    {type ? <Text>{`type: ${type}`}</Text> : null}
    {characteristic ? <Text>{`characteristic: ${characteristic}`}</Text> : null}
    {height ? <Text>{`height: ${height}`}</Text> : null}
    {range ? <Text>{`range: ${range}`}</Text> : null}
    {structure ? <Text>{`structure: ${structure}`}</Text> : null}
    {lightListNumber ? <Text>{`lightListNumber: ${lightListNumber}`}</Text> : null}
  </View>;
