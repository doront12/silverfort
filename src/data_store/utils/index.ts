
import fs from 'fs'
const _fs = fs.promises;
let json = {};
export async function appendToDisk(fileName: string, key: string, value: any) {
  let fileData = '{}';
  try {
    fileData = await _fs.readFile(fileName, 'utf8');
    json = JSON.parse(fileData);
  }
  catch (ex) {
    // create  empty json file, if file not created yet. 
    await _fs.writeFile(fileName, JSON.stringify(json, null, 2), 'utf8');
  }

  json[key] = value;

  await _fs.writeFile(fileName, JSON.stringify(json, null, 2), 'utf8');
  console.log('Data appended successfully');

}
export async function getDataFromDisk(filename: string) {

  try {
    const fileData = await _fs.readFile(filename, 'utf8');
    const json = JSON.parse(fileData);
    return json;

  }
  catch (ex) {
    console.log(`Error reading file:${filename}`);
    return {};
  }
}

