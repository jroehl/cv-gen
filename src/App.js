import React, { Component } from 'react';
import styles from './App.module.css';
import debounce from 'lodash.debounce';
import Ajv from 'ajv';

import { JsonEditor as Editor } from 'jsoneditor-react';

import { PDFViewer } from './PDFClient';
import Loader from './Loader';

import getDefaultJSON from './pdf/initial-json';
import cvSchema from './cv.schema.json';

const randomRGB = brightness => {
  // Six levels of brightness from 0 to 5, 0 being the darkest
  const rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  const mix = [brightness * 51, brightness * 51, brightness * 51]; //51 => 255/5
  const mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(x => Math.round(x / 2.0));
  return 'rgb(' + mixedrgb.join(',') + ')';
};

const fetchColors = async seedColor => {
  const res = await fetch(`https://www.thecolorapi.com/scheme?rgb=${seedColor}&mode=monochrome&count=3`);
  const { colors } = await res.json();
  const [
    {
      hex: { value: darkest },
    },
    {
      hex: { value: dark },
    },
    {
      hex: { value: mid },
    },
  ] = colors;
  return {
    darkest,
    dark,
    mid,
    light: '#EFEEEE',
    lightest: '#FFF',
  };
};

const fetchCircleColors = async seedColor => {
  const res = await fetch(`https://www.thecolorapi.com/scheme?rgb=${seedColor}&mode=analogic-complement&count=3`);
  const { colors } = await res.json();
  const [
    {
      hex: { value: first },
    },
    {
      hex: { value: second },
    },
    {
      hex: { value: third },
    },
  ] = colors;
  return [first, second, third];
};

const renderError = error => {
  const errors = Array.isArray(error) ? error : [error];
  return (
    <div className={styles.errors}>
      <h3>Rendering failed:</h3>
      {errors.map(({ dataPath, message }) => (
        <p key={dataPath}>{`"${dataPath}" - ${message}`}</p>
      ))}
    </div>
  );
};

const ajv = new Ajv({ allErrors: true, verbose: true });

class App extends Component {
  state = {};

  async componentDidMount() {
    const seedColor = randomRGB(1);
    const [colors, circleColors] = await Promise.all([fetchColors(seedColor), fetchCircleColors(seedColor)]);
    this.setValidatedJSON(getDefaultJSON(colors, circleColors));
  }

  setValidatedJSON = json => {
    ajv.validate(cvSchema, json);
    this.setState({ json, error: ajv.errors });
  };

  render() {
    const { json, error } = this.state;
    if (!json && !error) return <Loader></Loader>;
    return (
      <div className={styles.body}>
        <section className={styles.editor}>
          <Editor ajv={ajv} value={json} onChange={debounce(json => this.setValidatedJSON(json), 1000)} schema={cvSchema} />
        </section>
        <section className={styles.viewer}>{!error ? <PDFViewer cv={json}></PDFViewer> : renderError(error)}</section>
      </div>
    );
  }
}

export default App;
