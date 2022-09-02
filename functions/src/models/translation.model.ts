import {Timestamp} from 'firebase-admin/firestore';

export type TranslationLocale =  { [key: string]: string }

export enum TranslationType {
  STRING = 'STRING',
  PLURAL = 'PLURAL',
  ARRAY = 'ARRAY'
}

export interface Translation {
  name: string;
  type: TranslationType;
  locales: { [key: string]: string };
  labels?: string[]
  description?: string;
  createdOn: Timestamp;
  updatedOn: Timestamp;
}

export interface TranslationExportImport {
  name: string;
  locales: { [key: string]: string };
  labels?: string[]
  description?: string;
}

export interface TranslationsExportFlatData {
  kind: 'FLAT'
  spaceId: string
  locale: string
}

export interface TranslationsExportFullData {
  kind: 'FULL'
  spaceId: string
}

export type TranslationsExportData = TranslationsExportFlatData | TranslationsExportFullData

export interface TranslationsImportFlatData {
  kind: 'FLAT'
  spaceId: string
  locale: string
  translations: TranslationLocale
}

export interface TranslationsImportFullData {
  kind: 'FULL'
  spaceId: string
  translations: TranslationExportImport[]
}

export type  TranslationsImportData = TranslationsImportFlatData | TranslationsImportFullData
