import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';

import Default from './Default';

export const Cards = props => {
  const {
    styles,
    config: { colors },
  } = props;

  return (
    <Default
      {...props}
      render={({ heading, text, subHeading }) => {
        return (
          <View
            key={heading}
            style={{
              position: 'relative',
              backgroundColor: colors.lightest,
              borderRadius: 2,
              padding: 12,
              marginBottom: 12,
              width: '100%',
            }}
          >
            <Text
              style={{
                ...styles.subheading,
                paddingBottom: 3,
                fontSize: 10,
              }}
            >
              {heading}
            </Text>
            <Text
              style={{
                ...styles.paragraph,
                paddingBottom: 6,
                fontSize: 8,
              }}
            >
              {Array.isArray(subHeading) ? subHeading.join(', ') : subHeading}
            </Text>
            <Text
              style={{
                ...styles.paragraph,
                textAlign: 'justify',
              }}
            >
              {text}
            </Text>
          </View>
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
