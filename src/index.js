import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getTree from './getTree.js';
import getFormatedFile from './formatters/index.js';

const getFilePath = (filePath) => path.resolve(filePath);
const getFileType = (filePath) => path.extname(filePath).slice(1);
const getFileData = (filePath) => fs.readFileSync(filePath, 'utf-8');

const getGenDiff = (filepath1, filepath2, format = 'stylish') => {
  const filePath1 = getFilePath(filepath1);
  const filePath2 = getFilePath(filepath2);

  const dataFile1 = getFileData(filepath1);
  const dataFile2 = getFileData(filepath2);

  const dataParse1 = parser(dataFile1, getFileType(filePath1));
  const dataParse2 = parser(dataFile2, getFileType(filePath2));

  const tree = getTree(dataParse1, dataParse2);
  return getFormatedFile(tree, format);
};

export default getGenDiff;
