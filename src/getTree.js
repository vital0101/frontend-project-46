import _ from 'lodash';

const getTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = [...keys1, ...keys2];
  const uniqueKeys = _.sortBy(Array.from(new Set(keys)));

  const result = uniqueKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: getTree(data1[key], data2[key]) };
    }
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
    if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    return {
      key, type: 'changed', value1: data1[key], value2: data2[key],
    };
  });

  return result;
};

export default getTree;
