import React from 'react';
import { PDFViewer as ReactPDFViewer } from '@react-pdf/renderer';

import PDF from './src/Document';

export const PDFViewer = ({ cv, ...props }) => {
  if (!cv) return null;
  return (
    <ReactPDFViewer {...props}>
      <PDF {...cv} />
    </ReactPDFViewer>
  );
};

export const PDFDownloadLink = ({ cv, children, ...props }) => {
  if (!cv) return null;
  <PDFDownloadLink {...props} document={<PDF {...cv} />}>
    {children}
  </PDFDownloadLink>;
};
