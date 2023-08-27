import ReactPDF, { Text, View } from '@react-pdf/renderer';

import snakeCase from 'lodash/snakeCase';
import { Config, TextColumnItem } from '../../types';
import Default from './Default';

interface Props extends TextColumnItem {
  styles: ReactPDF.Styles;
  config: Config;
}

export function Texts({ heading, type, values, reactPdfProps, styles }: Props) {
  return (
    <Default heading={heading} reactPdfProps={reactPdfProps} styles={styles}>
      {values.map((props, i) => {
        const value = Array.isArray(props.value) ? props.value.join(', ') : props.value;
        return (
          <View key={value} id={snakeCase(`${type} ${heading} ${i}`)} style={{ paddingBottom: 6 }}>
            <Text
              style={{
                ...styles.paragraph,
                textAlign: 'justify',
              }}
            >
              {value}
            </Text>
          </View>
        );
      })}
    </Default>
  );
}
