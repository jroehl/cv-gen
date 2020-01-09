import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import defaultRenderer from './default';

export default config => {
  const { styles } = config;
  return defaultRenderer(config, ({ value }) => (
    <View key={value} style={{ paddingBottom: '6pt' }}>
      <Text
        style={{
          ...styles.paragraph,
          textAlign: 'justify',
        }}
      >
        {Array.isArray(value) ? value.join(', ') : value}
      </Text>
    </View>
  ));
};
