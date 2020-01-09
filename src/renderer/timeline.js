import React from 'react';
import { Text, View, Link } from '@react-pdf/renderer';

import defaultRenderer from './default';

export default config => {
  const { styles, colors } = config;
  const circleSize = 20;
  const innerCircleSize = circleSize * 0.5;

  const smallParagraph = {
    ...styles.paragraph,
    color: colors.mid,
    fontSize: 9,
  };
  return defaultRenderer({ ...config, style: { paddingTop: '6pt' } }, ({ name, fromTo, location, website }) => (
    <View
      key={name}
      style={{
        paddingBottom: '3pt',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          paddingRight: '6pt',
          display: 'flex',
          display: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: circleSize,
            height: circleSize,
            border: `2pt solid ${colors.mid}`,
            borderRadius: circleSize,
            marginTop: -(circleSize * 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: innerCircleSize,
              height: innerCircleSize,
              backgroundColor: colors.mid,
              borderRadius: innerCircleSize,
            }}
          ></View>
        </View>
        <View
          style={{
            marginTop: -(circleSize / 2),
            paddingBottom: circleSize,
            flexGrow: 1,
            width: '2pt',
            backgroundColor: colors.mid,
          }}
        ></View>
      </View>
      <View
        style={{
          ...styles.hr,
          paddingBottom: '6pt',
          marginBottom: '6pt',
          borderColor: colors.mid,
        }}
      >
        <Text style={smallParagraph}>{fromTo}</Text>
        <Text
          style={{
            ...styles.paragraph,
            fontSize: 11,
            padding: '3pt 0',
          }}
        >
          {name}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={smallParagraph}>{website ? `${location}, ` : location}</Text>
          {website ? (
            <Link style={smallParagraph} href={website}>
              {website}
            </Link>
          ) : null}
        </View>
      </View>
    </View>
  ));
};
