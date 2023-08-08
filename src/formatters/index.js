import plain from './plain.js';
import stylish from './stylish.js';

const getFormatedFile = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Type '${format}' is not supported`);
  }
};

export default getFormatedFile;
