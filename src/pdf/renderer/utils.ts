import ReactPDF from '@react-pdf/renderer';
import parse from 'date-fns/parse';
import { Alignment, Config } from '../../types';

export function buildId({ alignment, blockIndex, itemIndex }: { alignment: Alignment; blockIndex: number; itemIndex: number }) {
  return `${alignment}-${blockIndex}-${itemIndex}`.toLowerCase();
}

export function sortByDuration(a: { duration: string }, b: { duration: string }): number {
  if (a.duration.toLowerCase().includes('present')) {
    return -1; // a comes before b
  }
  if (b.duration.toLowerCase().includes('present')) {
    return 1; // b comes before a
  }
  // extract the end date from the duration string
  const aEndDate = parse(a.duration.split(' - ').pop() as string, 'MM/yyyy', new Date());
  const bEndDate = parse(b.duration.split(' - ').pop() as string, 'MM/yyyy', new Date());
  return bEndDate.getTime() - aEndDate.getTime();
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
