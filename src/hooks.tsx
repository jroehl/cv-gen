import { useMonaco } from '@monaco-editor/react';
import Ajv, { ErrorObject, Schema } from 'ajv';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { columns, config, contact } from '../cv-johannemrich.json';
import cvSchema from '../cv.schema.json';
import { useContentfulData } from './data';
import { mapLinkedInDataToCV } from './data/map';
import { CV } from './types';

const DEFAULT_CV = {
  config,
  columns,
  contact,
} as CV;

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
});

type State =
  | {
      errors: ErrorObject[];
      json: null;
    }
  | {
      errors: null;
      json: CV;
    }
  | null;

export function useEditorSchema(schema: Schema) {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: '',
            fileMatch: ['*'],
            schema,
          },
        ],
      });
    }
  }, [monaco, schema]);
}

export function useMappedContentfulData() {
  const data = useContentfulData();
  const mapped = mapLinkedInDataToCV(data, DEFAULT_CV);
  const key = JSON.stringify(mapped);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mapped, [key]);
}

export function useValidatedJson(data?: CV) {
  const [validated, setValidated] = useState<State>(null);
  const validateAndSetJson = useCallback((json?: CV) => {
    if (!json) return;
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
    validateAndSetJson(data);
  }, [data, validateAndSetJson]);

  return [validated, validateAndSetJson] as const;
}
