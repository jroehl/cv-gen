import ReactPDF, { PDFViewer as ReactPDFViewer } from '@react-pdf/renderer';

import { Pdf } from './pdf/Document';
import { CV } from './types';

interface Props extends ReactPDF.PDFViewerProps {
  cv?: CV | null;
}

export function PDFViewer({ cv, ...props }: Props) {
  if (!cv) return null;
  return (
    <ReactPDFViewer {...props}>
      <Pdf {...cv} />
    </ReactPDFViewer>
  );
}

// export const PDFDownloadLink = ({ cv, ...props }: Props) => {
//   if (!cv) return null;
//   return (
//     <ReactPDFDownloadLink {...props} document={<PDF {...cv} />}>
//       {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
//     </ReactPDFDownloadLink>
//   );
// };
