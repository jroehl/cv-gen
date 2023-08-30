import Editor from '@monaco-editor/react';
import debounce from 'lodash/debounce';
import cvSchema from '../cv.schema.json';
import { Errors } from './Errors';
import { PDFViewer } from './PDFClient';
import { useEditorSchema, useMappedContentfulData, useValidatedJson } from './hooks';

function App() {
  useEditorSchema(cvSchema);
  const data = useMappedContentfulData();

  const [validated, setValidated] = useValidatedJson(data);
  if (!validated) return <div>... loading</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <section style={{ minHeight: '100%', width: '50%' }}>
        <Editor
          width="100%"
          theme="vs-dark"
          height="100vh"
          defaultLanguage="json"
          defaultValue={JSON.stringify(validated.json, null, 2)}
          onChange={debounce((value) => {
            setValidated(JSON.parse(value as string));
          }, 1000)}
        />
      </section>
      <section style={{ minHeight: '100%', width: '50%' }}>
        {validated.errors ? (
          <Errors errors={validated.errors} />
        ) : (
          <PDFViewer
            cv={validated.json}
            style={{
              width: '100%',
              minHeight: '100%',
            }}
          />
        )}
      </section>
    </div>
  );
}

export default App;
