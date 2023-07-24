import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getDiff from './getDiff.js';
import getFormatedFile from './formatters/index.js';

const getFilePath = (filePath) => path.resolve(filePath);
const getFileType = (filePath) => path.extname(filePath);
const getFileData = (filePath) => fs.readFileSync(filePath, 'utf-8');

const getGenDiff = (filePath1, filePath2, format = 'stylish') => {
  const pathOfFile1 = getFilePath(filePath1);
  const pathOfFile2 = getFilePath(filePath2);

  const extensionOfFile1 = getFileType(pathOfFile1);
  const extensionOfFile2 = getFileType(pathOfFile2);

  const dataFile1 = getFileData(filePath1);
  const dataFile2 = getFileData(filePath2);

  const dataParse1 = parser(dataFile1, extensionOfFile1);
  const dataParse2 = parser(dataFile2, extensionOfFile2);

  const tree = getDiff(dataParse1, dataParse2);
  return getFormatedFile(tree, format);
};

export default getGenDiff;
