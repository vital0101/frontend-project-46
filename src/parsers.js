import yaml from 'js-yaml';

const parser = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error('Invalid file format! Try supported formats.');
  }
};

export default parser;
