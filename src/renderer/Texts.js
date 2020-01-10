import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';

import DefaultRenderer from './Default';

const Texts = props => {
  const { styles } = props;
  return (
    <DefaultRenderer
      {...props}
      render={({ value }) => (
        <View key={value} style={{ paddingBottom: 6 }}>
          <Text
            style={{
              ...styles.paragraph,
              textAlign: 'justify',
            }}
          >
            {Array.isArray(value) ? value.join(', ') : value}
          </Text>
        </View>
      )}
    />
  );
};

export const shape = PropTypes.shape({
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
});

Texts.propTypes = {
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(shape), shape]).isRequired).isRequired,
};

export default Texts;
