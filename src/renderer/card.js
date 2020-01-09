import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import defaultRenderer from './default';

export default config => {
  const { styles, colors } = config;

  const cardStyle = {
    backgroundColor: colors.lightest,
    borderRadius: '2pt',
    padding: '12pt',
    marginBottom: '12pt',
    position: 'relative',
    width: '100%',
  };

  return defaultRenderer(config, ({ name, value, techs }) => {
    return (
      <View key={value} style={cardStyle}>
        <Text
          style={{
            ...styles.subheading,
            paddingBottom: '3pt',
            fontSize: 10,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            ...styles.paragraph,
            paddingBottom: '6pt',
            fontSize: 8,
          }}
        >
          {Array.isArray(techs) ? techs.join(', ') : techs}
        </Text>
        <Text
          style={{
            ...styles.paragraph,
            textAlign: 'justify',
          }}
        >
          {value}
        </Text>
      </View>
    );
  });
};
