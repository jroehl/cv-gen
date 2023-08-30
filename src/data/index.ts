import { EntryFieldTypes, createClient } from 'contentful';
import { useEffect, useState } from 'react';
import { PhantomBusterLinkedInScrape } from './types';

const LOCALE = 'en-US';

export async function fetchData() {
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  });

  const result = await client.getEntry<
    {
      fields: { payload: EntryFieldTypes.Object };
      contentTypeId: 'data';
    },
    typeof LOCALE
  >('2hwIlmlj9hEH6eoNrorSXE', {
    include: 10,
    locale: LOCALE,
  });

  return result.fields.payload as PhantomBusterLinkedInScrape;
}

export function useContentfulData() {
  const [data, setData] = useState<PhantomBusterLinkedInScrape | undefined>();
  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setData(data);
    })();
  }, []);

  return data;
}
