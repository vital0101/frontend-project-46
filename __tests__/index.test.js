import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

const resultStylish = readFile('expectedStylish.txt');

test('generate difference between JSONs files', () => {
  const actual1 = genDiff(
    getPath('file1.json'),
    getPath('file2.json'),
    'stylish',
  );
  expect(actual1).toEqual(resultStylish);
});

test('generate difference between YML/YAMLs files', () => {
  const actual2 = genDiff(
    getPath('file1.yml'),
    getPath('file2.yaml'),
    'stylish',
  );
  expect(actual2).toEqual(resultStylish);
});

test('generate difference between JSON and YML/YAML files', () => {
  const actual3 = genDiff(
    getPath('file1.json'),
    getPath('file2.yaml'),
    'stylish',
  );
  expect(actual3).toEqual(resultStylish);
});
