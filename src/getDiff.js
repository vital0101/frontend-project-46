import _ from 'lodash';

const getDiff = (data1, data2) => {
  const key1 = Object.keys(data1);
  const key2 = Object.keys(data2);
  const keys = [...key1, ...key2];
  const uniqueKeys = Array.from(new Set(keys)).sort();

  const result = uniqueKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        key, type: 'added', value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key, type: 'deleted', value: data1[key],
      };
    }
    if (data1[key] === data2[key]) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    if ((typeof data1[key] === 'object' && typeof data2[key] === 'object')
    && (data1[key] !== null && data2[key] !== null)) {
      return { key, type: 'nested', children: getDiff(data1[key], data2[key]) };
    }
    return {
      key, type: 'changed', value1: data1[key], value2: data2[key],
    };
  });

  return result;
};

export default getDiff;
