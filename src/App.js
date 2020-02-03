import React, { Component } from 'react';
import styles from './App.module.css';
import debounce from 'lodash.debounce';
import Ajv from 'ajv';

import { JsonEditor as Editor } from 'jsoneditor-react';

import { PDFViewer } from './PDFClient';
import Loader from './Loader';

import getDefaultJSON from './pdf/initial-json';
import cvSchema from './cv.schema.json';

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
  constructor() {
    super();
    const json = getDefaultJSON();
    ajv.validate(cvSchema, json);
    this.state = {
      json,
      error: ajv.errors,
    };
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
