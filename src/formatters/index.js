import plain from './plain.js';
import stylish from './stylish.js';

const getFormatedFile = (tree, format = 'stylish') => {
  const formatType = {
    stylish: 'stylish',
    plain: 'plain',
    json: 'json',
  };

  if (format === formatType.json) {
    return JSON.stringify(tree);
  }
  if (format === formatType.plain) {
    return plain(tree);
  }
  if (format === formatType.stylish) {
    return stylish(tree);
  }
  return new Error(`Type '${format}' is not supported`);
};

export default getFormatedFile;
