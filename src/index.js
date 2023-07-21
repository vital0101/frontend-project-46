import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getDiff from './getDiff.js';
import getFormatedFile from './formatters/index.js';

const getPathOfFile = (filePath) => path.resolve(filePath);
const getTypeOfFile = (filePath) => path.extname(filePath);
const getDataFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const getGenDiff = (filePath1, filePath2, format = 'stylish') => {
  const pathOfFile1 = getPathOfFile(filePath1);
  const pathOfFile2 = getPathOfFile(filePath2);

  const extensionOfFile1 = getTypeOfFile(pathOfFile1);
  const extensionOfFile2 = getTypeOfFile(pathOfFile2);

  const dataFile1 = getDataFile(filePath1);
  const dataFile2 = getDataFile(filePath2);

  const dataParse1 = parser(dataFile1, extensionOfFile1);
  const dataParse2 = parser(dataFile2, extensionOfFile2);

  const tree = getDiff(dataParse1, dataParse2);
  return getFormatedFile(tree, format);
};

export default getGenDiff;
