import React from 'react';
import { Text, View } from '@react-pdf/renderer';

const DefaultRenderer = ({ heading, type, values, row, styles, render, reactPdfProps = {}, ...rest }) => {
  return (
    <View
      wrap={false}
      {...reactPdfProps}
      key={heading}
      style={{
        padding: '14 30 0 24',
      }}
    >
      <Text style={styles.heading}>{heading}</Text>
      <View
        style={{
          flexDirection: row ? 'row' : 'column',
          display: 'flex',
          flexWrap: 'wrap',
          paddingLeft: 12,
        }}
      >
        {values.map((b, i) => {
          const isArray = Array.isArray(b);
          const blocks = isArray ? b : [b];
          const key = `block_${i}_${heading.replace(/ /g, '').toLowerCase()}`;
          return (
            <View key={key} style={{ paddingBottom: isArray ? 12 : 0 }}>
              {blocks.map(block => render({ styles, ...block, ...rest }))}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default DefaultRenderer;
