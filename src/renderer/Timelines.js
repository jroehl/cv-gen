import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Link } from '@react-pdf/renderer';

import DefaultRenderer from './Default';

const TimelineItem = ({ circleSize = 20, colors }) => {
  const innerCircleSize = circleSize * 0.5;
  return (
    <View
      style={{
        paddingRight: 6,
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
          border: `2 solid ${colors.mid}`,
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
          width: 2,
          backgroundColor: colors.mid,
        }}
      ></View>
    </View>
  );
};

export const Timelines = props => {
  const {
    styles,
    config: { colors },
  } = props;

  const smallParagraph = {
    ...styles.paragraph,
    color: colors.mid,
    fontSize: 9,
  };

  return (
    <DefaultRenderer
      {...props}
      render={({ heading, fromTo, location, website }) => (
        <View
          key={heading}
          style={{
            paddingBottom: 3,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <TimelineItem colors={colors} />
          <View
            style={{
              ...styles.hr,
              paddingBottom: 6,
              marginBottom: 6,
              borderColor: colors.mid,
            }}
          >
            <Text style={smallParagraph}>{fromTo}</Text>
            <Text
              style={{
                ...styles.paragraph,
                fontSize: 11,
                padding: '3 0',
              }}
            >
              {heading}
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
      )}
    />
  );
};

export const shape = PropTypes.shape({
  heading: PropTypes.string.isRequired,
  fromTo: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  website: PropTypes.string,
});

Timelines.propTypes = {
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(shape), shape]).isRequired).isRequired,
};

export default Timelines;
