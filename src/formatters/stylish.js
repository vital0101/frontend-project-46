import _ from 'lodash';

const getCurrentIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);
const getClosingIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - spacesCount);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value) || value === null) {
    return String(value);
  }
  const arrValue = Object.entries(value);
  const lines = arrValue.map(([key, val]) => `${getCurrentIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
  const result = ['{', ...lines, `${getClosingIndent(depth)}}`].join('\n');
  return result;
};

const stylish = (tree) => {
  const iter = (data, depth = 1) => {
    const result = data.map((item) => {
      switch (item.type) {
        case 'added':
          return `${getCurrentIndent(depth)}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'unchanged':
          return `${getCurrentIndent(depth)}  ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'changed': {
          const valueStr1 = `${getCurrentIndent(depth)}- ${item.key}: ${stringify(item.value1, depth + 1)}`;
          const valueStr2 = `${getCurrentIndent(depth)}+ ${item.key}: ${stringify(item.value2, depth + 1)}`;
          return `${valueStr1}\n${valueStr2}`;
        }
        case 'deleted':
          return `${getCurrentIndent(depth)}- ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'nested':
          return `${getCurrentIndent(depth)}  ${item.key}: ${iter(item.children, depth + 1)}`;
        default:
          return new Error(`Unknown type ${item.type}`);
      }
    });
    return ['{', ...result, `${getClosingIndent(depth)}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
