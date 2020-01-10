import React from 'react';
import PropTypes from 'prop-types';
import { Page, View, Document, Font } from '@react-pdf/renderer';

import Header from './Header';
import Footer from './Footer';
import { Renderers, TYPES, RendererPropTypes } from './renderer';

const getStyles = ({ font, colors, leftColumnWidth: leftWidth = 40 }) => {
  const rightWidth = 100 - leftWidth;

  return {
    page: {
      fontFamily: font.family,
    },
    body: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
    },
    left: {
      //column
      width: `${leftWidth}%`,
      backgroundColor: colors.lightest,
    },
    right: {
      //column
      width: `${rightWidth}%`,
      backgroundColor: colors.light,
    },
    hr: {
      flexGrow: 1,
      marginTop: 3,
      borderBottom: `1 solid ${colors.light}`,
    },
    heading: {
      color: colors.dark,
      paddingBottom: 12,
      fontSize: 13,
    },
    subHeading: {
      color: colors.mid,
      paddingBottom: 6,
      fontSize: 11,
    },
    paragraph: {
      color: colors.darkest,
      fontSize: 10,
    },
  };
};

const Column = props => {
  const { alignment, columns, ...rest } = props;

  const columnStyle = rest.styles[alignment];
  if (!columnStyle) {
    console.error(`No column style found for "${alignment}"`);
    return null;
  }
  const columnParts = columns[alignment];
  if (!columnParts) {
    console.error(`No column columns found for "${alignment}"`);
    return null;
  }

  return (
    <View style={columnStyle}>
      {columnParts.map((part, i) => {
        const { type } = part;
        const Renderer = Renderers[type];
        if (!Renderer) {
          console.error(`No Renderer set up for "${type}"`);
          return null;
        }
        return <Renderer key={`${type}_${i}`} {...rest} {...part} />;
      })}
    </View>
  );
};

const MyDocument = props => {
  const { config } = props;
  Font.register(config.font);
  const styles = getStyles(config);

  const enrichedProps = { ...props, styles };

  return (
    <Document>
      <Page size="A4" wrap style={styles.page}>
        <Header {...enrichedProps} />
        <View style={styles.body}>
          <Column {...enrichedProps} alignment="left" />
          <Column {...enrichedProps} alignment="right" />
        </View>
        <Footer {...enrichedProps} />
      </Page>
    </Document>
  );
};

const columnShape = PropTypes.arrayOf(
  PropTypes.shape({
    heading: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
    reactPdfProps: PropTypes.shape({
      wrap: PropTypes.bool,
      break: PropTypes.bool,
      fixed: PropTypes.bool,
      debug: PropTypes.bool,
    }),
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(RendererPropTypes), RendererPropTypes]).isRequired).isRequired,
  }).isRequired
).isRequired;

const configShape = PropTypes.shape({
  leftColumnWidth: PropTypes.number,
  pageNumberText: PropTypes.string,
  romanizedPageNumbers: PropTypes.bool,
  font: PropTypes.shape({
    family: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  colors: PropTypes.shape({
    darkest: PropTypes.string.isRequired,
    dark: PropTypes.string.isRequired,
    mid: PropTypes.string.isRequired,
    light: PropTypes.string.isRequired,
    lightest: PropTypes.string.isRequired,
  }).isRequired,
});

const contactShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  phone: PropTypes.string,
  mail: PropTypes.string,
  website: PropTypes.string,
  address: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  portals: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
});

MyDocument.propTypes = {
  columns: PropTypes.shape({
    left: columnShape,
    right: columnShape,
  }).isRequired,
  config: configShape,
  contact: contactShape,
};

export default MyDocument;
