import { Link, Text, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import React from 'react';

import Default from './Default';

const TimelineItem = ({ circleSize = 20, colors, printFriendly }) => {
  const innerCircleSize = circleSize * 0.5;
  return (
    <View
      style={{
        paddingRight: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: circleSize,
          height: circleSize,
          border: `${printFriendly ? '1pt' : '2pt'} solid ${colors.mid}`,
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
            backgroundColor: printFriendly ? '#FFF' : colors.mid,
            border: printFriendly ? `1pt solid ${colors.mid}` : 'none',
            borderRadius: innerCircleSize,
          }}
        ></View>
      </View>
      <View
        style={{
          marginTop: -(circleSize / 2),
          paddingBottom: circleSize,
          flexGrow: 1,
          width: printFriendly ? 1 : 2,
          backgroundColor: colors.mid,
        }}
      ></View>
    </View>
  );
};

export const Timelines = props => {
  const {
    styles,
    config: { colors, printFriendly },
  } = props;

  const smallParagraph = {
    ...styles.paragraph,
    color: colors.mid,
    fontSize: 9,
  };

  return (
    <Default
      {...props}
      render={({ heading, fromTo, type, location, website, linkTo }, i) => (
        <View
          key={heading}
          id={`timeline_${props.heading.toLowerCase()}_${i}`}
          style={{
            paddingBottom: 3,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <TimelineItem colors={colors} printFriendly={printFriendly} />
          <View
            style={{
              ...styles.hr,
              paddingBottom: 6,
              marginBottom: 6,
              borderColor: colors.mid,
            }}
          >
            <Text style={smallParagraph}>{fromTo}</Text>
            <Link href={`#${linkTo}`}>
              <Text
                style={{
                  ...styles.paragraph,
                  fontSize: 11,
                  padding: '3 0',
                }}
              >
                {heading}
              </Text>
            </Link>
            {type && <Text style={smallParagraph}>{type}</Text>}
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
