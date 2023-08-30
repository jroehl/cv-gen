import { CreateClientParams, EntryFieldTypes, createClient } from 'contentful';
import { PhantomBusterLinkedInScrape } from './data/types';

export async function fetchContentfulData(params: CreateClientParams, contentfulId: string) {
  const client = createClient(params);
  const result = await client.getEntry<{
    fields: { payload: EntryFieldTypes.Object };
    contentTypeId: 'data';
  }>(contentfulId, { include: 10 });

  return result.fields.payload as PhantomBusterLinkedInScrape;
}
