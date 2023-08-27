import ReactPDF, { Document, Font, Page, View } from '@react-pdf/renderer';

import { ALIGNMENTS } from '../constants';
import { Alignment, AllColumnItemTypes, CV, Config } from '../types';
import { isCardColumn, isProgressBarColumn, isProgressCircleColumn, isTableColumn, isTextColumn, isTimelineColumn } from '../utils';
import { Footer } from './Footer';
import { Header } from './Header';
import { Cards } from './renderer/Cards';
import { ProgressBars } from './renderer/ProgressBars';
import { ProgressCircles } from './renderer/ProgressCircles';
import { Tables } from './renderer/Tables';
import { Texts } from './renderer/Texts';
import { Timelines } from './renderer/Timelines';

interface ColumnProps {
  alignment: Alignment;
  parts: AllColumnItemTypes[];
  styles: ReactPDF.Styles;
  config: Config;
}

const Column = ({ alignment, parts, styles, config }: ColumnProps) => {
  const columnStyle = styles[alignment];
  if (!columnStyle) {
    console.error(`No column style found for "${alignment}"`);
    return null;
  }

  return (
    <View style={columnStyle}>
      {parts.map((part, i) => {
        const defaultProps = { key: `${alignment}_${i}`, styles, config };
        if (isCardColumn(part)) {
          return <Cards {...defaultProps} {...part} />;
        }
        if (isProgressBarColumn(part)) {
          return <ProgressBars {...defaultProps} {...part} />;
        }
        if (isProgressCircleColumn(part)) {
          return <ProgressCircles {...defaultProps} {...part} />;
        }
        if (isTableColumn(part)) {
          return <Tables {...defaultProps} {...part} />;
        }
        if (isTextColumn(part)) {
          return <Texts {...defaultProps} {...part} />;
        }
        if (isTimelineColumn(part)) {
          return <Timelines {...defaultProps} {...part} />;
        }
        console.error(`No Renderer set up for`, part);
        return null;
      })}
    </View>
  );
};

type Props = CV;

export function Pdf({ contact, config, columns }: Props) {
  Font.register(config.font);

  const styles = getStyles(config);

  return (
    <Document>
      <Page size="A4" wrap style={styles.page}>
        <Header contact={contact} config={config} />
        <View style={styles.body}>
          {ALIGNMENTS.map((alignment) => (
            <Column key={alignment} parts={columns[alignment]} alignment={alignment} styles={styles} config={config} />
          ))}
        </View>
        <Footer contact={contact} config={config} />
      </Page>
    </Document>
  );
}

function getStyles({ font, colors, leftColumnWidth: leftWidth = 40, printFriendly }: Config): ReactPDF.Styles {
  const rightWidth = 100 - leftWidth;

  return {
    page: {
      fontFamily: font.family,
    },
    body: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
    },
    left: {
      //column
      width: `${leftWidth}%`,
      backgroundColor: printFriendly ? '#FFF' : colors.lightest,
      borderLeft: printFriendly ? `1pt solid ${colors.mid}` : 'none',
    },
    right: {
      //column
      width: `${rightWidth}%`,
      backgroundColor: printFriendly ? '#FFF' : colors.light,
      border: printFriendly ? `1pt solid ${colors.mid}` : 'none',
      borderTop: 'none',
      borderBottom: 'none',
    },
    hr: {
      flexGrow: 1,
      marginTop: 3,
      borderBottom: `1 solid ${colors.light}`,
    },
    heading: {
      color: colors.dark,
      paddingBottom: 12,
      fontSize: 13,
    },
    subHeading: {
      color: colors.mid,
      paddingBottom: 6,
      fontSize: 11,
    },
    paragraph: {
      color: colors.darkest,
      fontSize: 10,
    },
  };
}
