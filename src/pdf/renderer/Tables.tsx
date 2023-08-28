import { Text, View } from '@react-pdf/renderer';

import { Bookmark } from '@react-pdf/types/bookmark';
import { TableRendererProps } from '../../types';
import Default from './Default';
import { buildId } from './utils';

export function Tables({ title, values, reactPdfProps, styles, index, alignment }: TableRendererProps) {
  return (
    <Default title={title} reactPdfProps={reactPdfProps} styles={styles}>
      {values.map(({ key, value }, i) => {
        const bookmark = {
          bookmark: {
            title: key,
          } as Bookmark,
        };
        return (
          <View
            {...bookmark}
            key={key}
            id={buildId({ blockIndex: index, itemIndex: i, alignment })}
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
        );
      })}
    </Default>
  );
}
