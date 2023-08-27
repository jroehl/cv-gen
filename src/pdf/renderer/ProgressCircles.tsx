import ReactPDF, { Canvas, View } from '@react-pdf/renderer';

import snakeCase from 'lodash/snakeCase';
import { Config, ProgressCircleColumnItem } from '../../types';
import Default from './Default';

interface Props extends ProgressCircleColumnItem {
  styles: ReactPDF.Styles;
  config: Config;
}

export function ProgressCircles({ heading, type, values, reactPdfProps, config: { colors, printFriendly }, styles }: Props) {
  const size = 50;
  const lineWidth = 3;

  return (
    <Default heading={heading} reactPdfProps={reactPdfProps} flexDirection="row" styles={styles}>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', gap: 6 }}>
        {values.map(({ color, proficiency, skill }, i) => {
          return (
            <View
              key={proficiency}
              id={snakeCase(`${type} ${heading} ${i}`)}
              style={{
                paddingBottom: 6,
                position: 'relative',
              }}
            >
              <Canvas
                style={{
                  width: size,
                  height: size,
                }}
                paint={(painter, availableWidth, availableHeight) => {
                  const radius = availableWidth / 2 - lineWidth;
                  const circumference = radius * 2 * Math.PI;
                  const offset = circumference - (proficiency / 100) * circumference;
                  const centerX = availableWidth / 2;
                  const centerY = availableWidth / 2;

                  painter
                    .fontSize(8)
                    .fillColor(colors.mid)
                    .text(skill, centerX - size / 4, centerY - 4)
                    .stroke();

                  painter
                    .circle(centerX, centerY, radius)
                    .lineWidth(lineWidth)
                    .strokeColor(color || (printFriendly ? colors.mid : colors.dark))
                    .stroke();

                  painter
                    .rotate(90, { origin: [centerX, centerY] })
                    .circle(availableWidth / 2, availableHeight / 2, radius)
                    .lineWidth(lineWidth + lineWidth * 0.01)
                    .strokeColor(colors.light)
                    .dash(offset, { space: size * 1000 })
                    .stroke();

                  return null;
                }}
              />
            </View>
          );
        })}
      </View>
    </Default>
  );
}
