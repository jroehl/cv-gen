#!/usr/bin/env node

import ReactPDF from '@react-pdf/renderer';
import Ajv from 'ajv';
import { existsSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { cwd } from 'node:process';
import React from 'react';
import cvSchema from '../src/cv.schema.json';
import { Pdf } from '../src/pdf/Document';
import { CV } from '../src/types';

const logError = (err: Error) => {
  console.error('Error generating CV');
  console.error(err.message || err);
};

const createPDF = async (absolutePath: string, printFriendly = false) => {
  const pdfName = resolve(cwd(), 'public', `${basename(absolutePath).replace('.json', '')}${printFriendly ? '-print' : ''}.pdf`);

  const json: CV = JSON.parse(readFileSync(absolutePath, 'utf-8'));
  json.config.printFriendly = printFriendly;

  const ajv = new Ajv({ allErrors: true, verbose: true });

  const validate = ajv.compile(cvSchema);

  const isValid = validate(json);
  if (!isValid) throw new Error(`Validation failed\n${validate.errors?.map(({ instancePath, message }) => `  - "${instancePath}" - ${message}`).join('\n')}`);

  await ReactPDF.render(<Pdf {...json} />, pdfName);
  console.log(`Stored CV "${pdfName}"`);
};

const run = async () => {
  try {
    const [file] = process.argv.slice(2);
    const absolutePath = file.startsWith('/') ? file : resolve(cwd(), ...file.split('/').filter((x) => x !== '.'));
    console.log(`Generating CV based on "${absolutePath}"`);
    if (!existsSync(absolutePath)) throw new Error(`File "${absolutePath}" not found`);
    await createPDF(absolutePath);
    await createPDF(absolutePath, true);
  } catch (err) {
    logError(err);
  }
};

run().catch(logError);
