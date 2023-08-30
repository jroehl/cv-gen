import { Document, Font, Page, View } from '@react-pdf/renderer';

import { ALIGNMENTS } from '../constants';
import { CV } from '../types';
import { Column } from './Column';
import { Footer } from './Footer';
import { Header } from './Header';
import { getStyles } from './renderer/utils';

export function Pdf({ contact, config, columns }: CV) {
  Font.register(config.font);

  const styles = getStyles(config);

  return (
    <Document author={contact.name} title={`Curriculum Vitae ${contact.name}`} keywords={`CV ${config.pageNumberText} ${contact.name}`}>
      <Page size="A4" wrap style={styles.page}>
        <Header contact={contact} config={config} />
        <View style={styles.body} >
          {ALIGNMENTS.map((alignment) => (
            <Column key={alignment} parts={columns[alignment]} alignment={alignment} styles={styles} config={config} />
          ))}
        </View>
        <Footer contact={contact} config={config} />
      </Page>
    </Document>
  );
}
