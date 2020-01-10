import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';

import Default from './Default';

export const Tables = props => {
  const { styles } = props;
  return (
    <Default
      {...props}
      render={({ key, value }) => (
        <View
          key={key}
          style={{
            ...styles.hr,
            marginBottom: 5,
            paddingBottom: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.paragraph}>{key}</Text>
          <Text style={styles.paragraph}>{value}</Text>
        </View>
      )}
    />
  );
};

export const shape = PropTypes.shape({
  key: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

Tables.propTypes = {
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(shape), shape]).isRequired).isRequired,
};

export default Tables;
