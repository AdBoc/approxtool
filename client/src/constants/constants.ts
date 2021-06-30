export const csvRegex = /^.*\.csv$/gm;
export const csvSplitter = /\r?\n|,/;
export const pasteSplitter = /\r?\n|,|\t/;

export enum Errors {
  ERR_CSV_EXT = "Wrong File Extension",
  ERR_PARSING_FILE = 'Problem parsing input file.'
}