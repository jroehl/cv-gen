import { Text, View } from '@react-pdf/renderer';
import { Bookmark } from '@react-pdf/types/bookmark';
import { CardRendererProps } from '../../types';
import Default from './Default';
import { buildId } from './utils';

export function Cards({ title: cardHeading, reactPdfProps, values, styles, config: { colors, printFriendly }, index, alignment }: CardRendererProps) {
  return (
    <Default title={cardHeading} reactPdfProps={reactPdfProps} styles={styles}>
      {values.map(({ duration, title, skills, text, type }, i) => {
        const bookmark = {
          bookmark: {
            title,
          } as Bookmark,
        };
        return (
          <View
            {...bookmark}
            wrap={false}
            break={false}
            minPresenceAhead={109}
            key={title}
            id={buildId({ blockIndex: index, itemIndex: i, alignment })}
            style={{
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
            <View
              style={{
                paddingBottom: 3,
              }}
            >
              {duration && <Text style={styles.smallParagraph}>{duration}</Text>}
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
            {skills && <Text style={{ ...styles.smallParagraph, marginTop: 3 }}>{Array.isArray(skills) ? skills.sort().join(', ') : skills}</Text>}
          </View>
        );
      })}
    </Default>
  );
}
