import {
  csvRegex,
  Errors
} from '../../constants/constants';

export function readCSV(file: File): Promise<string> {
  const temporaryFileReader = new FileReader();
  return new Promise((resolve, reject) => {
    if (!file.name.match(csvRegex)) reject(new Error(Errors.ERR_CSV_EXT));

    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new Error(Errors.ERR_PARSING_FILE));
    };

    temporaryFileReader.onload = () => {
      const readerResult = temporaryFileReader.result
      if (!readerResult) reject(new Error(Errors.ERR_PARSING_FILE));
      resolve(readerResult as string);
    };

    temporaryFileReader.readAsText(file);
  });
}

//TODO: What if file is empty?
//TODO: Error handle parsing + float Parsing error?
