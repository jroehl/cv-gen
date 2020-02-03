import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';

import Default from './Default';

export const ProgressBars = props => {
  const {
    styles,
    config: { colors, printFriendly },
  } = props;

  return (
    <Default
      {...props}
      render={({ skill, proficiency, color }) => (
        <View key={skill} style={{ paddingBottom: 6 }}>
          <Text style={styles.paragraph}>{skill}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: 3,
              marginTop: 2,
            }}
          >
            <View
              style={{
                width: `${proficiency}%`,
                height: '100%',
                backgroundColor: color || (printFriendly ? colors.mid : colors.dark),
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
      )}
    />
  );
};

export const shape = PropTypes.shape({
  proficiency: PropTypes.number.isRequired,
  skill: PropTypes.string.isRequired,
  color: PropTypes.string,
});

ProgressBars.propTypes = {
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(shape), shape]).isRequired).isRequired,
};

export default ProgressBars;
