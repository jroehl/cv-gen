import ReactPDF, { Text, View } from '@react-pdf/renderer';
import snakeCase from 'lodash/snakeCase';

import { CardColumnItem, Config } from '../../types';
import Default from './Default';

interface Props extends CardColumnItem {
  styles: ReactPDF.Styles;
  config: Config;
}

export function Cards({ heading: cardHeading, reactPdfProps, values, type, styles, config: { colors, printFriendly } }: Props) {
  return (
    <Default heading={cardHeading} reactPdfProps={reactPdfProps} styles={styles}>
      {values.map(({ duration, heading, subheading, text }, i) => {
        return (
          <View
            key={heading}
            id={snakeCase(`${type} ${cardHeading} ${i}`)}
            style={{
              position: 'relative',
              backgroundColor: colors.lightest,
              border: printFriendly ? `1pt solid ${colors.light}` : 'none',
              borderRadius: 2,
              padding: 12,
              marginBottom: 12,
              width: '100%',
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  ...styles.subheading,
                  paddingBottom: 3,
                  fontSize: 10,
                }}
              >
                {heading}
              </Text>
              {duration && (
                <Text
                  style={{
                    ...styles.paragraph,
                    paddingLeft: 6,
                    color: colors.mid,
                    fontSize: 6,
                  }}
                >
                  ({duration})
                </Text>
              )}
            </View>
            <Text
              style={{
                ...styles.paragraph,
                paddingBottom: 6,
                fontSize: 8,
              }}
            >
              {Array.isArray(subheading) ? subheading.sort().join(', ') : subheading}
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
      })}
    </Default>
  );
}
