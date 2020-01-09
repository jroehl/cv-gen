import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import defaultRenderer from './default';

export default config => {
  const { styles, colors } = config;
  return defaultRenderer(config, ({ name, value }) => (
    <View key={name} style={{ paddingBottom: '6pt' }}>
      <Text style={styles.paragraph}>{name}</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '3pt',
          marginTop: '2pt',
        }}
      >
        <View
          style={{
            width: `${value}%`,
            height: '100%',
            backgroundColor: colors.dark,
          }}
        ></View>
        <View
          style={{
            flexGrow: 1,
            height: '100%',
            backgroundColor: colors.light,
          }}
        ></View>
      </View>
    </View>
  ));
};
