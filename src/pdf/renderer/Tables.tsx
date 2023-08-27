import ReactPDF, { Text, View } from '@react-pdf/renderer';

import snakeCase from 'lodash/snakeCase';
import { Config, TableColumnItem } from '../../types';
import Default from './Default';

interface Props extends TableColumnItem {
  styles: ReactPDF.Styles;
  config: Config;
}

export function Tables({ heading, type, values, reactPdfProps, styles }: Props) {
  return (
    <Default heading={heading} reactPdfProps={reactPdfProps} styles={styles}>
      {values.map(({ key, value }, i) => (
        <View
          key={key}
          id={snakeCase(`${type} ${heading} ${i}`)}
          style={{
            ...styles.hr,
            width: '100%',
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
      ))}
    </Default>
  );
}
