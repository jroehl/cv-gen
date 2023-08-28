import ReactPDF, { Text, View } from '@react-pdf/renderer';
import { Bookmark } from '@react-pdf/types/bookmark';
import { PropsWithChildren } from 'react';
import { ColumnDefault } from '../../types';
interface Props extends ColumnDefault {
  flexDirection?: 'row' | 'column';
  styles: ReactPDF.Styles;
}

function Default({ title, flexDirection = 'column', reactPdfProps = {}, children, styles }: PropsWithChildren<Props>) {
  const bookmark = {
    bookmark: {
      title,
    } as Bookmark,
  };
  return (
    <View
      {...bookmark}
      wrap={false}
      {...reactPdfProps}
      key={title}
      style={{
        padding: '14 30 0 24',
        maxWidth: '100%',
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          flexDirection,
          display: 'flex',
          paddingLeft: 12,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export default Default;
