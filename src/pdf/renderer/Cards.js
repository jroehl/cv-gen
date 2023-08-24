import { Text, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import React from 'react';

import Default from './Default';

function snakeCase(str) {
  return str.toLowerCase().replace(/ /g, '-').replace(/-+/g, '-');
}

export const Cards = (props) => {
  const {
    styles,
    config: { colors, printFriendly },
  } = props;

  return (
    <Default
      {...props}
      render={({ heading, text, subHeading, duration }, i) => {
        return (
          <View
            key={heading}
            id={`cards_${snakeCase(props.heading)}_${i}`}
            style={{
              position: 'relative',
              backgroundColor: colors.lightest,
              border: printFriendly ? `1pt solid ${colors.light}` : 'none',
              borderRadius: 2,
              padding: 12,
              marginBottom: 12,
              width: '100%',
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  ...styles.subheading,
                  paddingBottom: 3,
                  fontSize: 10,
                }}
              >
                {heading}
              </Text>
              {duration && <Text style={{
                ...styles.paragraph,
                paddingLeft: 6,
                color: colors.mid,
                fontSize: 6,
              }}>({duration})</Text>}
            </View>
            <Text
              style={{
                ...styles.paragraph,
                paddingBottom: 6,
                fontSize: 8,
              }}
            >
              {Array.isArray(subHeading) ? subHeading.sort().join(', ') : subHeading}
            </Text>
            <Text
              style={{
                ...styles.paragraph,
                textAlign: 'justify',
              }}
            >
              {text}
            </Text>
          </View >
        );
      }}
    />
  );
};

export const shape = PropTypes.shape({
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  text: PropTypes.string.isRequired,
});

Cards.propTypes = {
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(shape), shape]).isRequired).isRequired,
};

export default Cards;
