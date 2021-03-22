import { TAppData, TField } from '../config/config';
import { TTypes } from '../types/common';

export const genRandomID = () => Date.now().toString();

export const getTypeOfField = (table: TAppData | null, field: string) => {
  if (!table) return;
  return typeof table[0][field as TField] as TTypes;
};
