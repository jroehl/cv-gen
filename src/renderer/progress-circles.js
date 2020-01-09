import React from 'react';
import { View, Canvas } from '@react-pdf/renderer';

import defaultRenderer from './default';

export default config => {
  const { colors } = config;

  const size = 50;
  const lineWidth = 3;

  return defaultRenderer({ ...config, row: true }, ({ value, color, name }) => (
    <View
      key={value}
      style={{
        paddingBottom: '6pt',
        marginRight: '6pt',
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
          const offset = circumference - (value / 100) * circumference;
          const centerX = availableWidth / 2;
          const centerY = availableWidth / 2;

          paint
            .fontSize(8)
            .fillColor(colors.mid)
            .text(name, centerX - size / 4, centerY - 4)
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
  ));
};
