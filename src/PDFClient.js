import React from 'react';
import { PDFViewer as ReactPDFViewer, PDFDownloadLink as ReactPDFDownloadLink } from '@react-pdf/renderer';

import PDF from './pdf/Document';

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
  return (
    <ReactPDFDownloadLink {...props} document={<PDF {...cv} />}>
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </ReactPDFDownloadLink>
  );
};
