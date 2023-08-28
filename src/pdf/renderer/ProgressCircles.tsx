import { Canvas, View } from '@react-pdf/renderer';

import { Bookmark } from '@react-pdf/types/bookmark';
import { ProgressCircleRendererProps } from '../../types';
import Default from './Default';
import { buildId } from './utils';

export function ProgressCircles({ title, values, reactPdfProps, config: { colors, printFriendly }, styles, index, alignment }: ProgressCircleRendererProps) {
  const size = 50;
  const lineWidth = 3;

  return (
    <Default title={title} reactPdfProps={reactPdfProps} flexDirection="row" styles={styles}>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', gap: 6 }}>
        {values.map(({ color, proficiency, skill }, i) => {
          const bookmark = {
            bookmark: {
              title: skill,
            } as Bookmark,
          };
          return (
            <View
              {...bookmark}
              key={proficiency}
              id={buildId({ blockIndex: index, itemIndex: i, alignment })}
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
