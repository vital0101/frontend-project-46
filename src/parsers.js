import yaml from 'js-yaml';

const parser = (data, type) => {
  // const typeFile = {
  //   json: (fileData) => JSON.parse(fileData),
  //   yml: (fileData) => yaml.load(fileData),
  //   yaml: (fileData) => yaml.load(fileData),
  // };
  // switch (type) {
  //   case '.json':
  //     return JSON.parse(data);
  //   case '.yml':
  //   case '.yaml':
  //     return yaml.load(data);
  //   default:
  //     throw new Error(`File extension ${type} is incorrect`);
  // }
  const typeFile = {
    json: '.json',
    yml: '.yml',
    yaml: '.yaml',
  };

  if (type === typeFile.json) {
    return JSON.parse(data);
  }
  if (type === typeFile.yml || type === typeFile.yaml) {
    return yaml.load(data);
  }
  return new Error(`File extension ${type} is incorrect`);
};

export default parser;
