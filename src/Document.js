import React from 'react';
import PropTypes from 'prop-types';
import { Page, View, Document, Font, Text } from '@react-pdf/renderer';

import Header from './Header';
import Footer from './Footer';
import { renderers } from './renderer';

const initRenderer = config => column => {
  if (!column) return null;
  const { type } = column;
  const renderer = renderers[type];
  if (!renderer) {
    console.error(`No renderer set up for "${type}"`);
    return null;
  }
  return renderer({ ...column, ...config });
};

const getStyles = ({ colors }) => {
  return {
    body: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'row',
    },
    columnLeft: {
      width: '40%',
      padding: '0 30pt 0 24pt',
      backgroundColor: colors.lightest,
    },
    columnRight: {
      width: '60%',
      padding: '0 30pt 0 24pt',
      backgroundColor: colors.light,
    },
    hr: {
      flexGrow: 1,
      marginTop: '3pt',
      borderBottom: `1pt solid ${colors.light}`,
    },
    heading: {
      color: colors.dark,
      paddingBottom: '12pt',
      fontSize: 13,
    },
    subHeading: {
      color: colors.mid,
      paddingBottom: '6pt',
      fontSize: 11,
    },
    paragraph: {
      color: colors.darkest,
      fontSize: 10,
    },
  };
};

const MyDocument = ({ parts, contact, config }) => {
  const { colors, font } = config;
  Font.register(config.font);
  const styles = getStyles(config);
  const renderColumn = initRenderer({ ...config, contact, styles });

  return (
    <Document>
      <Page size="A4" wrap style={{ fontFamily: font.family }}>
        <Header {...config} contact={contact} />
        <View style={styles.body}>
          <View style={styles.columnLeft}>{parts.columnLeft.map(renderColumn)}</View>
          <View style={styles.columnRight}>{parts.columnRight.map(renderColumn)}</View>
        </View>
        <Footer contact={contact} colors={colors} />
      </Page>
    </Document>
  );
};

MyDocument.propTypes = {
  parts: PropTypes.shape({
    columnLeft: PropTypes.arrayOf(PropTypes.object),
    columnRight: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  contact: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

MyDocument.defaultProps = {};

export default MyDocument;
