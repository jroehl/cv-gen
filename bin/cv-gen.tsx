import ReactPDF from '@react-pdf/renderer';
import { default as contentful } from 'contentful';
import { existsSync, readFileSync } from 'node:fs';
import { basename, isAbsolute, resolve } from 'node:path';
import { cwd } from 'node:process';
import React from 'react';
import cvSchema from '../cv.schema.json';
import { mapLinkedInDataToCV } from '../src/data/map';
import { PhantomBusterLinkedInScrape } from '../src/data/types';
import { Pdf } from '../src/pdf/Document';
import { validateSchema } from '../src/utils';

run().catch(logError);

async function run() {
  try {
    const [file] = process.argv.slice(2);
    const absolutePath = isAbsolute(file) ? file : resolve(cwd(), ...file.split('/').filter((x) => x !== '.'));
    console.log(`Generating CV based on "${absolutePath}"`);
    if (!existsSync(absolutePath)) throw new Error(`File "${absolutePath}" not found`);
    await createPDF({ path: absolutePath });
    await createPDF({ path: absolutePath, printFriendly: true });
  } catch (err) {
    logError(err);
  }
}

async function createPDF({ path, printFriendly = false }: { path: string; printFriendly?: boolean }) {
  const pdfName = resolve(cwd(), 'dist', `${basename(path).replace('.json', '')}${printFriendly ? '-print' : ''}.pdf`);

  const data = await fetchContentfulData(
    { space: process.env.VITE_CONTENTFUL_SPACE_ID as string, accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN as string },
    process.env.VITE_CONTENTFUL_ENTRY_ID as string
  );
  const mapped = mapLinkedInDataToCV(data, JSON.parse(readFileSync(path, 'utf-8')));
  mapped.config.printFriendly = printFriendly;

  const { isValid, errors } = validateSchema(cvSchema, mapped);
  if (!isValid) throw new Error(`Validation failed\n${errors?.map(({ instancePath, message }) => `  - "${instancePath}" - ${message}`).join('\n')}`);

  await ReactPDF.render(<Pdf {...mapped} />, pdfName);
  console.log(`Stored CV "${pdfName}"`);
}

function logError(err: Error) {
  console.error('Error generating CV');
  console.error(err.message || err);
}

export async function fetchContentfulData(params: contentful.CreateClientParams, contentfulId: string) {
  const client = contentful.createClient(params);
  const result = await client.getEntry<{
    fields: { payload: contentful.EntryFieldTypes.Object };
    contentTypeId: 'data';
  }>(contentfulId, { include: 10 });

  return result.fields.payload as PhantomBusterLinkedInScrape;
}
