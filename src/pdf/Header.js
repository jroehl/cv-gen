import React from 'react';
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

const Header = ({ config: { pageNumberText = 'RESUME', colors, romanizedPageNumbers, printFriendly }, contact }) => {
  const imageSize = 60;
  const styles = {
    image: {
      height: imageSize,
      width: imageSize,
      borderRadius: imageSize,
    },
    pageNumbers: {
      color: printFriendly ? colors.dark : colors.light,
      marginRight: 6,
      fontSize: 10,
    },
    top: {
      display: 'flex',
      flexDirection: 'row',
      padding: '6 24',
      backgroundColor: printFriendly ? '#FFF' : colors.darkest,
      border: printFriendly ? `1pt solid ${colors.darkest}` : 'none',
    },
    bottom: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18 24',
      backgroundColor: printFriendly ? '#FFF' : colors.dark,
      border: printFriendly ? `1pt solid ${colors.dark}` : 'none',
      borderTop: 'none',
    },
    title: {
      color: printFriendly ? colors.dark : colors.light,
      fontSize: 30,
    },
  };

  return (
    <View fixed style={styles.header}>
      <View style={styles.top}>
        <Text
          fixed
          style={styles.pageNumbers}
          render={({ pageNumber, totalPages }) => {
            if (romanizedPageNumbers) return `${pageNumberText} ${romanize(pageNumber)} / ${romanize(totalPages)}`;
            return `${pageNumberText} ${pageNumber} / ${totalPages}`;
          }}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.title}>{contact.name}</Text>
        <Image style={styles.image} src={gravatar.url(contact.mail, { s: '400', d: 'retro', r: 'g' }, true)}></Image>
      </View>
    </View>
  );
};

export default Header;
