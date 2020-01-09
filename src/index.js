import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import PDF from './Document';

export const run = (props, output) => ReactPDF.render(<PDF {...props} />, output);
