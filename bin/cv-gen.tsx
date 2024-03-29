import ReactPDF from '@react-pdf/renderer';
import { default as contentful } from 'contentful';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, isAbsolute, join, resolve } from 'node:path';
import { cwd } from 'node:process';
import { convert } from 'pdf-img-convert';
import React from 'react';
import cvSchema from '../cv.schema.json';
import { mapLinkedInDataToCV } from '../src/data/map';
import { PhantomBusterLinkedInScrape } from '../src/data/types';
import { Pdf } from '../src/pdf/Document';
import { CV } from '../src/types';
import { validateSchema } from '../src/utils';
import { generateMarkdown } from '../src/markdown';
import { execSync } from 'node:child_process';

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

    await createPdf({
      path: absolutePath,
      data: {
        ...data,
        config: {
          ...data.config,
          printFriendly: false,
        },
      },
    });
    await createPdf({
      path: absolutePath,
      data: {
        ...data,
        config: {
          ...data.config,
          printFriendly: true,
        },
      },
    });

    await createMdAndDocx({ path: absolutePath, data });

    await generateLandingPage({
      path: absolutePath,
      data,
    });
  } catch (err) {
    logError(err);
  }
}

async function createPdf({ path, data }: { path: string; data: CV }) {
  const suffix = data.config.printFriendly ? '-print' : '';
  const pdfName = join(DIST_DIR, `${basename(path).replace('.json', '')}${suffix}.pdf`);
  await ReactPDF.render(<Pdf {...data} />, pdfName);
  console.log(`Stored CV "${pdfName}"`);
}

async function createMdAndDocx({ path, data }: { path: string; data: CV }) {
  const mdName = join(DIST_DIR, `${basename(path).replace('.json', '')}.md`);

  const md = generateMarkdown(data);

  writeFileSync(mdName, md, 'utf-8');
  console.log(`Stored CV "${mdName}"`);

  // if pandoc is not installed return
  try {
    execSync('pandoc -v');
  } catch (e) {
    console.log('pandoc is not installed. Skipping docx and rtf generation.');
    return;
  }

  const rtfName = join(DIST_DIR, `${basename(path).replace('.json', '')}.rtf`);
  execSync(`pandoc -o ${rtfName} -f markdown -s ${mdName}`, { cwd: DIST_DIR });
  console.log(`Stored CV "${rtfName}"`);

  const docxName = join(DIST_DIR, `${basename(path).replace('.json', '')}.docx`);
  execSync(`pandoc -o ${docxName} -f markdown -s ${mdName}`, { cwd: DIST_DIR });
  console.log(`Stored CV "${mdName}"`);
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

  writeFileSync(join(DIST_DIR, basename(path)), JSON.stringify(mapped, null, 2), 'utf-8');
  return mapped;
}

async function generateLandingPage({ path, data }: { path: string; data: CV }) {
  if (!existsSync(PDF_DIR)) {
    mkdirSync(PDF_DIR, { recursive: true });
  }
  const filename = basename(path).replace('.json', '');
  const jpgFilename = `${filename}.jpg`;
  const pdfFilename = `${filename}.pdf`;

  console.log(`Generating landing page for "${filename}"`);
  const [output] = await convert(join(DIST_DIR, pdfFilename), { height: 3508 });
  writeFileSync(join(PDF_DIR, jpgFilename), output);

  const title = `Curriculum Vitae | ${data.contact.name}`;
  const description = data.contact.description;
  const imageUrl = data.contact.image;

  const template = readFileSync(join(SRC_DIR, 'index.template.html'), 'utf-8');

  const html = template
    .replace(/%TITLE%/g, title)
    .replace(/%DESCRIPTION%/g, description)
    .replace(/%IMAGE_URL%/g, imageUrl)
    .replace(/%OUTPUT_JPG%/g, jpgFilename)
    .replace(/%OUTPUT_PDF%/g, pdfFilename);

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
