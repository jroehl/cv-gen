import Editor, { useMonaco } from '@monaco-editor/react';
import Ajv, { ErrorObject } from 'ajv';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';
import { columns, config, contact } from '../cv-johannemrich.json';
import cvSchema from '../cv.schema.json';
import { Errors } from './Errors';
import { PDFViewer } from './PDFClient';
import { CV } from './types';

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
});

const cv = {
  config,
  columns,
  contact,
} as CV;

type State =
  | {
      errors: ErrorObject[];
      json: null;
    }
  | {
      errors: null;
      json: CV;
    };

function App() {
  const [{ json, errors }, setValidated] = useState<State>({ errors: null, json: cv });

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: '',
            fileMatch: ['*'],
            schema: cvSchema,
          },
        ],
      });
    }
  }, [monaco]);

  const validateAndSetJson = useCallback((json?: CV) => {
    const validate = ajv.compile(cvSchema);
    const isValid = validate(json);
    setValidated(
      isValid
        ? {
            errors: null,
            json,
          }
        : {
            errors: validate.errors as ErrorObject[],
            json: null,
          }
    );
  }, []);

  useEffect(() => {
    validateAndSetJson(cv);
  }, [validateAndSetJson]);

  if (!errors && !json) return <div>... loading</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <section style={{ minHeight: '100%', width: '50%' }}>
        <Editor
          width="100%"
          theme="vs-dark"
          height="100vh"
          defaultLanguage="json"
          defaultValue={JSON.stringify(json, null, 2)}
          onChange={debounce((value) => {
            validateAndSetJson(JSON.parse(value as string));
          }, 1000)}
        />
      </section>
      <section style={{ minHeight: '100%', width: '50%' }}>
        {errors ? (
          <Errors errors={errors} />
        ) : (
          <PDFViewer
            cv={json}
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
