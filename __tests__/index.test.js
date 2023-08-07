import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

const resultStylish = readFile('expectedStylish.txt');
const resultPlain = readFile('expectedPlain.txt');
const resultJson = readFile('expectedJson.txt');

const formatsFiles = ['json', 'yml', 'yaml'];

test.each(formatsFiles)('diff formats of files (.json .yaml .yml)', (extension) => {
  const fileName1 = `${process.cwd()}/__fixtures__/file1.${extension}`;
  const fileName2 = `${process.cwd()}/__fixtures__/file2.${extension}`;

  expect(genDiff(fileName1, fileName2, 'stylish')).toEqual(resultStylish);
  expect(genDiff(fileName1, fileName2, 'plain')).toEqual(resultPlain);
  expect(genDiff(fileName1, fileName2, 'json')).toEqual(resultJson);
  expect(genDiff(fileName1, fileName2)).toEqual(resultStylish);
});
