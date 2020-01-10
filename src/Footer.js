import React, { Fragment } from 'react';
import { Link, View, Text, Image } from '@react-pdf/renderer';

const Portal = ({ circleSize = 24, url, icon, colors }) => {
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
          color: colors.lightest,
          fontSize: 8,
        }}
        href={url}
      >
        {url}
      </Link>
    </View>
  );
};

const Footer = ({ config: { colors }, contact }) => {
  const styles = {
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    links: {
      color: colors.light,
      fontSize: 9.5,
      margin: '0 2',
    },
    top: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      padding: '12 48',
      backgroundColor: colors.dark,
    },
    bottom: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6 24',
      backgroundColor: colors.darkest,
    },
  };

  const { name, phone, mail, website, portals, address: { street, city, country } = {} } = contact;

  const contactString = [name, street, city, country].filter(Boolean).join(', ');

  return (
    <View fixed style={styles.footer}>
      {portals && (
        <View style={styles.top}>
          {portals.map(portal => (
            <Portal {...portal} key={portal.url} colors={colors} />
          ))}
        </View>
      )}
      <View style={styles.bottom}>
        <Text style={styles.links}>{contactString}</Text>
        {phone && (
          <Fragment>
            <Text style={styles.links}>|</Text>
            <Link href={`tel:${phone.replace(/( |\(0\))/g, '')}`} style={styles.links}>
              {phone}
            </Link>
          </Fragment>
        )}
        {mail && (
          <Fragment>
            <Text style={styles.links}>|</Text>
            <Link href={`mailto:${mail}`} style={styles.links}>
              {mail}
            </Link>
          </Fragment>
        )}
        {website && (
          <Fragment>
            <Text style={styles.links}>|</Text>
            <Link href={website} style={styles.links}>
              {website}
            </Link>
          </Fragment>
        )}
      </View>
    </View>
  );
};

export default Footer;
