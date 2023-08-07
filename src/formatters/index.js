import plain from './plain.js';
import stylish from './stylish.js';

const getFormatedFile = (tree, format = 'stylish') => {
  switch (format) {
    case 'json':
      return JSON.stringify(tree);
    case 'plain':
      return plain(tree);
    case 'stylish':
      return stylish(tree);
    default:
      return new Error(`Type '${format}' is not supported`);
  }
};

export default getFormatedFile;
