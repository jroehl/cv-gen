import ReactPDF, { Image, Link, Text, View } from '@react-pdf/renderer';
import { Fragment } from 'react';
import { CV, Portal as CVPortal, Config } from '../types';

type Props = Pick<CV, 'contact' | 'config'>;

export function Footer({ contact, config: { colors, printFriendly } }: Props) {
  const styles: ReactPDF.Styles = {
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    links: {
      color: printFriendly ? colors.dark : colors.light,
      fontSize: 9.5,
      margin: '0 2',
    },
    top: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      padding: '12 48',
      backgroundColor: printFriendly ? '#FFF' : colors.dark,
      border: printFriendly ? `1pt solid ${colors.dark}` : 'none',
      borderBottom: 'none',
    },
    bottom: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6 24',
      backgroundColor: printFriendly ? '#FFF' : colors.darkest,
      border: printFriendly ? `1pt solid ${colors.darkest}` : 'none',
    },
  };

  const { name, phone, mail, website, portals, address } = contact;

  const contactString = [name.split('(')[0].trim(), ...address.split(',')].filter(Boolean).join(', ');

  return (
    <View fixed style={styles.footer}>
      {portals && (
        <View style={styles.top}>
          {portals.map((portal) => (
            <Portal {...portal} key={portal.url} colors={colors} printFriendly={printFriendly} />
          ))}
        </View>
      )}
      <View style={styles.bottom}>
        <Text style={styles.links}>{contactString}</Text>
        {phone && (
          <Fragment>
            <Text style={styles.links}>|</Text>
            <Link src={`tel:${phone.replace(/( |\(0\))/g, '')}`} style={styles.links}>
              {phone}
            </Link>
          </Fragment>
        )}
        {mail && (
          <Fragment>
            <Text style={styles.links}>|</Text>
            <Link src={`mailto:${mail}`} style={styles.links}>
              {mail}
            </Link>
          </Fragment>
        )}
        {website && (
          <Fragment>
            <Text style={styles.links}>|</Text>
            <Link src={website} style={styles.links}>
              {website}
            </Link>
          </Fragment>
        )}
      </View>
    </View>
  );
}

interface PortalProps extends Pick<Config, 'colors' | 'printFriendly'>, CVPortal {
  circleSize?: number;
}

function Portal({ circleSize = 24, printFriendly, url, icon, colors }: PortalProps) {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: circleSize,
          width: circleSize,
          borderRadius: circleSize,
          marginBottom: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.darkest,
        }}
      >
        <Image
          style={{
            height: circleSize / 2,
            width: circleSize / 2,
          }}
          src={icon}
        ></Image>
      </View>

      <Link
        style={{
          color: printFriendly ? colors.darkest : colors.lightest,
          fontSize: 8,
        }}
        src={url}
      >
        {url}
      </Link>
    </View>
  );
}
