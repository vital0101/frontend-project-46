import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (node, path = '') => {
    const result = node.flatMap((item) => {
      const accPath = path ? `${path}.${item.key}` : `${item.key}`;
      switch (item.type) {
        case 'added':
          return `Property '${accPath}' was added with value: ${stringify(item.value)}`;
        case 'changed':
          return `Property '${accPath}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        case 'unchanged':
          return [];
        case 'deleted':
          return `Property '${accPath}' was removed`;
        case 'nested':
          return iter(item.children, accPath);
        default:
          return new Error(`Unknow type '${item.type}'!`);
      }
    });
    return result.join('\n');
  };
  return iter(tree);
};

export default plain;
