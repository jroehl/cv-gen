import { useMonaco } from '@monaco-editor/react';
import { ErrorObject, Schema } from 'ajv';
import omit from 'lodash/omit';
import { useCallback, useEffect, useMemo, useState } from 'react';
import cvSchema from '../cv.schema.json';
import { fetchContentfulData } from './contentful';
import { mapLinkedInDataToCV } from './data/map';
import { PhantomBusterLinkedInScrape } from './data/types';
import { CV, SchemaCV } from './types';
import { validateSchema } from './utils';

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
  const [defaultCv, setDefaultCv] = useState<CV | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const res = await fetch('/cv-johannemrich.json');
      const cv = (await res.json()) as SchemaCV;
      setDefaultCv(omit(cv, '$schema'));
    })();
  }, []);

  const mapped = data && defaultCv ? mapLinkedInDataToCV(data, defaultCv) : undefined;
  const key = JSON.stringify(mapped);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mapped, [key]);
}

export function useValidatedJson(data?: CV) {
  const [validated, setValidated] = useState<State>(null);
  const validateAndSetJson = useCallback((json?: CV) => {
    if (!json) return;
    const { isValid, errors } = validateSchema(cvSchema, json);
    setValidated(isValid ? { errors: null, json } : { errors, json: null });
  }, []);

  useEffect(() => {
    validateAndSetJson(data);
  }, [data, validateAndSetJson]);

  return [validated, validateAndSetJson] as const;
}

export function useContentfulData() {
  const [data, setData] = useState<PhantomBusterLinkedInScrape | undefined>();
  useEffect(() => {
    (async () => {
      const data = await fetchContentfulData(
        {
          space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
          accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
        },
        import.meta.env.VITE_CONTENTFUL_ENTRY_ID
      );
      setData(data);
    })();
  }, []);

  return data;
}
