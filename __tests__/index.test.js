import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

const formatsFiles = [
  ['file1.json', 'file2.json', undefined, 'expectedStylish.txt'],
  ['file1.yml', 'file2.yaml', undefined, 'expectedStylish.txt'],
  ['file1.json', 'file2.json', 'stylish', 'expectedStylish.txt'],
  ['file1.yaml', 'file2.yml', 'stylish', 'expectedStylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'expectedPlain.txt'],
  ['file1.yml', 'file2.yaml', 'plain', 'expectedPlain.txt'],
  ['file1.json', 'file2.json', 'json', 'expectedJson.txt'],
  ['file1.yaml', 'file2.yml', 'json', 'expectedJson.txt'],
];

test.each(formatsFiles)('diff formats of files (.json .yaml .yml)', (file1, file2, format, expected) => {
  const fileName1 = getPath(file1);
  const fileName2 = getPath(file2);

  expect(genDiff(fileName1, fileName2, format)).toEqual(readFile(expected));
});
