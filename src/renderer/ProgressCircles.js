import React from 'react';
import PropTypes from 'prop-types';
import { View, Canvas } from '@react-pdf/renderer';

import DefaultRenderer from './Default';

export const ProgressCircles = props => {
  const {
    config: { colors },
  } = props;

  const size = 50;
  const lineWidth = 3;

  return (
    <DefaultRenderer
      {...props}
      row
      render={({ skill, proficiency, color }) => (
        <View
          key={proficiency}
          style={{
            paddingBottom: 6,
            marginRight: 6,
            position: 'relative',
          }}
        >
          <Canvas
            style={{
              width: size,
              height: size,
            }}
            paint={(paint, availableWidth, availableHeight) => {
              const radius = availableWidth / 2 - lineWidth;
              const circumference = radius * 2 * Math.PI;
              const offset = circumference - (proficiency / 100) * circumference;
              const centerX = availableWidth / 2;
              const centerY = availableWidth / 2;

              paint
                .fontSize(8)
                .fillColor(colors.mid)
                .text(skill, centerX - size / 4, centerY - 4)
                .stroke();

              paint
                .circle(centerX, centerY, radius)
                .lineWidth(lineWidth)
                .strokeColor(color || colors.dark)
                .stroke();

              paint
                .rotate(90, { origin: [centerX, centerY] })
                .circle(availableWidth / 2, availableHeight / 2, radius)
                .lineWidth(lineWidth + lineWidth * 0.01)
                .strokeColor(colors.light)
                .dash(offset, { space: size * 1000 })
                .stroke();
            }}
          ></Canvas>
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

ProgressCircles.propTypes = {
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(shape), shape]).isRequired).isRequired,
};

export default ProgressCircles;
