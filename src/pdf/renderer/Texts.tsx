import { Text, View } from '@react-pdf/renderer';

import { TextRendererProps } from '../../types';
import Default from './Default';
import { buildId } from './utils';

export function Texts({ title, values, reactPdfProps, styles, index, alignment }: TextRendererProps) {
  return (
    <Default title={title} reactPdfProps={reactPdfProps} styles={styles}>
      {values.map((props, i) => {
        const value = Array.isArray(props.value) ? props.value.sort((a, b) => a.localeCompare(b)).join(', ') : props.value;
        return (
          <View key={value} id={buildId({ blockIndex: index, itemIndex: i, alignment })} style={{ paddingBottom: 6 }}>
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
