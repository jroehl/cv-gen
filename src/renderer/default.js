import React from 'react';
import { Text, View } from '@react-pdf/renderer';
export default ({ name, styles, values, props = {}, row, style = {} }, render) => {
  return (
    <View
      {...props}
      wrap={false}
      key={name}
      style={{
        paddingTop: '14pt',
      }}
    >
      <Text style={styles.heading}>{name}</Text>
      <View
        style={{
          ...style,
          display: 'flex',
          flexDirection: row ? 'row' : 'column',
          paddingLeft: '12pt',
          flexWrap: 'wrap',
        }}
      >
        {values.map((blocks, i) => {
          if (!Array.isArray(blocks)) return render(blocks);
          return (
            <View
              key={`block_${i}_${name}`}
              style={{
                paddingBottom: '12pt',
              }}
            >
              {blocks.map(render)}
            </View>
          );
        })}
      </View>
    </View>
  );
};
