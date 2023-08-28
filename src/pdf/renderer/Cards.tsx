import { Text, View } from '@react-pdf/renderer';
import { Bookmark } from '@react-pdf/types/bookmark';
import { CardRendererProps } from '../../types';
import Default from './Default';
import { buildId, sortByDuration } from './utils';

export function Cards({ title: cardHeading, reactPdfProps, values, styles, config: { colors, printFriendly }, index, alignment }: CardRendererProps) {
  return (
    <Default title={cardHeading} reactPdfProps={reactPdfProps} styles={styles}>
      {values.sort(sortByDuration).map(({ duration, title, skills, text, type }, i) => {
        const bookmark = {
          bookmark: {
            title,
          } as Bookmark,
        };
        return (
          <View
            {...bookmark}
            wrap
            break={false}
            minPresenceAhead={150}
            key={title}
            id={buildId({ blockIndex: index, itemIndex: i, alignment })}
            style={{
              position: 'relative',
              backgroundColor: colors.lightest,
              border: printFriendly ? `1pt solid ${colors.light}` : 'none',
              borderRadius: 2,
              padding: 12,
              marginTop: i > 0 ? 12 : 0,
              width: '100%',
            }}
          >
            <Text
              style={{
                ...styles.title,
                paddingBottom: 3,
              }}
            >
              {title}
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row', paddingBottom: 3 }}>
              <Text style={styles.smallParagraph}>{duration ? `${duration}, ` : duration}</Text>
              {type && <Text style={styles.smallParagraph}>{type}</Text>}
            </View>
            <Text
              style={{
                ...styles.paragraph,
                textAlign: 'justify',
                paddingBottom: 3,
              }}
            >
              {text}
            </Text>
            <Text style={styles.smallParagraph}>{Array.isArray(skills) ? skills.sort().join(', ') : skills}</Text>
          </View>
        );
      })}
    </Default>
  );
}
