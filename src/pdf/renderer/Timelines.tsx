import { Link, Text, View } from '@react-pdf/renderer';

import { Bookmark } from '@react-pdf/types/bookmark';
import { Config, TimelineRendererProps } from '../../types';
import Default from './Default';
import { buildId } from './utils';

export function Timelines({
  title: timelineHeading,
  values,
  reactPdfProps,
  styles,
  config: { colors, printFriendly },
  index,
  alignment,
}: TimelineRendererProps) {
  return (
    <Default title={timelineHeading} reactPdfProps={reactPdfProps} styles={styles}>
      {values.map(({ title, duration, type, location, website, linkTo }, i) => {
        const bookmark = {
          bookmark: {
            title,
          } as Bookmark,
        };

        return (
          <View
            {...bookmark}
            key={title}
            id={buildId({ blockIndex: index, itemIndex: i, alignment })}
            style={{
              paddingBottom: 3,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TimelineItem colors={colors} printFriendly={printFriendly} />
            <View
              style={{
                ...styles.hr,
                paddingBottom: 6,
                marginBottom: 6,
                borderColor: colors.mid,
              }}
            >
              <Text style={styles.smallParagraph}>{duration}</Text>
              {wrapInLink(title, linkTo)}
              {type && <Text style={styles.smallParagraph}>{type}</Text>}
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={styles.smallParagraph}>{website ? `${location}, ` : location}</Text>
                {website && (
                  <Link style={styles.smallParagraph} src={website}>
                    {website}
                  </Link>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </Default>
  );

  function wrapInLink(title: string, linkTo?: string) {
    const children = (
      <Text
        style={{
          ...styles.title,
          padding: '3 0',
        }}
      >
        {title}
      </Text>
    );
    if (!linkTo) return children;
    return <Link src={`#${linkTo}`}>{children}</Link>;
  }
}

interface TimelineItemProps extends Pick<Config, 'colors' | 'printFriendly'> {
  circleSize?: number;
}

function TimelineItem({ circleSize = 20, colors, printFriendly }: TimelineItemProps) {
  const innerCircleSize = circleSize * 0.5;
  return (
    <View
      wrap={false}
      break={false}
      style={{
        paddingRight: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <View
        style={{
          width: circleSize,
          height: circleSize,
          border: `${printFriendly ? '1pt' : '2pt'} solid ${colors.mid}`,
          borderRadius: circleSize,
          marginTop: -(circleSize * 0.1),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: innerCircleSize,
            height: innerCircleSize,
            backgroundColor: printFriendly ? '#FFF' : colors.mid,
            border: printFriendly ? `1pt solid ${colors.mid}` : 'none',
            borderRadius: innerCircleSize,
          }}
        />
      </View>
      <View
        style={{
          marginTop: -(circleSize / 4),
          paddingBottom: circleSize,
          flexGrow: 1,
          width: printFriendly ? 1 : 2,
          backgroundColor: colors.mid,
        }}
      />
    </View>
  );
}
