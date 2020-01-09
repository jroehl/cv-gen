import React from 'react';
import PropTypes from 'prop-types';
import { Link, View, Text, Image } from '@react-pdf/renderer';

const icons = {
  // custom
  linkedin: 'fab fa-linkedin-in',
  github: 'fab fa-github',
  angel: 'fab fa-angellist',
  xing: 'fab fa-xing',
  // websites
  blog: 'fas fa-blog',
  personal: 'fas fa-user',
  rss: 'fas fa-rss',
  company: 'far fa-building',
  portfolio: 'fas fa-user-edit',
  // IM
  skype: 'fab fa-skype',
  aim: 'fas fa-crosshairs',
  yahoo: 'fab fa-yahoo',
  icq: 'fab fa-intercom',
  hangouts: 'fab fa-google',
  google: 'fab fa-google',
  qq: 'fab fa-qq',
  wechat: 'fab fa-weixin',
  industry: 'fas fa-industry',
  other: 'fas fa-globe',
  fallback: 'fas fa-globe',
};

const Footer = ({ contact, colors }) => {
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
    },
    top: {
      display: 'flex',
      padding: '12pt 48pt',
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: colors.dark,
    },
    bottom: {
      display: 'flex',
      flexDirection: 'row',
      padding: '6pt 24pt',
      backgroundColor: colors.darkest,
      justifyContent: 'space-between',
    },
  };

  const {
    name,
    phone,
    mail,
    website,
    portals,
    address: { street, city, country },
  } = contact;

  const contactString = `${name}, ${street}, ${city}, ${country}`;

  return (
    <View fixed style={styles.footer}>
      <View fixed style={styles.top}>
        {portals.map(({ icon, url }) => {
          const circleSize = 24;
          return (
            <View key={url} style={{ display: 'flex', alignItems: 'center' }}>
              <View
                style={{
                  height: circleSize,
                  width: circleSize,
                  borderRadius: circleSize,
                  marginBottom: '4pt',
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
        })}
      </View>
      <View fixed style={styles.bottom}>
        <Text style={styles.links}>{contactString}</Text>
        <Text style={styles.links}>|</Text>
        <Link href={`tel:${phone.replace(/( |\(0\))/g, '')}`} style={styles.links}>
          {phone}
        </Link>
        <Text style={styles.links}>|</Text>
        <Link href={`mailto:${mail}`} style={styles.links}>
          {mail}
        </Link>
        <Text style={styles.links}>|</Text>
        <Link href={website} style={styles.links}>
          {website}
        </Link>
      </View>
    </View>
  );
};

Footer.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Footer.defaultProps = {};

export default Footer;
