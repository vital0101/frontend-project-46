import fs from 'fs';

const getFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const getParseFile = (file) => JSON.parse(file);

//  параметрами передаются распарсенные строки в объекты
const genDiff = (data1, data2) => {
  // const keys1 = _.keys(data1);
  // const keys2 = _.keys(data2);
  // const keys = _.union(keys1, keys2);
  // const keys = _.union(_.keys(data1), _.keys(data2));

  // коллекция неповторяющихся ключей из двух объектов
  const keys = Object.keys({ ...data1, ...data2 }).sort();
  console.log(keys);

  // result в виде строки
  let result = '{';
  
  // в цикле перебираем ключи
  for (const key of keys) {
    // console.log(keys)
    // console.log(key)

    // проверяем на наличие ключа
    // если у data1 нет этого ключа, то
    if (!Object.hasOwn(data1, key)) {
      result += `\n  + ${key}: ${data2[key]}`;
    
    // проверяем на наличие ключа
    // если у data2 нет этого ключа, то
    } else if (!Object.hasOwn(data2, key)) {
      result += `\n  - ${key}: ${data1[key]}`;

    // проверяем на равенство значений
    // если значение data1 !== значению data2, то
    } else if (data1[key] !== data2[key]) {
      result += `\n  - ${key}: ${data1[key]}`;
      result += `\n  + ${key}: ${data2[key]}`;

    // 
    } else {
      result += `\n    ${key}: ${data2[key]}`;
    }
  }
  return result += '\n}';
};

const getGenDiff = (filepath1, filepath2) => {
  const data1 = getFile(filepath1);
  const data2 = getFile(filepath2);
  const dataParse1 = getParseFile(data1);
  const dataParse2 = getParseFile(data2);
  // console.log(dataParse1, dataParse2)
  // console.log(data1, data2)
  return genDiff(dataParse1, dataParse2);
};

export { getGenDiff };