import {
  csvSplitter,
  pasteSplitter
} from '../constants/constants';

export function parseCSVText(text: string): number[] {
  return text.split(csvSplitter).map(point => parseFloat(point)).filter(point => !isNaN(point));
}

export function parsePasteText(text: string): number[] {
  return text.split(pasteSplitter).map(point => parseFloat(point)).filter(point => !isNaN(point));
}