import { Text, View } from '@react-pdf/renderer';

import { Bookmark } from '@react-pdf/types/bookmark';
import snakeCase from 'lodash/snakeCase';
import { ProgressBarRendererProps } from '../../types';
import Default from './Default';

export function ProgressBars({ title, reactPdfProps, values, type, styles, config: { colors, printFriendly } }: ProgressBarRendererProps) {
  return (
    <Default title={title} reactPdfProps={reactPdfProps} styles={styles}>
      {values.map((valueSet) => {
        return (
          <View key={JSON.stringify(valueSet)} style={{ paddingBottom: 12, width: '100%' }}>
            {valueSet.map(({ color, proficiency, skill }, i) => {
              const bookmark = {
                bookmark: {
                  title: skill,
                } as Bookmark,
              };
              return (
                <View {...bookmark} key={skill} style={{ paddingBottom: 6 }} id={snakeCase(`${type} ${title} ${i}`)}>
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
                    />
                    <View
                      style={{
                        flexGrow: 1,
                        height: '100%',
                        backgroundColor: colors.light,
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}
    </Default>
  );
}
