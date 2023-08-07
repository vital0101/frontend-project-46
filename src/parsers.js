import yaml from 'js-yaml';

const parser = (data, type) => {
  // const typeFile = {
  //   json: (fileData) => JSON.parse(fileData),
  //   yml: (fileData) => yaml.load(fileData),
  //   yaml: (fileData) => yaml.load(fileData),
  // };
  switch (type) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`File extension ${type} is incorrect`);
  }
};

export default parser;
