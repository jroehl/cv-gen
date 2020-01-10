import React from 'react';
import PropTypes from 'prop-types';
import { Page, View, Document, Font } from '@react-pdf/renderer';

import Header from './Header';
import Footer from './Footer';
import { renderers, TYPES, RendererPropTypes } from './renderer';

const getStyles = ({ font, colors, columnLeftWidth = 40 }) => {
  const leftWidth = typeof columnLeftWidth === 'string' ? columnLeftWidth.replace('%', '') : columnLeftWidth;
  const rightWidth = 100 - leftWidth;

  return {
    page: {
      fontFamily: font.family,
    },
    body: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'row',
    },
    columnLeft: {
      width: `${leftWidth}%`,
      padding: '0 30 0 24',
      backgroundColor: colors.lightest,
    },
    columnRight: {
      width: `${rightWidth}%`,
      padding: '0 30 0 24',
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
  const { alignment, parts, ...rest } = props;

  const prop = `column${alignment.replace(/^\w/, c => c.toUpperCase())}`;
  const columnStyle = rest.styles[prop];

  if (!columnStyle) {
    console.error(`No column style found for "${prop}"`);
    return null;
  }
  const columnParts = parts[prop];
  if (!columnParts) {
    console.error(`No column parts found for "${prop}"`);
    return null;
  }

  return (
    <View style={columnStyle}>
      {columnParts.map((part, i) => {
        const { type } = part;
        const Renderer = renderers[type];
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
  columnLeftWidth: PropTypes.number,
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
  birthday: PropTypes.string.isRequired,
  birthplace: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  mail: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }),
  portals: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
});

MyDocument.propTypes = {
  parts: PropTypes.shape({
    columnLeft: columnShape,
    columnRight: columnShape,
  }).isRequired,
  config: configShape,
  contact: contactShape,
};

export default MyDocument;
