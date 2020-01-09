import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from '@react-pdf/renderer';
import gravatar from 'gravatar';

function romanize(num) {
  if (isNaN(num)) return NaN;
  var digits = String(+num).split(''),
    key = [
      '',
      'C',
      'CC',
      'CCC',
      'CD',
      'D',
      'DC',
      'DCC',
      'DCCC',
      'CM',
      '',
      'X',
      'XX',
      'XXX',
      'XL',
      'L',
      'LX',
      'LXX',
      'LXXX',
      'XC',
      '',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
    ],
    roman = '',
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
  return Array(+digits.join('') + 1).join('M') + roman;
}

const Header = ({ linkText, contact, colors }) => {
  const imageSize = '60pt';
  // Create styles
  const styles = {
    image: {
      height: imageSize,
      width: imageSize,
      borderRadius: imageSize,
    },
    links: {
      color: colors.light,
      marginRight: '6pt',
      fontSize: 10,
      textDecoration: 'none',
    },
    top: {
      display: 'flex',
      padding: '6pt 24pt',
      flexDirection: 'row',
      backgroundColor: colors.darkest,
    },
    bottom: {
      display: 'flex',
      padding: '18pt 24pt',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.dark,
    },
    title: {
      color: colors.light,
      fontSize: 30,
    },
  };

  const imageUrl = gravatar.url(contact.mail, { s: '400', d: 'retro', r: 'g' }, true);
  return (
    <View fixed style={styles.header}>
      <View style={styles.top}>
        <Text
          fixed
          style={styles.links}
          render={({ pageNumber, totalPages }) => {
            return `${linkText} ${romanize(pageNumber)} / ${romanize(totalPages)}`;
          }}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.title}>{contact.name}</Text>
        <Image style={styles.image} src={imageUrl}></Image>
      </View>
    </View>
  );
};

Header.propTypes = {
  linkText: PropTypes.string,
  contact: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Header.defaultProps = {
  linkText: 'RESUME',
};

export default Header;
