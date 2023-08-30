import ReactPDF from '@react-pdf/renderer';
import { Alignment, Config } from '../../types';

export function buildId({ alignment, blockIndex, itemIndex }: { alignment: Alignment; blockIndex: number; itemIndex: number }) {
  return `${alignment}-${blockIndex}-${itemIndex}`.toLowerCase();
}

export function getStyles({ font, colors, leftColumnWidth: leftWidth = 40, printFriendly }: Config): ReactPDF.Styles {
  const rightWidth = 100 - leftWidth;

  return {
    page: {
      fontFamily: font.family,
      width: '100%',
    },
    body: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      width: '100%',
    },
    left: {
      //column
      width: `${leftWidth}%`,
      position: 'relative',
      backgroundColor: printFriendly ? '#FFF' : colors.lightest,
      borderLeft: printFriendly ? `1pt solid ${colors.mid}` : 'none',
    },
    right: {
      //column
      width: `${rightWidth}%`,
      position: 'relative',
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
    title: {
      color: colors.dark,
      paddingBottom: 12,
      fontSize: 11,
    },
    subtitle: {
      color: colors.mid,
      paddingBottom: 6,
      fontSize: 10,
    },
    paragraph: {
      color: colors.darkest,
      fontSize: 10,
    },
    smallParagraph: {
      color: colors.mid,
      fontSize: 9,
    },
  };
}
