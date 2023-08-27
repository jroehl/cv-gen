import ReactPDF, { Text, View } from '@react-pdf/renderer';

import snakeCase from 'lodash/snakeCase';
import { Config, ProgressBarColumnItem } from '../../types';
import Default from './Default';

interface Props extends ProgressBarColumnItem {
  styles: ReactPDF.Styles;
  config: Config;
}

export function ProgressBars({ heading, reactPdfProps, values, type, styles, config: { colors, printFriendly } }: Props) {
  return (
    <Default heading={heading} reactPdfProps={reactPdfProps} styles={styles}>
      {values.map((valueSet) => {
        return (
          <View key={JSON.stringify(valueSet)} style={{ paddingBottom: 12, width: '100%' }}>
            {valueSet.map(({ color, proficiency, skill }, i) => {
              return (
                <View key={skill} style={{ paddingBottom: 6 }} id={snakeCase(`${type} ${heading} ${i}`)}>
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
