import fs from 'fs';
import _ from 'lodash';

const getFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const getParseFile = (file) => JSON.parse(file);

//  параметрами передаются распарсенные строки в объекты
const genDiff = (data1, data2) => {
  // коллекция неповторяющихся ключей из двух объектов
  const keys = _.union(_.keys(data1), _.keys(data2));
  // const keys = Object.keys({ ...data1, ...data2 }).sort();

  let result = '{';

  for (const key of keys) {
    if (!Object.hasOwn(data1, key)) {
      result += `\n  + ${key}: ${data2[key]}`;
    } else if (!Object.hasOwn(data2, key)) {
      result += `\n  - ${key}: ${data1[key]}`;
    } else if (data1[key] !== data2[key]) {
      result += `\n  - ${key}: ${data1[key]}`;
      result += `\n  + ${key}: ${data2[key]}`;
    } else {
      result += `\n    ${key}: ${data2[key]}`;
    }
  }
  result += '\n}';
  return console.log(result);
};

const getGenDiff = (filepath1, filepath2) => {
  const data1 = getFile(filepath1);
  const data2 = getFile(filepath2);
  const dataParse1 = getParseFile(data1);
  const dataParse2 = getParseFile(data2);
  return genDiff(dataParse1, dataParse2);
};

export default getGenDiff;
