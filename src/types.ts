import ReactPDF from '@react-pdf/renderer';
import { ALIGNMENTS, COLUMN_TYPES } from './constants';

export interface CV {
  config: Config;
  contact: Contact;
  columns: Columns;
}

export interface Config {
  leftColumnWidth: number;
  pageNumberText: string;
  romanizedPageNumbers: boolean;
  printFriendly: boolean;
  font: Font;
  colors: Colors;
}

export interface Font {
  family: string;
  src: string;
}

export interface Colors {
  darkest: string;
  dark: string;
  mid: string;
  light: string;
  lightest: string;
}

export interface Contact {
  name: string;
  phone: string;
  mail: string;
  website: string;
  address: Address;
  portals: Portal[];
}

export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Portal {
  icon: string;
  url: string;
}

export type AllColumnItemTypes = TableColumnItem | ProgressBarColumnItem | ProgressCircleColumnItem | TextColumnItem | TimelineColumnItem | CardColumnItem;

export type Alignment = (typeof ALIGNMENTS)[number];

export type Columns = { [key in Alignment]: AllColumnItemTypes[] };

export type ColumnType = (typeof COLUMN_TYPES)[number];

type Values<TType extends ColumnType> = TType extends 'TABLE'
  ? TableValues[]
  : TType extends 'PROGRESS_BAR'
  ? ProgressValues[][]
  : TType extends 'PROGRESS_CIRCLE'
  ? ProgressValues[]
  : TType extends 'TEXT'
  ? TextValues[]
  : TType extends 'TIMELINE'
  ? TimelineValues[]
  : TType extends 'CARD'
  ? CardValues[]
  : never;

export interface ColumnDefault {
  heading: string;
  reactPdfProps?: ReactPdfProps;
}

export type TableColumnItem = ColumnItem<'TABLE'>;
export type ProgressBarColumnItem = ColumnItem<'PROGRESS_BAR'>;
export type ProgressCircleColumnItem = ColumnItem<'PROGRESS_CIRCLE'>;
export type TextColumnItem = ColumnItem<'TEXT'>;
export type TimelineColumnItem = ColumnItem<'TIMELINE'>;
export type CardColumnItem = ColumnItem<'CARD'>;

export interface ColumnItem<TType extends ColumnType> extends ColumnDefault {
  type: TType;
  values: Values<TType>;
}

interface TextValues {
  value: string | string[];
}

interface TableValues {
  key: string;
  value: string;
}

interface ProgressValues {
  skill: string;
  proficiency: Proficiency;
  color?: string;
}

interface TimelineValues {
  heading: string;
  fromTo: string;
  location: string;
  linkTo?: string;
  type?: string;
  website?: string;
}

interface CardValues {
  heading: string;
  subheading: string | string[];
  text: string | string[];
  duration: string;
}

export type ReactPdfProps = Omit<ReactPDF.ViewProps, 'style'>;

type Proficiency = IntRange<1, 101>;

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
