import ReactPDF, { Link, Text, View } from '@react-pdf/renderer';

import snakeCase from 'lodash/snakeCase';
import { Config, TimelineColumnItem } from '../../types';
import Default from './Default';

interface Props extends TimelineColumnItem {
  styles: ReactPDF.Styles;
  config: Config;
}

export function Timelines({ heading: timelineHeading, type: timelineType, values, reactPdfProps, styles, config: { colors, printFriendly } }: Props) {
  const smallParagraph = {
    ...styles.paragraph,
    color: colors.mid,
    fontSize: 9,
  };

  return (
    <Default heading={timelineHeading} reactPdfProps={reactPdfProps} styles={styles}>
      {values.map(({ heading, fromTo, type, location, website, linkTo }, i) => (
        <View
          key={heading}
          id={snakeCase(`${timelineType} ${timelineHeading} ${i}`)}
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
            <Text style={smallParagraph}>{fromTo}</Text>
            {wrapInLink(heading, linkTo)}
            {type && <Text style={smallParagraph}>{type}</Text>}
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={smallParagraph}>{website ? `${location}, ` : location}</Text>
              {website ? (
                <Link style={smallParagraph} src={website}>
                  {website}
                </Link>
              ) : null}
            </View>
          </View>
        </View>
      ))}
    </Default>
  );

  function wrapInLink(heading: string, linkTo?: string) {
    const children = (
      <Text
        style={{
          ...styles.paragraph,
          fontSize: 11,
          padding: '3 0',
        }}
      >
        {heading}
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
      style={{
        paddingRight: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
