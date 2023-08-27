import ReactPDF, { Text, View } from '@react-pdf/renderer';
import { PropsWithChildren } from 'react';
import { ColumnDefault } from '../../types';

interface Props extends ColumnDefault {
  flexDirection?: 'row' | 'column';
  styles: ReactPDF.Styles;
}

function Default({ heading, flexDirection = 'column', reactPdfProps = {}, children, styles }: PropsWithChildren<Props>) {
  return (
    <View
      wrap={false}
      {...reactPdfProps}
      key={heading}
      style={{
        padding: '14 30 0 24',
      }}
    >
      <Text style={styles.heading}>{heading}</Text>
      <View
        style={{
          flexDirection,
          display: 'flex',
          flexWrap: 'wrap',
          paddingLeft: 12,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export default Default;
