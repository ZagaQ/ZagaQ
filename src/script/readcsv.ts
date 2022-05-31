import * as FileSystem from 'expo-file-system';

const readCsv = async (uri: string) => {
  const ret: {[id: string]: string}[] = [];
  const inputData = await FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.UTF8});
  const lines = inputData.split('\n');
  const headers = lines[0].split(',');
  lines.slice(1).forEach((line) => {
    const addItem: {[id: string]: string}= {};
    line.split(',').forEach((item, index) => {
      addItem[headers[index]] = item;
    });
    ret.push(addItem);
  });
  return ret;
};

export default readCsv;
