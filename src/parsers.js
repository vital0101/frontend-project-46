import yaml from 'js-yaml';

const parser = (data, extension) => {
  let parseData;
  if (extension === '.json') {
    parseData = JSON.parse(data);
  } else if (extension === '.yaml' || extension === '.yml') {
    parseData = yaml.load(data);
  }
  return parseData;
};

export default parser;
