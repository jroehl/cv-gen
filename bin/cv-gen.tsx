import ReactPDF from '@react-pdf/renderer';
import { default as contentful } from 'contentful';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, isAbsolute, join, resolve } from 'node:path';
import { cwd } from 'node:process';
import React from 'react';
import cvSchema from '../cv.schema.json';
import { mapLinkedInDataToCV } from '../src/data/map';
import { PhantomBusterLinkedInScrape } from '../src/data/types';
import { Pdf } from '../src/pdf/Document';
import { CV } from '../src/types';
import { validateSchema } from '../src/utils';

const DIST_DIR = resolve(cwd(), 'dist');
const SRC_DIR = resolve(cwd(), 'src');
const PDF_DIR = join(DIST_DIR, 'pdf');

run().catch(logError);

async function run() {
  try {
    const [file] = process.argv.slice(2);
    const absolutePath = isAbsolute(file) ? file : resolve(cwd(), ...file.split('/').filter((x) => x !== '.'));
    console.log(`Generating CV based on "${absolutePath}"`);
    if (!existsSync(absolutePath)) throw new Error(`File "${absolutePath}" not found`);
    const data = await fetchCvData(absolutePath);

    await createPDF({
      path: absolutePath,
      data: {
        ...data,
        config: {
          ...data.config,
          printFriendly: false,
        },
      },
    });
    await createPDF({
      path: absolutePath,
      data: {
        ...data,
        config: {
          ...data.config,
          printFriendly: true,
        },
      },
    });
    generateLandingPage({
      path: absolutePath,
      data,
    });
  } catch (err) {
    logError(err);
  }
}

async function createPDF({ path, data }: { path: string; data: CV }) {
  const suffix = data.config.printFriendly ? '-print' : '';
  const pdfName = join(DIST_DIR, `${basename(path).replace('.json', '')}${suffix}.pdf`);
  await ReactPDF.render(<Pdf {...data} />, pdfName);
  console.log(`Stored CV "${pdfName}"`);
}

async function fetchCvData(path: string) {
  const data = await fetchContentfulData(
    { space: process.env.VITE_CONTENTFUL_SPACE_ID as string, accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN as string },
    process.env.VITE_CONTENTFUL_ENTRY_ID as string
  );
  const mapped = mapLinkedInDataToCV(data, JSON.parse(readFileSync(path, 'utf-8')));

  const { isValid, errors } = validateSchema(cvSchema, mapped);
  if (!isValid) {
    throw new Error(`Validation failed\n${errors?.map(({ instancePath, message }) => `  - "${instancePath}" - ${message}`).join('\n')}`);
  }

  return mapped;
}

function generateLandingPage({ path, data }: { path: string; data: CV }) {
  if (!existsSync(PDF_DIR)) {
    mkdirSync(PDF_DIR, { recursive: true });
  }
  const filename = basename(path).replace('.json', '');
  const jpgFilename = `${filename}.jpg`;
  const pdfFilename = `${filename}.pdf`;

  console.log(`Generating landing page for "${filename}"`);
  execSync(`convert -density 300 -quality 80 +append "${join(DIST_DIR, pdfFilename)}" "${join(PDF_DIR, jpgFilename)}"`, { stdio: 'inherit' });

  const title = `Curriculum Vitae - ${data.contact.name}`;
  const description = data.contact.description;
  const imageUrl = data.contact.image;

  const template = readFileSync(join(SRC_DIR, 'index.template.html'), 'utf-8');

  const html = template
    .replace(/%TITLE%/g, title)
    .replace(/%DESCRIPTION%/g, description)
    .replace(/%IMAGE_URL%/g, imageUrl)
    .replace(/%OUTPUT_JPG%/g, jpgFilename)
    .replace(/%PDF%/g, pdfFilename);

  const indexHtml = join(PDF_DIR, 'index.html');
  console.log(`Writing landing page to "${indexHtml}"`);
  writeFileSync(indexHtml, html, 'utf-8');
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
