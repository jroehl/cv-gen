import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

import { JsonEditor as Editor } from 'jsoneditor-react';

import { PDFViewer, PDFDownloadLink } from './PDFClient';
import Loader from './Loader';

import getDefaultJSON from './pdf/initial-json';

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
  return {
    darkest: colors[0].hex.value,
    dark: colors[1].hex.value,
    mid: colors[2].hex.value,
    light: '#EFEEEE',
    lightest: '#FFF',
  };
};

const fetchCircleColors = async seedColor => {
  const res = await fetch(`https://www.thecolorapi.com/scheme?rgb=${seedColor}&mode=analogic-complement&count=3`);
  const { colors } = await res.json();
  return [colors[0].hex.value, colors[1].hex.value, colors[2].hex.value];
};

function App() {
  const [json, setJSON] = useState();

  useEffect(() => {
    const seedColor = randomRGB(1);
    Promise.all([fetchColors(seedColor), fetchCircleColors(seedColor)]).then(([colors, circleColors]) => {
      setJSON(getDefaultJSON(colors, circleColors));
    });
  }, []);

  const hasJSON = json && json.config.colors.mid;

  if (!hasJSON) return <Loader></Loader>;
  return (
    <div className="App">
      <header className="App-header">
        <PDFDownloadLink fileName="somename.pdf" cv={json}>
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      </header>
      <div className={styles.body}>
        <section>{<Editor className={styles.editor} value={json} onChange={setJSON} />}</section>
        <section>{<PDFViewer className={styles.viewer} cv={json}></PDFViewer>}</section>
      </div>
    </div>
  );
}

export default App;
