import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import defaultRenderer from './default';

export default config => {
  const { styles } = config;
  return defaultRenderer(config, ({ name, value }) => (
    <View
      key={name}
      style={{
        ...styles.hr,
        marginBottom: '5pt',
        paddingBottom: '1pt',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text style={styles.paragraph}>{name}</Text>
      <Text style={styles.paragraph}>{value}</Text>
    </View>
  ));
};
