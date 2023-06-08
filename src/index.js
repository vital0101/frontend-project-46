import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import genDiff from './formfatter.js';

const getPathOfFile = (filePath) => path.resolve(filePath);
const getTypeOfFile = (filePath) => path.extname(filePath);
const getDataFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const getGenDiff = (filePath1, filePath2) => {
  // get path of file
  const pathOfFile1 = getPathOfFile(filePath1);
  const pathOfFile2 = getPathOfFile(filePath2);
  // get extension of file
  const extensionOfFile1 = getTypeOfFile(pathOfFile1);
  const extensionOfFile2 = getTypeOfFile(pathOfFile2);
  // get data from file
  const getDataFile1 = getDataFile(filePath1);
  const getDataFile2 = getDataFile(filePath2);
  // трансформируем данные в объект
  const dataParse1 = parser(getDataFile1, extensionOfFile1);
  const dataParse2 = parser(getDataFile2, extensionOfFile2);
  // передаем объект в функцию для его обработки
  return genDiff(dataParse1, dataParse2);
};

export default getGenDiff;
